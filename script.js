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

buttons = {
    "left": new PickUpButton("left"),
    "center": new PickUpButton("center"),
    "right": new PickUpButton("right")
}


buttons.left.active(true)
buttons.center.active(false)
buttons.right.active(false)

// セルの場所と大きさを指定して、そのセルの大きさを変える
// area: 列("left","center","right")
// order: 上から何番目か(0～7) 0はピックアップ、上から順に1～7
// size: セルのサイズ(0～7) 0は空(柱の太さ)、小さい順に1～7
function updateCellSize(area, order, size) {
    cells[area][order].style.width = sizeList[size]
}



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

// for (let i=1 ; i<=7 ; i++) {
//     updateCellSize("left",i,i)
// }
// for (let area of ["center", "right"]) {
//     for (let i=1 ; i<=7 ; i++) {
//         updateCellSize(area,i,0)
//     }
// }