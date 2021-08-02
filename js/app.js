var recorderElement = document.querySelector('.recorder');
var recorderControlButton = document.querySelector('.recorder-control-button');
var recorderVideo = document.querySelector('.recorder-video');
var isRecordingVideo = false;

var book = document.querySelector('.book');
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
    book.style.display = 'block';
    bookVideo.src = bookVideoSource;
    recorderElement.style.display = 'none';
    setTimeout(function(){
        book.classList.add('animate');
    }, 350);
    setTimeout(function(){
        bookVideo.play();
    }, 1350);
}

function startRecorder(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(function(stream) {
            window.localStream = stream;
            recorderVideo.srcObject = stream;
            recorderVideo.play();
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = startRecording;
            mediaRecorder.start();
        });
    }else{
        alert("Opps!! Your device do not support video recording.");
    }
}

function stopRecorder(){
    mediaRecorder.stop();
    localStream.getTracks().forEach( (track) => {
        track.stop();
    });
}