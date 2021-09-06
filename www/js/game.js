const image = new Image(),
  takePhotoButton = document.querySelector("#takePhotoButton");

let constraints, imageCapture, mediaStream, video;

const init = () => {
  video = document.querySelector("video");

  navigator.mediaDevices
    .enumerateDevices()
    .then(getStream)
    .catch((error) => console.log("enumerateDevices() error", error));
  takePhotoButton.addEventListener("click", getPicture);
};

// Get a video stream from the camera
const getStream = () => {
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop());
  }

  constraints = {
    video: {
      width: 720,
      height: 720,
    },
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(gotStream)
    .catch((error) => console.log("getUserMedia() error", error));
};

// Display the stream from the camera, and then
// create an ImageCapture object, using video from the stream
const gotStream = (stream) => {
  mediaStream = stream;
  video.srcObject = stream;
  imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
};

// Take the picture
const getPicture = () => {
  imageCapture
    .takePhoto()
    .then((img) => {
      image.src = URL.createObjectURL(img);
      image.addEventListener("load", () => createImagePieces(image));
      setInterval(() => checkDistance(), 1000);
    })
    .catch((error) => console.log("takePhoto() error", error));
};
