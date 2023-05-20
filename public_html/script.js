// Get the video element and canvas
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

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

    // Draw the current video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert the canvas image to a data URL
    const imageDataURL = canvas.toDataURL('image/png');

    // Optionally, you can perform further processing or send the image data to your Python script instead of downloading it or displaying it on the webpage.

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Resume the video stream
    video.play();
});