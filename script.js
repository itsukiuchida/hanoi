let cells = {
    "left": [
        document.getElementById("LPickUp"),
        document.getElementById("L7"),
        document.getElementById("L6"),
        document.getElementById("L5"),
        document.getElementById("L4"),
        document.getElementById("L3"),
        document.getElementById("L2"),
        document.getElementById("L1")
    ],
    "center": [
        document.getElementById("CPickUp"),
        document.getElementById("C7"),
        document.getElementById("C6"),
        document.getElementById("C5"),
        document.getElementById("C4"),
        document.getElementById("C3"),
        document.getElementById("C2"),
        document.getElementById("C1")
    ],
    "right": [
        document.getElementById("RPickUp"),
        document.getElementById("R7"),
        document.getElementById("R6"),
        document.getElementById("R5"),
        document.getElementById("R4"),
        document.getElementById("R3"),
        document.getElementById("R2"),
        document.getElementById("R1")
    ]
}
sizeList = ["5px", "30px", "45px", "60px", "75px", "100px", "125px", "150px",]

let hanoiStatus = {
    "left": [7,6,5,4,3,2,1],
    "center": [],
    "right": []
}

let pickUpStatus = null

class PickUpButton {
    constructor(area) {
        this.dom = document.getElementById(`${area}Btn`)
        this.dom.value = "持ち上げる"
        this.dom.onclick = () => {
            btnEvent(area)
            render()
            setTimeout(checkClear,50)
        }
    }

    updateLabel(value) {
        this.dom.value = value
    }

    active(isActive) {
        this.dom.disabled = !isActive
    }
}

// ボタンが押された時の処理
// area: "left" or "center" or "right"
function btnEvent(area) {
    if (pickUpStatus === null) { // 持ち上げる動作
        pickUpStatus = {
            "area": area,
            "size": hanoiStatus[area].pop()
        }
        for (let area of ["left", "center", "right"]) {
            buttons[area].updateLabel("ここに落とす")
            let isActive = hanoiStatus[area].length === 0 || pickUpStatus.size < hanoiStatus[area].at(-1)
            buttons[area].active(isActive)
        }
    } else { // 落とす動作
        hanoiStatus[area].push(pickUpStatus.size)
        pickUpStatus = null
        for (let area of ["left", "center", "right"]) {
            buttons[area].updateLabel("持ち上げる")
            let isActive = hanoiStatus[area].length !== 0   
            buttons[area].active(isActive)
        }
    }
}

function checkClear() {
    if (hanoiStatus.center.length === 7 || hanoiStatus.right.length === 7) {
        alert("クリア！おめでとう！")
        hanoiStatus = {
            "left": [7,6,5,4,3,2,1],
            "center": [],
            "right": []
        }
        buttons.left.active(true)
        buttons.center.active(false)
        buttons.right.active(false)
        render()
    }
}

buttons = {
    "left": new PickUpButton("left"),
    "center": new PickUpButton("center"),
    "right": new PickUpButton("right")
}

buttons.left.active(true)
buttons.center.active(false)
buttons.right.active(false)

function render() {
    for (let area of ["left", "center", "right"]) {
        for (let i=1; i<=7; i++) {
            cells[area][i].style.width = sizeList[0]
        }
        for (let i=1; i<=hanoiStatus[area].length; i++) {
            cells[area][i].style.width = sizeList[hanoiStatus[area][i-1]]
        }
        if (pickUpStatus !== null && pickUpStatus.area === area) {
            cells[area][0].style.width = sizeList[pickUpStatus.size]
        } else {
            cells[area][0].style.width = "0px"
        }
        
    }
}

render()