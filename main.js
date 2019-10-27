$(document).ready(init);

function init(){

  // Array Rubrica
  var contacts = [

   {

    id: 1,
    name: "Luca",
    img: "luca.jpg"
  },

  {
    id: 5,
    name: "Antonio",
    img: "antonio.jpg"
   },

  {
    id: 2,
    name: "Francesco",
    img: "francesco.jpg"
    },

    {

    id: 3,
    name: "Paolo",
    img: "paolo.jpg"
    },

   {

    id: 4,
    name: "Nicola",
    img: "nicola.jpg"
    }
  ];

  var targetSearch = $('.search-bar input');


  // Stsmpo la lista dei contatti passati tramite
  // Array di oggetti
  printContactList(contacts);

  // Al click sul contatto la funzione crea la chat e l'attiva se
  //non esiste, se esiste attiva la chat e disattive tutte le altre
  $(document).on('click', '.contacts li' , checkPrintActiveChat);

  // Invio del massaggio
  $(document).on('click', '#sendMsg' , sendMsg);

  // Azione per filtro elenco contatti
  $(targetSearch).keyup(function() {

    var input = $(this).val().toLowerCase();

    searchContact(input, contacts);
  });
}

// Funzione che accetta un Array di oggetti
// e stampa con handlebars gli oggetti dell array
function printContactList(array){

  // Stampo ogni oggetto dell array con HANDLEBARS
  for (var i = 0; i < array.length; i++) {
    var source = document.getElementById('contact-template').innerHTML;
    var template = Handlebars.compile(source);

    var context= {
      contact_id: array[i].id,
      name_contact: array[i].name,
      src_img: array[i].img,
      time: array[i].id,
      icon: array[i].id
    };

    var html = template(context);
    $('#contact-list .contacts').append(html);

    }

  }

// Funzione che usa handlebars per stampare la chat relativa al contatto
// cliccato, se questo non è presente
function checkPrintActiveChat(){

  // Rimuovo la classe active dalle chat attive
  $('#chat-window main .wrapper-chat').removeClass('active');

  var id_contact = $(this).attr('id');
  var chat = $('.wrapper-chat');
  var check = false;

  var source = document.getElementById('wrapper-chat-template').innerHTML;
  var template = Handlebars.compile(source);
  var context= {
    id: id_contact
  };
  var html = template(context);

  // SE LE CHAT SONO A ZERO
  if (chat.length == 0) {
    // Appendo un template di andlebars per la chat cliccata
    // e attivo il display della chat
    $('#chat-window main').append(html);

    $('#chat-window main .wrapper-chat[data-id=' + id_contact + ']').addClass('active');
  }else if(chat.length > 0){
    // Altrimenti controllo le chat create
    for (var i = 0; i < chat.length; i++) {
      var el = chat[i];

      // Se il contatto cliccato ha già iniziato una conversazione
      if (el.getAttribute("data-id") == id_contact) {
        // la variabile diventa true
        check = true;

        $('#chat-window main .wrapper-chat[data-id=' + id_contact + ']').addClass('active');
      }
    }
    console.log("io sono checcato", check);
    // Se la variabile è false, ossia non è presente
    //nessuna chat per il contatto cliccato...
    if (check == false) {


      // Appendo il template con la chat ed attivo il display della chat
      $('#chat-window main').append(html);
      // Aggiungo la classe .active
      $('#chat-window main .wrapper-chat[data-id=' + id_contact + ']').addClass('active');

    }
  }

  // Stampo le info della chat ATTIVA
  printInfoChat(id_contact);
}

// Funzione per inviare un messaggio per la chat attiva relativa
function sendMsg(){

  var time = new Date();
  var minutes = time.getMinutes();
  console.log( "0" + minutes);
  if (minutes < 10) {
    minutes =  "0" + minutes;
  }
  var hours = time.getHours() + ":" + minutes;

  var msg = $('#inputMsg input').val();
  var chat = $('.wrapper-chat');

  console.log(hours);

  var source = document.getElementById('msg-template').innerHTML;
  var template = Handlebars.compile(source);

  var context = {
    text: msg,
    time: hours
  };

  var html = template(context);

  for (var i = 0; i < chat.length; i++) {
    var el = chat[i];
    // Appendo il template solo sulla chat attiva
    console.log(el.getAttribute("class"));
    if (el.getAttribute("class").includes('active')) {
      // Appendo il messaggio inviato nella finestra di chat attiva
      $('#chat-window .wrapper-chat.active').append(html);
      // Risposta al messaggio in uscita
      bot();
    }
  }


}

// Funzione che al click stampa le info sulla chat ATTIVA
function printInfoChat(id){

  // Rimuovo il template precedente
  $('#active-contact').html('');

  // Array Rubrica
  var contacts = [

   {

    id: 1,
    name: "Luca",
    img: "luca.jpg"
  },

  {
    id: 5,
    name: "Antonio",
    img: "antonio.jpg"
   },

  {
    id: 2,
    name: "Francesco",
    img: "francesco.jpg"
    },

    {

    id: 3,
    name: "Paolo",
    img: "paolo.jpg"
    },

   {

    id: 4,
    name: "Nicola",
    img: "nicola.jpg"
    }
  ];

  var source = document.getElementById('info-chat-template').innerHTML;
  var template = Handlebars.compile(source);

  // Trovo nell'array rubrica tramite id, il contatto dal quale
  //estrarre i valori per completare il template
  for (var i = 0; i < contacts.length; i++) {

    var el = contacts[i];

    if (el.id == id) {
      var context = {
        contact_name: el.name,
        img: el.img
      };

      var html = template(context);
      $('#active-contact').prepend(html);
    }
  }
}

// Funzione che restituisce un elemeneto dell'array in ingrasso in modo
//randomico
function randomGenerator(array){

  var rand = Math.floor(Math.random() * (array.length -1));

  for (var i = 0; i < array.length; i++) {

    var element = array[i];

    if (i == rand) {
      return element;
    }
  }
}


// Funzione che stampa la risposta scelta nella array
// in modo randomico
function bot(){

  var arr_risposte = [
    "ciao",
    "sono solo un robot scemo",
    "dico sempre le stesse cose",
    "è inutile che chiedi, tanto sono scemo",
    "smettila",
    "ora sono stanco",
    "buona notte",
    "magari domani possiamo parlare con calma",
    "sto rientrando solo adesso",
    "ci sentiamo!",
    "spengo il telefono",
    "speriamo",
    "non lo so",
    "penso di dormire"
  ];

  var randomRisposta = randomGenerator(arr_risposte);

  // Clacolo dell'ora di ricezione del messaggio
  var time = new Date();
  var minutes = time.getMinutes();
  console.log( "0" + minutes);
  if (minutes < 10) {
    minutes =  "0" + minutes;
  }
  var hours = time.getHours() + ":" + minutes;

  var source = document.getElementById('msg-risposta-template').innerHTML;
  var template = Handlebars.compile(source);

  var context = {
    text: randomRisposta,
    time: hours
  };

  // Appendo la risposta con template Handlebars
  var html = template(context);



  // Appendo il messaggio in chat
  $('#chat-window .wrapper-chat.active').append(html);

}


// Funzione per il filro nell'elenco contatti
function searchContact(input, contacts){

  console.log(input);
  console.log(contacts);
  var name;
  var id;
  // var contact_list = $('.contact .user-info');
  // console.log(contact_list.children('span').text());

  // Ciclo array contatti per trovare nome ed id
  for (var i = 0; i < contacts.length; i++) {

    name = contacts[i].name.toLowerCase();

    //Se L'elemento del ciclo, include il valore digitato
    if (name.includes(input)) {
      console.log(name);
    }
  }
}
