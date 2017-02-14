var canvas = document.getElementById('system_id')
var ctx = canvas.getContext('2d')

ctx.canvas.height = window.innerHeight//fill all window
var height = canvas.clientHeight, width = 18000

var canvasesPart = height/2.2
var distance = canvasesPart

var BLACK = "#000000"
var WHITE = "#FFFFFF"

var systemElements = []
var move = 0
var moveCoef = 10

var linesHeight = 100
var linesDistance = 30

var time = 3

function AddEelement(inputName, inputRadius, inputColor, inputRangeCoef) {
    systemElements.push({name: inputName, radius: inputRadius,
                         color: inputColor, rangeCoef: inputRangeCoef})
}

function Draw() {
    ctx.clearRect(0, 0, width, height)
    ctx.save()
    ctx.fillStyle = BLACK
    ctx.fillRect(0, 0, width, height)
    ctx.translate(move, 0)
    for(let element of systemElements) {
        DrawElement(element)
        distance += element.rangeCoef
    }
    distance = canvasesPart
    DrawLines()
    ctx.restore()
}

function DrawElement(element) {
    let circle = new Path2D()
    ctx.fillStyle = element.color
    circle.arc(distance, canvasesPart, element.radius, 0, 2*Math.PI)
    ctx.fill(circle)
    ctx.font = '48px serif'
    ctx.fillText(element.name, distance, canvasesPart+element.radius*1.5)
}

function DrawLines() {
    let counter = 0
    let distance = linesDistance
    let linesNumber = width/linesDistance
    while(counter < linesNumber) {
        DrawLine(distance)
        distance += linesDistance
        counter++
    }
}

function DrawLine(position) {
    ctx.strokeStyle = WHITE
    ctx.beginPath()
    ctx.lineTo(position, height-linesHeight)
    ctx.lineTo(position, height)
    ctx.stroke()
}

//1 Moon's radius = 1 pixel

AddEelement("Sun", 200, "#FDE301", 16669)

AddEelement("Mercury", 1, "#746F6B", 14476)
AddEelement("Venus", 3, "#DA730C", 11917)
AddEelement("Earth", 2, "#0BA3D3", 110)
AddEelement("Moon", 1, "#999999", 22440)

AddEelement("Mars", 2, "#FF8B00", 158431)
AddEelement("Jupiter", 40, "#EDC6A1", 186030)
AddEelement("Saturn", 33, "#BE9875", 417084)
AddEelement("Uranus", 14, "#8CDBE0", 468465)

AddEelement("Neptun", 14, "#497AF4", 0)

Draw()

document.addEventListener('keydown', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which)
    if(event.which == 39)//right arrow
        move -= moveCoef
    if(event.which == 37)//left arrow
        move += moveCoef
    Draw()
})
