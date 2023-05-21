// Get the video element and canvas
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const outputImage = document.getElementById('output-image'); // Assume you have an img element with id 'output-image'


// Get the start and capture buttons
const startButton = document.getElementById('start-btn');
const captureButton = document.getElementById('capture-btn');





// Access the webcam
let stream;
function startWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((streamObj) => {
            stream = streamObj;
            video.srcObject = stream;
            video.play();

            // Show the capture button and hide the start button
            captureButton.style.display = 'inline-block';
            startButton.style.display = 'none';
        })
        .catch((error) => {
            console.error('Error accessing the webcam:', error);
        });
}
// Start the webcam when the start button is clicked
startButton.addEventListener('click', () => {
    startWebcam();
});

// Capture image when the capture button is clicked
captureButton.addEventListener('click', () => {
    // Pause the video stream
    video.pause();

    video.style.transform = 'scaleX(-1)';
    video.classList.add('mirrored');

    // Draw the current video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    video.style.transform = 'none';


    // Convert the canvas image to a base64 string
    const imageDataURL = canvas.toDataURL('image/png');
    const base64Image = imageDataURL.split('base64,')[1];

    //outputImage.src = imageDataURL;

    sendToClarifaiAPI(base64Image);

    // Clear the canvas
    //context.clearRect(0, 0, canvas.width, canvas.height);

    video.classList.remove('mirrored');

    // Resume the video stream
    video.play();
});

// Function to send the captured image to Clarifai API
function sendToClarifaiAPI(base64Image) {

    // URL of image to use. Change this to your image.
    const IMAGE_URL = base64Image;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": "yuchen",
            "app_id": "workflow-test"
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "base64": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + '36ac13c8a57c4b768af0d129ed924cb9'
        },
        body: raw
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(`https://api.clarifai.com/v2/models/BARCODE-QRCODE-Reader/versions/47850e63a4c3436d9527cdb86dda8c6b/outputs`, requestOptions)
    .then(response => response.json())
    .then(result => {
        let code = result.outputs[0].data.regions[0].data.text.raw;        
        const url = 'https://world.openfoodfacts.org/api/v0/product/' + code;
        fetch(url)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            console.log(result.product.product_name_en)
            console.log(result.product.allergens);
            let newtext = result.product.allergens_hierarchy;
            for (var i = 0; i < newtext.length; i++) {
                newtext[i] = newtext[i].substring(3);
              }
            console.log(newtext);
            let output = result.product.product_name_en + " is not in our database";;
            if (newtext != ""){
                output = result.product.product_name_en + "containts:" + newtext + ", which are common allergens";
            }

            let utterance = new SpeechSynthesisUtterance(output);
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        })  
        

    })
    .catch(error => {
        output = "Cannot find a code try again";
        let utterance = new SpeechSynthesisUtterance(output);
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
        document.getElementById("codevalue").innerHTML = "Cannot find a code try again";
});


}


