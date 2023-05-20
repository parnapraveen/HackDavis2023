from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    # Put your Python code here
    IMAGE_URL = 'https://m.media-amazon.com/images/I/71zCuTZ6fnL._SX679_.jpg'

    from clarifai_grpc.channel.clarifai_channel import ClarifaiChannel
    from clarifai_grpc.grpc.api import resources_pb2, service_pb2, service_pb2_grpc
    from clarifai_grpc.grpc.api.status import status_code_pb2

    channel = ClarifaiChannel.get_grpc_channel()
    stub = service_pb2_grpc.V2Stub(channel)

    metadata = (('authorization', 'Key ' + '8f4fcdb4bead490db6bf6b2e1f73a2ef'),)

    userDataObject = resources_pb2.UserAppIDSet(user_id='yuchen', app_id='workflow-test')

    post_model_outputs_response = stub.PostModelOutputs(
        service_pb2.PostModelOutputsRequest(
            user_app_id=userDataObject,
            model_id='BARCODE-QRCODE-Reader',
            # version_id='47850e63a4c3436d9527cdb86dda8c6b',  ## This is optional. Defaults to the latest model version.
            inputs=[
                resources_pb2.Input(
                    data=resources_pb2.Data(
                        image=resources_pb2.Image(
                            url=IMAGE_URL
                        )
                    )
                )
            ]
        ),
        metadata=metadata
    )

    if post_model_outputs_response.status.code != status_code_pb2.SUCCESS:
        print(post_model_outputs_response.status)
        raise Exception("Post model outputs failed, status: " + post_model_outputs_response.status.description)

    # Since we have one input, one output will exist here.
    output = post_model_outputs_response.outputs[0]

    # Get the predicted concepts
    predicted_concepts = []
    for concept in output.data.concepts:
        predicted_concepts.append((concept.name, concept.value))

    # Uncomment this line to print the full Response JSON
    # print(post_model_outputs_response)

    # Return the rendered HTML template with the predicted concepts
    return render_template('index.html', predicted_concepts=predicted_concepts)

if __name__ == '__main__':
    app.run()