// js/game.js
{
  const image = new Image(),
    takePhotoButton = document.querySelector(".takePhoto");
  let constraints, imageCapture, mediaStream, video;
  const init = () => {
    console.log("Init() started");
    video = document.querySelector("video");
    navigator.mediaDevices
      .enumerateDevices()
      .catch((error) => console.log("enumerateDevices() error", error))
      .then(getStream);
    takePhotoButton.addEventListener("click", getPicture);
    console.log("Init() finished");
  };

  // Get a video stream from the camera
  const getStream = () => {
    console.log("getStream() started");
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
      .catch((error) => {
        console.log("getUserMedia error", error);
      })
      .then(gotStream);
    console.log("getStream() finished");
  };

  // Display the stream from the camera, and then create an ImageCapture object, using video from the stream
  const gotStream = (stream) => {
    console.log("gotStream() started");
    mediaStream = stream;
    video.srcObject = stream;
    imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
    console.log("gotStream() finished");
  };

  //Take the picture
  const getPicture = () => {
    console.log("getPicture() started");
    imageCapture
      .takePhoto()
      .then((img) => {
        image.src = URL.createObjectURL(img);
        image.addEventListener("load", () => createImagePieces(image));
        setInterval(() => checkDistance(), 1000);
      })
      .catch((error) => {
        console.log("takePhoto() error", error);
      });
    console.log("getPicture() finished");
  };

  const createImagePieces = (image) => {};

  const checkDistance = () => {};
}
