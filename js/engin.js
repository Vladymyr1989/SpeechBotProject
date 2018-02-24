var r = document.getElementById('result');
var currentvoice;
var text = '';
//16 русский, 3 английский
window.speechSynthesis.onvoiceschanged = function (e) {
    var voices = speechSynthesis.getVoices();
//        for (var i = 0; i<voices.length; i++){
//            console.log(voices[16]);
//        }
    currentvoice = voices[3];
}
function RepeatConversation() {
    if ('speechSynthesis' in window && text != '') {
        var speech = window.speechSynthesis;
        var msg = new SpeechSynthesisUtterance();
        msg.voice = currentvoice;
        msg.rate = 0.8;
        msg.text = text;
        speech.speak(msg);
        console.log('Repeat conversation')
    } else{
        console.log('Your conversation is empty')
    };
}
console.log('started script');

if ('webkitSpeechRecognition' in window) {
    var speechRecognizer = new webkitSpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = 'en-US';
    function startConversation() {
        console.log('Start conversation')
        speechRecognizer.start();
        var finalTranscripts = '';
        speechRecognizer.onresult = function (event) {
            var interimTranscripts = '';
            for (var i = event.resultIndex; i < event.results.length; i++) {
                var transcript = event.results[i][0].transcript;
                transcript.replace("\n", "<br>");
                if (event.results[i].isFinal) {
                    finalTranscripts = transcript;
                } else {
                    interimTranscripts += transcript;
                }
            }
            r.innerHTML = finalTranscripts;
            text = finalTranscripts;
            console.log(interimTranscripts);
        };
        speechRecognizer.onerror = function (event) {
        };
    };
    function endConversation() {
        speechRecognizer.stop();
        console.log("End conversation");
    }
} else {
    r.innerHTML = 'Your browser is not supported. If google chrome, please upgrade!';
}