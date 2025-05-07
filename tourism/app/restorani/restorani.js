'use strict'

class Restoran {
    constructor(naziv, opis, tipoviKuhinje) {
        this.naziv = naziv
        this.opis = opis
        this.tipoviKuhinje = tipoviKuhinje
    }
}


let tipoviKuhinje = ["Azijska", "Kineska", "Italijanska"]
let restorani = []


function instanciranje() {
    let prviRestoran = new Restoran("Azijska oaza", "Restoran azijske kuhinje i tradicije.", ["Azijska"])
    let drugiRestoran = new Restoran("Qi-Qi", "Preporuka za sva slatko-ljuta jela.", ["Kineska"])
    let trećiRestoran = new Restoran("Botako", "Italija u Srbiji", ["Italijanska"])

    restorani = [prviRestoran, drugiRestoran, trećiRestoran]

    dodavanjeRedovaBodyTabele()
    preuzimanjeNovogObjekta()
}

document.addEventListener('DOMContentLoaded', function () {
    učitavanjeLocalStorage()
    preuzimanjeNovogObjekta()
})

function dodavanjeRedovaBodyTabele() {
    let bodyTabeleZaPrikazRestorana = document.querySelector('#bodyPrveTabele')
    bodyTabeleZaPrikazRestorana.innerHTML=''

    for (let i = 0; i < restorani.length; i++) {

        let tr = document.createElement('tr')
        tr.addEventListener('click', function(){
            detaljiRestorana(restorani[i])
        })

        let tdZaNaziv = document.createElement('td')
        let tdZaVrstuKuhinje = document.createElement('td')

        tdZaNaziv.textContent = restorani[i].naziv
        tdZaVrstuKuhinje.textContent = restorani[i].tipoviKuhinje

        tr.appendChild(tdZaNaziv)
        tr.appendChild(tdZaVrstuKuhinje)
        bodyTabeleZaPrikazRestorana.appendChild(tr)
    }
}


function detaljiRestorana(restoran){
    let detalji = document.querySelector('#detaljiPrveTabele')

    let p = document.createElement('p')

    p.innerHTML = restoran.naziv + "<br>"+ "<br>"  + "Tip kuhinje: " + 
    restoran.tipoviKuhinje + "<br>" +"<br>" + "Opis: " + restoran.opis

    if(detalji.firstChild){
        detalji.firstChild.remove()
    }

    detalji.appendChild(p)
}

function preuzimanjeNovogObjekta(){
    let dugme = document.querySelector('#btn')

    dugme.addEventListener("click", function(){
        const forma = document.querySelector('#forma')
        const formData = new FormData(forma)

        const naziv = formData.get('naziv')
        const opis = formData.get('opis')
        const tip = formData.get('tip')

        const restoranIzForme = new Restoran(naziv, opis, [tip])
        restorani.push(restoranIzForme)

        izmeniLocalStorage() 
        dodavanjeRedovaBodyTabele()
    })
}



function prikaziKuhinje() {
    const lista = document.getElementById("kuhinjaLista")
    lista.innerHTML = ""

    for (let i = 0; i < tipoviKuhinje.length; i++) {
        const red = document.createElement("div")
        red.textContent = tipoviKuhinje[i] + " "

        const dugme = document.createElement("button")
        dugme.textContent = "x"
        // dugme.onclick = function () {
        //     tipoviKuhinje.splice(i, 1)
        //     prikaziKuhinje()
        // }

        dugme.addEventListener('click', function(){
            tipoviKuhinje.splice(i,1)
            prikaziKuhinje()
        })

        red.appendChild(dugme)
        lista.appendChild(red)
    }
}

document.getElementById("btnDodajIzListe").onclick = function () {
  
    const nova = prompt("Unesi novi tip kuhinje:")
    if (nova && nova.trim() !== "") {
        tipoviKuhinje.push(nova.trim())
        prikaziKuhinje()
    }
}

prikaziKuhinje()


function izmeniLocalStorage() {
    localStorage.setItem('restorani', JSON.stringify(restorani))
}

function učitavanjeLocalStorage() {
    let podatak = localStorage.getItem('restorani')
    if (podatak) {
        restorani = JSON.parse(podatak)
    } else {
        instanciranje() // ← ovde se poziva samo prvi put
        izmeniLocalStorage()
    }
    dodavanjeRedovaBodyTabele()
}