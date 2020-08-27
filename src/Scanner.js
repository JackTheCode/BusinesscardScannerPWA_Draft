import React, { useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import './App.css';
import cv from 'opencv';

var lowThresh = 0;
var highThresh = 100;
var nIters = 2;
var minArea = 2000;
var maxArea = 100000;

var BLUE = [0, 255, 0]; //B, G, R
var RED   = [0, 0, 255]; //B, G, R
var GREEN = [0, 255, 0]; //B, G, R
var WHITE = [255, 255, 255]; //B, G, R
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
    cv.readImage(file, function(err, im) {
        if (err) throw err;
        if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');
      
        var out = im.copy();
      
        im.convertGrayscale();
        var im_canny = im.copy();
      
        im_canny.canny(lowThresh, highThresh);
        im_canny.dilate(nIters);
      
        var contours = im_canny.findContours();
      
        for (var i = 0; i < contours.size(); i++) {
      
          var area = contours.area(i);
          if (area < minArea || area > maxArea) continue;
      
          var arcLength = contours.arcLength(i, true);
          contours.approxPolyDP(i, 0.01 * arcLength, true);
      
          if (contours.cornerCount(i) != 4) continue;
      
          var points = [
            contours.point(i, 0),
            contours.point(i, 1),
            contours.point(i, 2),
            contours.point(i, 3)
          ]
      
          out.line([points[0].x,points[0].y], [points[1].x, points[1].y], RED);
          out.line([points[1].x,points[1].y], [points[2].x, points[2].y], RED);
          out.line([points[2].x,points[2].y], [points[3].x, points[3].y], RED);
          out.line([points[3].x,points[3].y], [points[0].x, points[0].y], RED);
        }
      
        out.save('./tmp/quad-crosses.png');
        console.log('Image saved to ./tmp/quad-crosses.png');
      });
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