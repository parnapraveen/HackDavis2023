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

   // video.style.transform = 'scaleX(-1)';
    video.style.transform = 'scaleX(-1)';
    video.classList.add('mirrored');

    // Draw the current video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
<<<<<<< HEAD
=======

    video.style.transform = 'none';
    
    // Convert the canvas image to a data URL
    const imageDataURL = canvas.toDataURL('image/png');
>>>>>>> 75e1082e74cabb6f65b5db1b7a56deb5826def0e

    // Convert the canvas image to a base64 string
    const imageDataURL = canvas.toDataURL('image/png');
    const base64Image = imageDataURL.split('base64,')[1];

    //outputImage.src = imageDataURL;

    sendToClarifaiAPI(base64Image);

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
<<<<<<< HEAD

=======
    video.classList.remove('mirrored');
    
>>>>>>> 75e1082e74cabb6f65b5db1b7a56deb5826def0e
    // Resume the video stream
    video.play();
});

// Function to send the captured image to Clarifai API
function sendToClarifaiAPI(base64Image) {




// URL of image to use. Change this to your image.
const IMAGE_URL = "https://i.ibb.co/v3y8ffL/348354738-195745536266665-4991851399174913275-n.jpg";

const raw = JSON.stringify({
  "user_app_id": {
    "user_id": "yuchen",
    "app_id": "workflow-test"
  },
  "inputs": [
      {
          "data": {
              "image": {
                  "url": IMAGE_URL
              }
          }
      }
  ]
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + '8f4fcdb4bead490db6bf6b2e1f73a2ef'
    },
    body: raw
};

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

fetch(`https://api.clarifai.com/v2/models/BARCODE-QRCODE-Reader/versions/47850e63a4c3436d9527cdb86dda8c6b/outputs`, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  

}
