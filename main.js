var SpeechRecognition = window.webkitSpeechRecognition; 
var recognition = new SpeechRecognition(); 

camera=document.getElementById("camera");

img_id = "";

function start()
{ 
    document.getElementById("textbox").innerHTML = ""; 
    recognition.start(); 
    document.getElementById("result").innerHTML = "";
    document.getElementById("result2").innerHTML = "";
    document.getElementById("result3").innerHTML = "";
} 
recognition.onresult = function run (event) 
{ 
    console.log(event); 
    var Content = event.results[0][0].transcript; 
    console.log(Content); 
    if(Content=="take my selfie")
    {
        console.log("taking selfie ---");
        speak();
    }
    document.getElementById("textbox").innerHTML = Content; 
    speak();
}

function speak()
{
    var synth = window.speechSynthesis;
    // speak_data = document.getElementById("textbox").value;
    speak_data =  "Taking your Selfie in 5 seconds";
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);

    setTimeout(function(){
        img_id = "selfie1";

        take_snapshot();
        save();

        setTimeout(function(){
            img_id = "selfie2";
            speak_data2 = "Taking your Second Selfie in 5 seconds";
            var utterThis = new SpeechSynthesisUtterance(speak_data2);
            synth.speak(utterThis);
            setTimeout(function(){
                take_snapshot();
                img_id = "selfie3";
                document.getElementById("result3").innerHTML = "";
                speak_data3 = "Taking your Third Selfie in 5 seconds";
                var utterThis = new SpeechSynthesisUtterance(speak_data3);
                synth.speak(utterThis);
                setTimeout(function(){
                    take_snapshot();
                    save();
                }, 5000);
            }, 5000);
            // take_snapshot();
            // save();
            setTimeout(function(){
                take_snapshot();
                save();
            }, 5000);
        }, 0);
    }, 5000);
}

Webcam.set({
    width:360,
    height:250,
    image_format : 'png',
    png_quality:90
});

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        if (img_id=="selfie1")
        {
            document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'">';
        }
        if (img_id=="selfie2")
        {
            document.getElementById("result2").innerHTML = '<img id="selfie_image2" src="'+data_uri+'">';
        }
        if (img_id=="selfie3")
        {
            document.getElementById("result3").innerHTML = '<img id="selfie_image3" src="'+data_uri+'">';
        }
       // document.getElementById("result").innerHTML = '<img id="selfie_image" src="'+data_uri+'">';
    });
}

function save()
{
    link = document.getElementById("link");
    if (img_id=="selfie1")
    {
        image = document.getElementById("selfie_image").src;
    }
    if (img_id=="selfie2")
    {
        image = document.getElementById("selfie_image2").src;
    }
    if (img_id=="selfie3")
    {
        image = document.getElementById("selfie_image3").src;
    }
    link.href = image;
    link.click();
}