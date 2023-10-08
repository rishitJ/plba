Webcam.set({
    width:350,
    height:350,
    img_format:"png",
    png_quality:100
})

camera = document.getElementById("camera")
Webcam.attach(camera)

function clicking()
{
    Webcam.snap(function(data_uri) {
        console.log(data_uri)
        document.getElementById("result").innerHTML = "<img id='captured_img' src='"+data_uri+"'"
})
}

console.log("ml5version", ml5.version)
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/PsVf5nODo/model.json', model_Loaded)

function model_Loaded() 
{
    console.log("Model Loaded!")
}
function check() 
{
    img = document.getElementById("captured_img")
    classifier.classify (img, gotResult)
}
function gotResult(error, result) 
{
    if (error) 
    {
        console.error(error)
    } 
    else
    {
        console.log(result)

        prediction_1 = result[0].label
        prediction_2 = result[1].label

        document.getElementById("prediction_1").innerHTML = prediction_1

        speak()

        if (prediction_1 == "Amazing") 
        {
            document.getElementById("prediction_1").innerHTML = "&#128076;"
        } 
        else if (prediction_1 == "Victory")
        {
            document.getElementById("prediction_1").innerHTML = "&#9996;"
        }
        else if (prediction_1 == "All the best")
        {
            document.getElementById("prediction_1").innerHTML = "&#128077"
        }
    }
}
function speak() 
{
    var synth = window.speechSynthesis
    speak_data1 = "The first prediction is" + prediction_1
    var utterThis = new SpeechSynthesisUtterance(speak_data1)
    synth.speak(utterThis)
}