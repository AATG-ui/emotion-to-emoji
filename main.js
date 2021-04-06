prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

camera = document.getElementById("camera");

Webcam.attach('#camera');

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
  
function speak(){
  var synth = window.speechSynthesis;
  speak_data_1 = "The first prediction is " + prediction_1;
  speak_data_2 = "And the second prediction is " + prediction_2;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
  synth.speak(utterThis);
}

//Check function is called once you click on the "Predict Emoji" button.
  function check()
  {
    //We are putting 'captured image' in variable
    img = document.getElementById('captured_image');
    //We are using the classifier to pass the variable img and to call the function gotResult
    classifier.classify(img, gotResult);
  }

//GotResult function is called and there are 2 values inside of it that are error and results
function gotResult(error, results) {
  //We are doing the if else
  //if is error
  if (error) {
    //We are calling error in console
    console.error(error);
    //Else is results
  } else {
    //We are calling results in console
    console.log(results);
    //We are showing first result label in html
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    //We are showing second result label in html
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    //We are putting results[0].label in variable prediction_1
    prediction_1 = results[0].label;
    //We are putting results[1].label in variable prediction_2
    prediction_2 = results[1].label;
    //We are calling function speak
    speak();
    //results[0].label
    //If for happy
    if(results[0].label == "happy")
    {
      //Display Happy
	    document.getElementById("update_emoji").innerHTML = "&#128522;";
    }
    //If for sad
    if(results[0].label == "sad")
    {
      //Display Sad
	    document.getElementById("update_emoji").innerHTML = "&#128532;";
    }
    //If for angry
    if(results[0].label == "angry")
    {
      //Display Angry
	    document.getElementById("update_emoji").innerHTML = "&#128548;";
    }
    //results[1].label
    //If for happy
    if(results[1].label == "happy")
    {
      //Display Happy
	    document.getElementById("update_emoji2").innerHTML = "&#128522;";
    }
    //If for sad
    if(results[1].label == "sad")
    {
      //Display Sad
	    document.getElementById("update_emoji2").innerHTML = "&#128532;";
    }
    //If for angry
    if(results[1].label == "angry")
    {
      //Display Angry
	    document.getElementById("update_emoji2").innerHTML = "&#128548;";
    }
  }
}

