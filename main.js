prediction_1 = ""
prediction_2 = ""

Webcam.set({
    height: 300,
    width: 350,
    image_format: 'jpeg',
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="image" src="' + data_uri + '">'
    }
    )
}

console.log('ml5.version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Loaded !")
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first predeiction is" + prediction_1;
    speak_data_2 = "and the second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis)
}


function predict_emotion() {

    img = document.getElementById("image");
    classifier.classify(img, got_result);
}

function got_result(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log("results")
        document.getElementById("emotion").innerHTML = results[0].label;
        document.getElementById("emotion2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak()

        if (results[0].label == "happy") {
            document.getElementById("emotion_pic").innerHTML = "&#128522"
        }

        if (results[0].label == "sad") {
            document.getElementById("emotion_pic").innerHTML = "&#128532"
        }

        if (results[0].label == "angry") {
            document.getElementById("emotion_pic").innerHTML = "&#128545"
        }


        if (results[1].label == "happy") {
            document.getElementById("emotion_pic2").innerHTML = "&#128522"
        }

        if (results[1].label == "sad") {
            document.getElementById("emotion_pic2").innerHTML = "&#128532"
        }

        if (results[1].label == "angry") {
            document.getElementById("emotion_pic2").innerHTML = "&#128545"
        }
    }


}

