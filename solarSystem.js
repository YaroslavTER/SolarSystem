var canvas = document.getElementById('system_id')
var ctx = canvas.getContext('2d')
var ctxLines = canvas.getContext('2d')

ctx.canvas.height = window.innerHeight
ctx.canvas.width = window.innerWidth

const WHITE = "#FFFFFF"
const BLACK = "#000000"

var height = canvas.clientHeight, width = canvas.clientWidth

var canvasesPart = height/2.2
var distance = canvasesPart

var systemElements = []
var move = 0
var moveCoef = 10

var lines = []
var linesHeight = 80
var additionHeight = 20
var linesDistance = 30

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
    ctx.restore()
    DrawDistanceTraveled(Math.abs(move))
    DrawLines()
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
    let jumpCoef = 5
    for(let line of lines) {
        DrawLine(line, counter++ % jumpCoef == 0 ? linesHeight + additionHeight
                                                 : linesHeight)
    }
}

function DrawDistanceTraveled(distanceTraveled) {
    let retreat = 10
    let moonDiameter = 3474
    ctx.fillStyle = WHITE
    ctx.font = '14px serif'
    ctx.fillText(distanceTraveled*moonDiameter + " km", width/2,
                 height - linesHeight - additionHeight - retreat)
}

function DrawLine(position, inputHeight) {
    ctxLines.strokeStyle = WHITE
    ctxLines.beginPath()
    ctxLines.lineTo(position, height-inputHeight)
    ctxLines.lineTo(position, height)
    ctxLines.stroke()
}

function SetInitialLines() {
    let counter = 0
    let jumpCoef = 5
    let distance = linesDistance
    let linesNumber = width/linesDistance
    while(counter < linesNumber) {
        lines.push(distance)
        distance +=  linesDistance
        counter++
    }
}

function AddValueToLines(position) {
    for(let index = 0; index < lines.length; index++) {
        lines[index] += position
        if(lines[index] == width)
            lines[index] = 0
        else if(lines[index] <= 0)
            lines[index] = width
    }
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

SetInitialLines()

Draw()

document.addEventListener('keydown', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which)
    if(event.which == 39) {//right arrow
        AddValueToLines(-moveCoef)
        move -= moveCoef
    } else if(event.which == 37) {//left arrow
        AddValueToLines(moveCoef)
        move += moveCoef
    }
    Draw()
})
