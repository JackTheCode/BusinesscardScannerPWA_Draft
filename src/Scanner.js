import React, { useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import './App.css';

function dataURItoBlob (dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
  
    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ab], {type: mimeString});
    return blob;
}
  
function padWithZeroNumber (number, width) {
    number = number + '';
    return number.length >= width
      ? number
      : new Array(width - number.length + 1).join('0') + number;
}
  
function getFileExtention (blobType) {
    // by default the extention is .png
    let extention = IMAGE_TYPES.PNG;
  
    if (blobType === 'image/jpeg') {
      extention = IMAGE_TYPES.JPG;
    }
    return extention;
}

function getFileName (imageNumber, blobType) {
    const prefix = 'photo';
    const photoNumber = padWithZeroNumber(imageNumber, 4);
    const extention = getFileExtention(blobType);
  
    return `${prefix}-${photoNumber}.${extention}`;
}  

function saveImageFileFromBlob (blob, imageNumber) {
    var file = new File([blob], getFileName(imageNumber, blob.type));
    console.log(file)
    // window.URL = window.webkitURL || window.URL;
  
    // let anchor = document.createElement('a');
    // anchor.download = getFileName(imageNumber, blob.type);
    // anchor.href = window.URL.createObjectURL(blob);
    // let mouseEvent = document.createEvent('MouseEvents');
    // mouseEvent.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    // anchor.dispatchEvent(mouseEvent);
  }

function saveImageToFile(dataUri, imageNumber) {
    let blob = dataURItoBlob(dataUri);
    saveImageFileFromBlob(blob, imageNumber);
}

const Scanner = (props) => {

    const [imageNumber, setImageNumber] = useState(0);

    function handleTakePhoto (dataUri) {
        saveImageToFile(dataUri, imageNumber)
        setImageNumber(imageNumber + 1);
        console.log('takePhoto');
      }
     
    function handleTakePhotoAnimationDone (dataUri) {
        // Do stuff with the photo...
        console.log('takePhoto');
    }
    
    function handleCameraError (error) {
        console.log('handleCameraError', error);
    }
    
    function handleCameraStart (stream) {
        console.log('handleCameraStart');
    }
    
    function handleCameraStop () {
        console.log('handleCameraStop');
    }

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <Camera
            onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
            onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
            onCameraError = { (error) => { handleCameraError(error); } }
            idealFacingMode = {FACING_MODES.ENVIRONMENT}
            idealResolution = {{width: 640, height: 480}}
            imageType = {IMAGE_TYPES.PNG}
            imageCompression = {0.97}
            isMaxResolution = {true}
            isImageMirror = {true}
            isSilentMode = {false}
            isDisplayStartCameraError = {true}
            isFullscreen = {false}
            sizeFactor = {1}
            onCameraStart = { (stream) => { handleCameraStart(stream); } }
            onCameraStop = { () => { handleCameraStop(); } }
        />
        </div>
    )
}
 
export default Scanner;