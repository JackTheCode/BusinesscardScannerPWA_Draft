import React, { useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import './App.css';
import axios from 'axios';

let serverEndpoint = "http://localhost:4000"

class Scanner extends React.Component {

    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        this.uploadImage(this.state.file);
    }

    onChange(e) {
        this.setState({file:e.target.files[0]}, function() {
            console.log(this.state.file)
        })
    }

    constructor(props) {
        super(props);
        this.state ={
          file:null,
          imageNumber: 0
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    dataURItoBlob = (dataURI) => {
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
      
    padWithZeroNumber = (number, width) => {
        number = number + '';
        return number.length >= width
          ? number
          : new Array(width - number.length + 1).join('0') + number;
    }
      
    getFileExtention = (blobType) => {
        // by default the extention is .png
        let extention = IMAGE_TYPES.PNG;
      
        if (blobType === 'image/jpeg') {
          extention = IMAGE_TYPES.JPG;
        }
        return extention;
    }
    
    getFileName = (blobType) => {
        const prefix = 'photo';
        const photoNumber = this.padWithZeroNumber(this.state.imageNumber, 4);
        const extention = this.getFileExtention(blobType);
      
        return `${prefix}-${photoNumber}.${extention}`;
    }  

    uploadImage(file){
        const data = new FormData();
        data.append('file', file);
        axios.post(serverEndpoint + "/upload", data, {})
        .then(res => {
            console.log(res.data.success);
            if(res.data.success) {
                this.getImage()
            }
        })
    }
    
    saveImageFileFromBlob = (blob) => {
        var file = new File([blob], this.getFileName(this.state.imageNumber, blob.type));
        console.log(file)
        this.uploadImage(file);
    }
    
    getImage() {
        axios.get(serverEndpoint + "/download")
        .then(res => {
            console.log(res);
            window.open(serverEndpoint + "/download")
        })
    }
    
    saveImageToFile = (dataUri) => {
        let blob = this.dataURItoBlob(dataUri);
        this.saveImageFileFromBlob(blob, this.state.imageNumber);
    }

    handleTakePhoto = (dataUri) => {
        this.saveImageToFile(dataUri)
        this.state.imageNumber = this.state.imageNumber + 1;
        console.log('takePhoto');
      }
     
    handleTakePhotoAnimationDone = (dataUri) => {
        // Do stuff with the photo...
        console.log('takePhoto');
    }
    
    handleCameraError = (error) => {
        console.log('handleCameraError', error);
    }
    
    handleCameraStart = (stream) => {
        console.log('handleCameraStart');
    }
    
    handleCameraStop() {
        console.log('handleCameraStop');
    }

    render() {
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <h1>Camera</h1>
                <Camera
                onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
                onTakePhotoAnimationDone = { (dataUri) => { this.handleTakePhotoAnimationDone(dataUri); } }
                onCameraError = { (error) => { this.handleCameraError(error); } }
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
                onCameraStart = { (stream) => { this.handleCameraStart(stream); } }
                onCameraStop = { () => { this.handleCameraStop(); } }
               />
               <form onSubmit={this.onFormSubmit}>
                    <h1>File Upload</h1>
                    <input type="file" onChange={this.onChange} />
                    <button type="submit">Upload</button>
               </form>
            </div>
        )
    }

}
 
export default Scanner;