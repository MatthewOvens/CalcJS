const tastiNumerici = document.querySelectorAll(".tasto");
const tastiOperazioni = document.querySelectorAll(".ops");

var displayOperazione = document.getElementById("displayOp");
var risultato = document.getElementById("campo");

var flagRisultato = false;

//Gestione operazioni con controllo per evitare di 
function gestioneOperazioni (operatore) {
  if(flagRisultato) {  //Controllo che non sia visualizzato un risultato finale
    risultato.innerHTML = "";
    flagRisultato = false;
  }
  
  if(risultato.innerHTML == "*" || risultato.innerHTML == "-" || risultato.innerHTML == "+" || risultato.innerHTML == "/") {
    risultato.innerHTML = operatore;
  }
  else {
    displayOperazione.innerHTML += risultato.innerHTML;
  }
  risultato.innerHTML = "";
  risultato.innerHTML += operatore;
}

//Controllo numeri/punto
tastiNumerici.forEach((tasto) => {     
  tasto.addEventListener("click", (e) => {
    if(flagRisultato) {  //Controllo che non sia visualizzato un risultato finale
      risultato.innerHTML = "";
      flagRisultato = false;
    }
    
    //Controllo che non si concatenino operatori uno dietro l'altro
    if(risultato.innerHTML == "*" || risultato.innerHTML == "-" || risultato.innerHTML == "+" || risultato.innerHTML == "/") {
      displayOperazione.innerHTML += risultato.innerHTML;
      risultato.innerHTML = "";
    }

    //Controllo se immesso è un "."
    if(e.target.value == ".") { 
      if(!risultato.innerHTML.includes(".")){  //Controllo del punto: se nel display ne è presente un altro, non lo immette
        risultato.innerHTML += e.target.value;
      }
    }
    else {
      risultato.innerHTML += e.target.value;
    }
  });
});

//Controllo operazioni
tastiOperazioni.forEach(operazione => {
    operazione.addEventListener("click", (e) => {
      switch (e.target.value) {
        case "*": 
          if(!flagRisultato) {
            gestioneOperazioni("*");
          }
          break;
        case "/": 
          if(!flagRisultato) {
            gestioneOperazioni("/");
          }
          break;
        case "+": gestioneOperazioni("+");
          break;
        case "-": gestioneOperazioni("-");
          break;
        case "DEL":
          if(!flagRisultato) {  //Controllo che non sia visualizzato un risultato finale così da evitare di cancellare quello
            risultato.innerHTML = risultato.innerHTML.substring(0, risultato.innerHTML.length-1);
          }
          break;
        case "C": 
          risultato.innerHTML = "";
          displayOperazione.innerHTML = "";
          break;
        case "=":
          flagRisultato = true;

          if(risultato.innerHTML == "" || displayOperazione.innerHTML == "") {
            risultato.innerHTML = "";
          }
          else {
            if(risultato.innerHTML == "*" || risultato.innerHTML == "-" || risultato.innerHTML == "+" || risultato.innerHTML == "/") {
              risultato.innerHTML = eval(displayOperazione.innerHTML);
              displayOperazione.innerHTML = "";
            }
            else {
              displayOperazione.innerHTML += risultato.innerHTML; 
              risultato.innerHTML = eval(displayOperazione.innerHTML);
              displayOperazione.innerHTML = "";
            }
          }
          break;
        default: break;
      }
    });
});
