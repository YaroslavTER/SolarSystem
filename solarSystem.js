var canvas = document.getElementById('system_id')
var ctx = canvas.getContext('2d')
var height = canvas.clientHeight, width = canvas.clientWidth

var canvasesPart = height/2.2
var BLACK = "#000000"
var distance = canvasesPart

var systemElements = []

function AddEelement(inputName, inputRadius, inputColor, inputRangeCoef) {
    systemElements.push({name: inputName, radius: inputRadius,
                         color: inputColor, rangeCoef: inputRangeCoef})
}

function Draw() {
    ctx.fillSyle = BLACK
    ctx.fillRect(0, 0, width, height)
    for(let element of systemElements) {
        DrawElement(element)
        distance += element.rangeCoef
    }
}

function DrawElement(element) {
    let circle = new Path2D()
    ctx.fillStyle = element.color
    circle.arc(distance, canvasesPart, element.radius, 0, 2*Math.PI)
    ctx.fill(circle)
    ctx.font = '48px serif'
    ctx.fillText(element.name, distance, canvasesPart+element.radius*1.5)
}

//1 Moon's diameter = 1 pixel

AddEelement("Sun", 200, "#FDE301", 16669)
AddEelement("Mercury", 1, "#746F6B", 0)

Draw()
