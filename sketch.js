var ball;
var firebase;
var database;

function setup(){
    createCanvas(400,400);
    ball = createSprite(10,10,10,10);
    ball.shapeColor = "red";
    database = firebase.database();

    //.ref() tells where to read or write
    //.on() means read from dB
    //.set() means write into dB

    var dBBallPosition = database.ref('position');
    dBBallPosition.on("value",readPosition,showError);

}


function readPosition(data){
    position = data.val();
    ball.x=position.x;
    ball.y=position.y;
}

function showError(){

    console.log("Error in accessing the database");

}

function writing(x,y){
database.ref("position").set({

    x:ball.x+x,
    y:ball.y+y
});


}


function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writing(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writing(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writing(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writing(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
