# Safe Grub - Allergy Detection Web App

## Inspiration
Food allergies are a significant concern for individuals who need to carefully monitor their diet. Reading and understanding food labels can be time-consuming and challenging, especially for people with visual impairments or those who struggle with ingredient analysis. Our team was motivated to develop an innovative solution to assist individuals in quickly identifying potential allergens in food products. Thus, we created Safe Grub, a web app that utilizes computer vision and natural language processing to detect allergies in food items.

## What it does
Safe Grub utilizes computer vision and the Clarifai API to enable users to scan food wrappers using their webcam. The web app captures an image of the food item, detects the barcode using Clarifai's barcode reader AI model, and extracts the serial number. It then parses through a database of ingredients to identify any common allergens associated with the serial number. Finally, Safe Grub uses text-to-speech technology to read the list of ingredients aloud, ensuring accessibility for individuals with visual impairments.

## How we built it
Safe Grub is built as a web application using HTML, CSS, and JavaScript. We utilized the following components and technologies:
- **Webcam Access:** We accessed the user's webcam stream using the `navigator.mediaDevices.getUserMedia` API.
- **Canvas:** We used the HTML elements to display the video feed and capture frames from the webcam.
- **Clarifai API:** We integrated the Clarifai API to detect the barcode from the captured image and extract the serial number.
- **Ingredient Database:** We created a database of common allergens and their associated serial numbers.
- **Text-to-Speech:** We employed JavaScript's text-to-speech capabilities to read the list of ingredients aloud.

## Challenges we ran into
During the development of Safe Grub, we encountered several challenges:
- **Webcam Access:** Configuring the webcam access and capturing frames required understanding the `getUserMedia` API and dealing with cross-browser compatibility.
- **Barcode Detection:** Integrating the Clarifai API and correctly extracting the barcode's serial number presented some complexities.
- **Ingredient Parsing:** Building an efficient ingredient parsing algorithm to match the extracted serial number with the allergen database required careful consideration.

## Accomplishments that we're proud of
Despite the challenges, our team achieved several milestones throughout the development process:
- **Successful Barcode Detection:** We integrated the Clarifai API and implemented the barcode detection AI model, allowing us to accurately extract the serial number from the food wrapper image.
- **Allergen Identification:** By parsing through our ingredient database, we successfully identified potential allergens associated with the serial number.
- **Text-to-Speech Integration:** We implemented text-to-speech functionality, enabling Safe Grub to read the list of ingredients aloud, enhancing accessibility for visually impaired users.

## What we learned
In this project, we gained knowledge on integrating multiple APIs and leveraging their combined functionality. Additionally, we recognized the significance of accessibility in website development, particularly in ensuring inclusivity for various user groups, such as the visually impaired.

## What's next for Safe Grub
We have a vision to expand Safe Grub's capabilities and incorporate additional features to make it an indispensable tool for individuals with food allergies. Here are some future enhancements we plan to implement:
- **Real-time Ingredient Detection:** Utilizing natural language processing
- **Accessibility:** Making it as accessible as possible through converting this web app to a mobile app. 
