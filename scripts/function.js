import { listeDeMot, listeDePhrase } from './config.js';

//------------------------------ VARIABLE-----------------------
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

//--------------------FIN VARIABLE


//--------------------Function a Appeller-------------------

export function lancerJeu()
{
    choisirMode()
}
//---------------------FIN------------------------------------

/*
function AfficheScore(score, essaie, tailleTableau)
{
    return "Vous avez reussi a trouver " + score + " mot(s) avec vos " + essaie + " essaies sur les " + tailleTableau + " mot(s)"
}
*/

function randomVal(min,max)
{
    return Math.floor(Math.random() * (max - min) + min)
}

function ChoisirChaine(listeMots)
{
    if (listeMots.length === 0) {
        return null;
    }
    
    const index =  randomVal(0,listeMots.length)
    const element = listeMots[index]

     // Retirer l'élément utilisé de la liste
     listeMots.splice(index, 1);   

    return element
    
}

function choisirMode()
{
    if (etat == true)
    {
        debloquerZone()
        console.log(`Option sélectionnée : ${selectedOption.id} `)
        jeu(selectedOption.id)
    }
}



// creer une fonction actualise score 
function actualiseScore()
{
    zoneScore.textContent = `${score} / ${nbEssaies}`
    zoneScorePop.textContent =  `${score} / ${nbEssaies}`
}

//fonction pour recommencer la partie
function initJeu()
{
    score = 0
    nbEssaies = 0
    etat = true
    motsDisponibles = [...listeDeMot]
    phrasesDisponibles = [...listeDePhrase]
    inputEcriture.value = null
    actualiseScore()
    choisirMode()
}



function verifChaine()
{
    const valeurSaisie = inputEcriture.value
    const proposition = zoneProposition.textContent
    if (valeurSaisie==null || valeurSaisie.length == 0)
    {
        return
    }

    if (valeurSaisie === proposition)
    {
        score++
        nbEssaies++
        choisirMode()
    }
    else
    {
        nbEssaies++
    }
    //on remet le champs a null apres la verification
    inputEcriture.value = null
    actualiseScore()
}


// phraseDisponible et motDisponible sont des variables globales definis en haut du fichier
function jeu(mode)
{
    let chaine = null
    let modeJeu =null

    if(mode == "phrases") { modeJeu = phrasesDisponibles } 
    if (mode == "mots") { modeJeu = motsDisponibles }
    
    if (modeJeu)
    {
        chaine = ChoisirChaine(modeJeu)
    }
    else
    {
        return
    }
    console.log(chaine)
    if (chaine == null)
    {   
        zoneProposition.textContent = `Tous les ${mode} ont été trouvés.`
        etat = false
        bloquerZone()
        return
    }
    zoneProposition.textContent = chaine


    return
}


function bloquerZone() {
    inputEcriture = document.getElementById('inputEcriture');
    inputEcriture.disabled = true; // Ajoute l'attribut "disabled"
  }
  
  function debloquerZone() {
    inputEcriture = document.getElementById('inputEcriture');
    inputEcriture.disabled = false; // Supprime l'attribut "disabled"
  }

  function dataForm(){
    // Récupérer les données du formulaire
    // pour utiliser formData il faut avoir la classe name dans les inputs du formulaire
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    console.log(formObject);
    //sendMail(formObject)
  }

  /* A revoir methode pour envoyer des mails
  function sendMail(formObject) {
    const nom = formObject.nom || null;
    const prenom = formObject.prenom || null;
    const mail = formObject.mail || null;
  
    console.log(`send mail : ${nom}`);
    console.log(`send mail : ${prenom}`);
    console.log(`send mail : ${mail}`);
  
    const serviceID = "service_7xnq739"; // Remplacez par votre Service ID
    const templateID = "template_jdu3rgq"; // Remplacez par votre Template ID
  
    const templateParams = {
      nom: nom,
      prenom: prenom,
      mail: mail,
    };
   
    //emailjs.init("X29kHMtuVRsY9tMk0")

    emailjs.send(serviceID, templateID, templateParams)
      .then(() => {
        alert("Email envoyé avec succès !");
      })
      .catch((err) => {
        alert("Échec de l'envoi : " + JSON.stringify(err));
      });
      
  }
  */
//..........................POP UP.........................................

btnPartager.addEventListener("click", () => {
    popupPartager.classList.remove("hidden"); // Affiche la popup
});

btnFermerPartager.addEventListener("click", () => {
    popupPartager.classList.add("hidden"); // Masque la popup
});

form.addEventListener("submit", (event) => {
    // On empêche le comportement par défaut
    event.preventDefault();
});

btnEnvoyerPartager.addEventListener("click",()=> {
    popupPartager.classList.add("hidden"); // Masque la popup
    dataForm()
    form.reset()
    
})



//----------------------------EVENEMENT-------------------------------------


// Ajouter un écouteur d'événements pour les changements dans la zone des options

let listeBtnMode = document.querySelectorAll(".optionSource input")
for (let i = 0 ; i< listeBtnMode.length; i++) {
    listeBtnMode[i].addEventListener("change" ,(event) => {
            selectedOption = event.target
            console.log(event)
            choisirMode()
        })
}

// Ajouter un événement "click" au bouton
btnValiderMot.addEventListener('click', () => {
    verifChaine()
})

// Ajouter un écouteur d'événements sur la touche entrer qui fait la meme action que le bouton valider
inputEcriture.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      btnValiderMot.click();
    }
  })

  // Ajouter un événement "click" au bouton init pour reinitialiser la partie
btnInit.addEventListener('click', () => {
    initJeu()
})

  //-----------------------------FIN EVENEMENT------------------------------------