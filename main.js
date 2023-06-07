objects = [];
Status = "";
function preload(){

}
function setup(){
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video, 0, 0, 300, 300);
    if(Status != ""){
        for(i = 0; i < objects.length; i++){
            fill('red');
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percentage + '%' , objects[i].x + 15, objects[i].y + 15 );
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        
        if(objects[i].label == Input){
            video.stop();
            object_detector.detect(gotResult);
            document.getElementById('result').innerHTML = 'Object Found: ' + Input;
            synth =  window.speechSynthesis();
            utterThis = new SpeechSynthesisUtterance(Input + ' found');
            synth.speak(utterThis);
        }
        else{
            document.getElementById('result').innerHTML =  Input + ' not Found';
        }
    }
  }
}
function start(){
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status: Detecting Objects';
    Input = document.getElementById('input').value;
    
}
function modelLoaded(){
    console.log('CoCoSSD is Initialised.');
    Status = true;
    object_detector.detect(video, gotResult);
}
function gotResult(error, result){
    if(error){
        console.error(error);
    }
    console.log(result);
    objects = result;
}