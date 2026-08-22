hanoi = {
    "left": [
        document.getElementById("A1"),
        document.getElementById("A2"),
        document.getElementById("A3"),
        document.getElementById("A4"),
        document.getElementById("A5"),
        document.getElementById("A6"),
        document.getElementById("A7")
    ],
    "cemter": [
        document.getElementById("B1"),
        document.getElementById("B2"),
        document.getElementById("B3"),
        document.getElementById("B4"),
        document.getElementById("B5"),
        document.getElementById("B6"),
        document.getElementById("B7")
    ],
    "right": [
        document.getElementById("C1"),
        document.getElementById("C2"),
        document.getElementById("C3"),
        document.getElementById("C4"),
        document.getElementById("C5"),
        document.getElementById("C6"),
        document.getElementById("C7")
    ]
}

a = ["5px", "30px", "45px", "60px", "75px", "100px", "125px", "150px",]

document.getElementById("C1").style.width = a[0]
document.getElementById("C2").style.width = a[2]
document.getElementById("C3").style.width = a[3]
document.getElementById("C4").style.width = a[4]
document.getElementById("C5").style.width = a[5]
document.getElementById("C6").style.width = a[6]
document.getElementById("C7").style.width = a[7]

