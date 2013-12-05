// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('c');

var turtle = {
    state: "down",
    pos: {x:canvas.getWidth()/2, y:canvas.getHeight()/2},
    heading: 0,

    up: function () {
        this.state="up";
    },
    
    down: function () {
        this.state="down";
    },
    
    forward: function ( length ) {
        var sx=Math.sin(this.heading/360*2*Math.PI);
        var sy=Math.cos(this.heading/360*2*Math.PI);
        var startpos={x:this.pos.x,y:this.pos.y};
        this.pos.x+=sx*length;
        this.pos.y+=sy*length;
        
        if(this.state=="down") {
            var line=new fabric.Line([startpos.x, startpos.y, this.pos.x, this.pos.y], { stroke: 'black' });
            canvas.add(line);
        }
        
    },

    back: function (length) {
        this.forward(-length);
    },

    right: function (angle) {
        this.heading=(this.heading+angle)%360;
    },

    left: function (angle) {
        this.right(-angle);
    },

    toString: function () {
        return "turtle at "+this.pos.x+","+this.pos.y+" heading "+this.heading;
    }
};

// example#1 draw a snowflake

function draw(len) {
    if(len>10) {
        draw(len/3);
        turtle.left(60);
        draw(len/3);
        turtle.right(120);
        draw(len/3);
        turtle.left(60);
        draw(len/3);
    } else {
        turtle.forward(len);
    }
}

turtle.up();
turtle.right(90);
turtle.forward(100);
turtle.left(90);
turtle.down();

for(i=0;i<3;i++) {
    turtle.right(120);
    draw(150);
}

// example#2 draw a fractal fern

function fern(len) {
    if(len>10) {
        turtle.forward(len/2);
        turtle.right(30);
        fern(len/2);
        turtle.left(40);
        turtle.down();
        fern(len/3);
        turtle.right(10);
        turtle.up();
        turtle.back(len/2);        
        turtle.down();
    } else {
        turtle.forward(len);
        turtle.up();
        turtle.back(len);
        turtle.down();
    }
}

turtle.up();
turtle.forward(200);
turtle.down();
turtle.right(180);
fern(250);

// example#3 draw regular n-polygon

turtle.up();
turtle.forward(150);
turtle.right(90);
turtle.forward(120);
turtle.left(90);
turtle.down();

var edges=9;

for(i=0;i<edges;i++) {
    turtle.right(360/edges);
    turtle.forward(75);
}

fabric.log(turtle.toString());
