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
var deviceMimeType;

var userAgent = navigator.userAgent.toLowerCase();
if (userAgent.indexOf('safari') != -1) {
    if (userAgent.indexOf('chrome') > -1) {
        deviceMimeType = "video/webm; codecs=vp9";
    } else {
        deviceMimeType = "video/mp4";
    }
}else{
    deviceMimeType = "video/webm; codecs=vp9";
}

function startRecording(event){
    if (event.data.size > 0) {
        recorderChunks.push(event.data);
        stopRecording();
    } 
}

function supportsRecording(){
    if (!window.MediaRecorder){
        return false;
    }else{
        return true;
    }
}

function stopRecording(){
    var blob = new Blob(recorderChunks, { type : deviceMimeType});
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
            audio:true,
            video:{
                height:500,
                width:500,
            }
        }).then(function(stream) {
            window.localStream = stream;
            recorderVideo.srcObject = stream;
            recorderVideo.play();
            if(supportsRecording()){
                alert("Congratulations! device supports mediaRecorder. if error still occurs check mime type");
                mediaRecorder = new MediaRecorder(stream, {mimeType:deviceMimeType});
                mediaRecorder.ondataavailable = startRecording;
                mediaRecorder.start();
            }else{
                alert("Device Do not support mediaRecorder API");
            }
        });
    }else{
        alert("Opps!! Your device do not support video recording.");
    }
}

function stopRecorder(){
    if(supportsRecording){
        mediaRecorder.stop();
    }
    localStream.getTracks().forEach( (track) => {
        track.stop();
    });
}
