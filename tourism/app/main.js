"use strict"

class Tura {
    constructor(naziv, opis, duzina, tagovi) {
        this.naziv = naziv
        this.opis = opis
        this.duzina = duzina
        this.tagovi = tagovi
    }
}


function initializeTuraTable() {  
    let tureTbody = document.querySelector("#tureTbody")
    tureTbody.innerHTML = ""

    for (let i = 0; i < ture.length; i++) {
        let tr = document.createElement("tr")

        let naziv = document.createElement("td")
        let opis = document.createElement("td")

        naziv.textContent = ture[i].naziv
        opis.textContent = ture[i].opis

        tr.appendChild(naziv)
        tr.appendChild(opis)

        tr.addEventListener("click", function() {
            displayTureDetails(ture[i])
            document.querySelector(".tureDetailsDiv").style.display = "flex"
        })
        
        tureTbody.appendChild(tr)
    }
}


function displayTureDetails(tura) {
    let tureDetailsDiv = document.querySelector(".tureDetailsDiv")
    tureDetailsDiv.innerHTML = ""


    let naziv = document.createElement("p")
    let opis = document.createElement("p")
    let duzina = document.createElement("p")
    let tagovi = document.createElement("p")

    naziv.textContent = "naziv: " + tura.naziv
    opis.textContent = "opis: " + tura.opis
    duzina.textContent = "duzina: " + tura.duzina
    tagovi.textContent = "tagovi: " + tura.tagovi.join(", ")


    tureDetailsDiv.appendChild(naziv)
    tureDetailsDiv.appendChild(opis)
    tureDetailsDiv.appendChild(duzina)
    tureDetailsDiv.appendChild(tagovi)
}


let ture = []

function updateLocalStorage() {
    localStorage.setItem("ture", JSON.stringify(ture))
}

function loadLocalStorage() {
    let data = localStorage.getItem("ture")
    ture = data ? JSON.parse(data) : []
    initializeTuraTable()
}


function loadEvents() {
    document.querySelector("#tureBtn").addEventListener("click", function(event) {
        event.preventDefault()
        initializeTuraTable()
        document.querySelector(".tureTableDiv").style.display = "flex"
        document.querySelector(".tureFormaDiv").style.display = "flex"
    })

    document.querySelector("#tureFormaBtn").addEventListener("click", function(event) {
        event.preventDefault()
        let forma = document.querySelector(".tureForma")
        let formData = new FormData(forma)

        let naziv = formData.get("naziv")
        let opis = formData.get("opis")
        let duzina = formData.get("duzina")
        let tagovi = formData.get("tagovi").split(", ")

        let turaNova = new Tura(naziv, opis, duzina, tagovi)
        ture.push(turaNova)

        updateLocalStorage()
        initializeTuraTable()
    })
}


function initializePage() {
    document.addEventListener("DOMContentLoaded", function() {
        loadEvents()
        loadLocalStorage()
    })
}


initializePage()