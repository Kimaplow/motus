const liste = ["bouteille", "ordinateur", "grammaire"];

const mot = liste[getRandomInt(liste.length)];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const onLoad = () => {
    let grille = document.getElementById("grille");
    let table = document.createElement("table");
    for (let i = 0; i < 6; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute("class", "ligne");
        if (i === 0) {
            for (let y = 0; y < mot.length; y++) {
                let td = document.createElement("td");
                if (y === 0) {
                    td.innerHTML = mot[0].toUpperCase();
                }
                else {
                    td.innerHTML = ".";
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        else {
            for (let y = 0; y < mot.length; y++) {
                let td = document.createElement("td");
                td.innerHTML = "";
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
    }
    grille.appendChild(table);
    document.body.appendChild(grille);
}

let essai = 0;
let indexLetters = [0];

const initLigne = () => {
    let ligne = document.getElementsByClassName("ligne")[essai];
    let childs = ligne.childNodes;
    indexLetters.forEach(index => {
        childs[index].innerHTML = mot[index].toUpperCase()
    });
    for(let i = 0; i < childs.length; i++){
        if(childs[i].innerHTML === ""){
            childs[i].innerHTML = "."
        }
    }
}

const writeLetter = (e) => {
    if (essai < 6 || e.code === 116) {
        let ligne = document.getElementsByClassName("ligne")[essai];
        let childs = ligne.childNodes;
        if (e.code === "Enter") {
            if(childs[mot.length-1].innerHTML !== "."){
                validateLigne(childs);
                if(indexLetters.length === mot.length){
                    let finish = document.getElementById("finish");
                    finish.innerHTML = "Bravo ! Vous avez deviné le mot en " + essai + " essais :)";
                }
                else{
                    essai++;
                    if(essai < 6){
                        initLigne();
                    }
                    else{
                        let finish = document.getElementById("finish");
                        finish.innerHTML = "Vous n'avez réussi à deviner le mot, dommage !";
                    }
                }
            }
        }
        else if (e.keyCode == 8) {
            for (let i = childs.length - 1; i >= 0; i--) {
                if (childs[i].innerHTML !== ".") {
                    childs[i].innerHTML = ".";
                    break;
                }
            }
        }
        else if ((e.keyCode > 64 && e.keyCode < 91)) {
            for (let i = 0; i < childs.length; i++) {
                if (childs[i].innerHTML === ".") {
                    childs[i].innerHTML = (e.key).toUpperCase();
                    break;
                }
            }
        }
    }

}

window.addEventListener("keyup", writeLetter);

const validateLigne = (childs) => {
    for(let i = 0; i < childs.length; i++){
        if(childs[i].innerHTML === mot[i].toUpperCase()){
            if(!(indexLetters.includes(i))){
                indexLetters.push(i);
            }
            childs[i].setAttribute("class", "good");
        }
        else if(mot.toUpperCase().includes(childs[i].innerHTML)){
            childs[i].setAttribute("class", "almost");
        }
    }
}