var recorderElement = document.querySelector('.recorder');
var recorderControlButton = document.querySelector('.recorder-control-button');
var recorderVideo = document.querySelector('.recorder-video');
var isRecordingVideo = false;

recorderControlButton.addEventListener('click', function(){
    if(isRecordingVideo === false) {
        isRecordingVideo = true;
        recorderControlButton.innerHTML = 'Stop';
        startRecorder();
    }else{
        isRecordingVideo = false;
        recorderControlButton.innerHTML = 'Start';
        stopRecorder();
    }
});


function startRecorder(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(function(stream) {
            window.localStream = stream;
            recorderVideo.srcObject = stream;
            recorderVideo.play();
        });
    }else{
        alert("Opps!! Your device do not support video recording.");
    }
}

function stopRecorder(){
    localStream.getTracks().forEach( (track) => {
        track.stop();
    });
}