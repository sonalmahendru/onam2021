var recorderElement = document.querySelector('.recorder');
var recorderControlButton = document.querySelector('.recorder-control-button');
var recorderVideo = document.querySelector('.recorder-video');
var isRecordingVideo = false;

var bookVideo = document.querySelector('.book-video');
var bookVideoSource = null;

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


var recorderStream = recorderVideo.captureStream(25);
var recorderChunks = [];
var mediaRecorder;

function startRecording(event){
    if (event.data.size > 0) {
        recorderChunks.push(event.data);
        stopRecording();
    } 
}

function stopRecording(){
    var blob = new Blob(recorderChunks, {
        type: mediaRecorder.mimeType,
    });
    bookVideoSource = URL.createObjectURL(blob);
    bookVideo.src = bookVideoSource;
    bookVideo.play();
}

function startRecorder(){
    recorderVideo.play();
    var stream = recorderVideo.captureStream(25);
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = startRecording;
    mediaRecorder.start();
}

function stopRecorder(){
    mediaRecorder.stop();
    recorderVideo.pause();
}