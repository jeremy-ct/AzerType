
let listeDeMot = [
    "avion", "voiture", "camion",
    "bateau", "train", "vélo", 
    "moto", "tram", "bus", 
    "helicoptere", "fusee", "scooter", 
    "monorail", "trolleybus", "navette", 
    "cab", "cabriolet", "limousine", 
    "pick-up", "fourgon", "mini-bus", 
    "caravane", "roulotte", "motocyclette", 
    "autobus", "chariot", "peniche", 
    "yacht", "gondole", "tanker", 
    "katamaran", "cargaison", "voilier", 
    "zodiac", "bicyclette", "coupe", 
    "berline", "SUV", "crossover", 
    "monospace", "roadster", "tuk-tuk", 
    "diligence", "chameau", "cheval", 
    "pousse-pousse", "rickshaw", "traineau", 
    "skateboard", "hoverboard", "trottinette", 
    "bus scolaire", "van", "soute"
];


let listeDePhrase = [
    "Un avion est la.","la voiture roule.","Bonjour, comment tu vas ?",
    "Le chat dort sur le canapé","Le soleil brille aujourd'hui",
    "Le chien court dans le jardin.","Il pleut beaucoup ce soir.",
    "La porte est ouverte.","Je bois un verre d'eau.",
    "Le train arrive à l'heure.","Tu lis un bon livre ?",
    "Le bébé joue avec ses jouets.","Elle écoute de la musique douce.",
    "Ils marchent dans la rue.","Le feu de cheminée réchauffe la pièce.",
    "La fleur pousse dans le jardin.","Il mange une pomme.",
    "Nous regardons un film ce soir.",
];


//-----------------pour faire des tests----------------------------
/*
let listeDeMot = [
    "avion", "voiture", "camion"
];


let listeDePhrase = [
    "Un avion est la.","la voiture roule.","Bonjour, comment tu vas ?"
];
*/

// Copies des listes initiales pour éviter de modifier les originales
let motsDisponibles = [...listeDeMot];
let phrasesDisponibles = [...listeDePhrase];

//acces a la zone du mode de jeu
const zoneOptions = document.querySelector('.zoneOptions')

//acces a la valeur selectionné de zone option
let selectedOption  = zoneOptions.querySelector('input[name="optionSource"]:checked')

//acces au contenue de la saisie
let inputEcriture = document.getElementById('inputEcriture');

// acces au bouton de validation de la saisie
const btnValiderMot = document.getElementById('btnValiderMot');

// acces au bouton de reinitialisation
const btnInit = document.getElementById('btnInit');

//acces a la zone d'affichage des chaines à saisir
const zoneProposition = document.querySelector('.zoneProposition');

//acces à l'affichage du score
const zoneScore = document.getElementById("score")

let score = 0
let nbEssaies = 0

// permet de definir si la partie est terminé ou si elle est en cours
let etat = true

// POPUP
const btnPartager = document.getElementById("btnPartager");
const popupPartager = document.getElementById("popupPartager");
const btnFermerPartager = document.getElementById("btnFermerPartager");
const btnEnvoyerPartager = document.getElementById("btnEnvoyerPartager")


// FORMULAIRE
const form = document.querySelector('form');

const zoneScorePop = document.getElementById("scorePop")
