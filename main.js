song1 = "";
song2 = "";
check = "";
check1 = "";
SLW = 0;
SRW = 0;
LWX = 0;
LWY = 0;
RWX = 0;
RWY = 0;
function preload(){
    song1 = loadSound('music1.mp3');
    song2 = loadSound('music2.mp3');
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    song1.setVolume(1);
    song1.rate(1);
    song2.setVolume(1);
    song2.rate(1);
}
function draw(){
    image(video,0,0,600,500);
    fill('#033');
    stroke('#022');
    check = song1.isPlaying();
    check1 = song2.isPlaying();
    if(SLW > 0.2){
        circle(LWX,LWY,20);
        song2.pause();
        if(check == false){
        song1.play();
        document.getElementById('song').innerHTML = "Virtual World";}
    }
    if(SRW > 0.2){
        circle(RWX,RWY,20);
        song1.pause();
        if(check1 == false){
        song2.play();
        document.getElementById('song').innerHTML = "Comedy";}
    }
}
function modelLoaded(){
    console.log('poseNet Intialized!');
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        RWX = results[0].pose.rightWrist.x;
        RWY = results[0].pose.rightWrist.y;
        console.log("Right Wrist - "+ RWX + "," + RWY);
        LWX = results[0].pose.leftWrist.x;
        LWY = results[0].pose.leftWrist.y;
        console.log('Left Wrist - '+ LWX+ ", " + LWY);
        SLW = results[0].pose.keypoints[9].score;
        SRW = results[0].pose.keypoints[10].score;
    }
}
