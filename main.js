$(document).ready(init);

function init(){

  // Array Rubrica !!IMPORTANTE : se cambia, cambiare anche quello nella funzione
  //per stampare l'intestazione della chat attiva
  var contacts = [

   {

    id: 1,
    name: "Luca",
    img: "luca.jpg",
    last_access: randomTime()
  },

  {
    id: 5,
    name: "Antonio",
    img: "antonio.jpg",
    last_access: randomTime()
   },

  {
    id: 2,
    name: "Francesco",
    img: "francesco.jpg",
    last_access: randomTime()
    },

    {

    id: 3,
    name: "Paolo",
    img: "paolo.jpg",
    last_access: randomTime()
    },

   {

    id: 4,
    name: "Nicola",
    img: "nicola.jpg",
    last_access: randomTime()
  },
  {

   id: 6,
   name: "Luisa",
   img: "luisa-6.jpg",
   last_access: randomTime()
 },

 {
   id: 7,
   name: "Luca",
   img: "luca-7.jpg",
   last_access: randomTime()
  },

 {
   id: 8,
   name: "Imma",
   img: "imma-8.jpg",
   last_access: randomTime()
   },

   {

   id: 9,
   name: "Maria",
   img: "maria-9.jpg",
   last_access: randomTime()
   },

  {

   id: 10,
   name: "Felice",
   img: "felice-10.jpg",
   last_access: randomTime()
   }

  ];

  var targetSearch = $('.search-bar input');

  console.log(contacts);

  // Stsmpo la lista dei contatti passati tramite
  // Array di oggetti
  printContactList(contacts);

  // Al click sul contatto la funzione crea la chat e l'attiva se
  //non esiste, se esiste attiva la chat e disattive tutte le altre
  $(document).on('click', '.contacts li' , checkPrintActiveChat);

  // Invio del messaggio
  $(document).on('click', '#sendMsg' , sendMsg);

  // Azione per filtro elenco contatti
  $(targetSearch).keyup(function() {

    var contact_on_video = $('.contact');
    var input = $(this).val().toLowerCase();

    searchContact(input, contacts, contact_on_video);
  });

  // Azione per eleminare ultimo messaggio
  $(document).on('click', '.message .fa-caret-down', activedrop)
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
      time: array[i].last_access
    };

    var html = template(context);
    $('#contact-list .contacts').append(html);

    }

  }

// Funzione che usa handlebars per stampare la chat relativa al contatto
// cliccato, se questo non è presente, altrimenti lo attiva
function checkPrintActiveChat(){

  // Rimuovo la classe active dalle chat attive
  $('#chat-window main .wrapper-chat').removeClass('active');
  // Rimuovo la classe active da tutti gli elementi
  $('.contact').removeClass('active');
  // Aggiungo la classe active solo all'elemento cliccato
  $(this).toggleClass('active');
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
  var target_lastMsg= $('#chat-window .wrapper-chat.a');


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
    },
    {

     id: 6,
     name: "Luisa",
     img: "luisa-6.jpg"
   },

   {
     id: 7,
     name: "Luca",
     img: "luca-7.jpg"
    },

   {
     id: 8,
     name: "Imma",
     img: "imma-8.jpg"
     },

     {

     id: 9,
     name: "Maria",
     img: "maria-9.jpg"
     },

    {

     id: 10,
     name: "Felice",
     img: "felice-10.jpg"
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
function bot(append_to){

  // Aggiungo animazione in attesa della timing function
  addAnimation()

  setTimeout(function(){

    // rimuovo Animazione
    $('.wrapper-chat .contact-chat.animation').remove();

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

    // inserisco l'ultimo messaggio e l'orario relativo
    //nel template contatto nella lista contatti, dopo controllo lunghezza
    if (randomRisposta.length > 15) {
      var trimmedRisposta = randomRisposta.substring(0, 13) + "...";
      console.log(trimmedRisposta);
      $('.active .last-msg').text(trimmedRisposta);

    }else{

      $('.active .last-msg').text(randomRisposta);
    }
    // Orario ultimo messaggio
    $('.active .time-lastMsg').text(hours);
  }, 2500, );


}


// Funzione per il filro nell'elenco contatti
function searchContact(input, contacts, elementi){

  // metto tutti i contact in display none
  $('.contact').addClass('display_none');
  var name;
  var id;
  // var contact_list = $('.contact .user-info');
  // console.log(contact_list.children('span').text());

  // Ciclo array contatti per trovare nome ed id
  for (var i = 0; i < contacts.length; i++) {

    name = contacts[i].name.toLowerCase();

    //Se L'elemento del ciclo, include il valore digitato
    if (name.includes(input)) {
      // Estrapolo l'id
      id = contacts[i].id;
      console.log(name, id);
      // Cerco tra i contatto l'id, attivo la classe
      //disattivandola a tutti gli altri
      elementi.each(function(index, el) {
        console.log(el.id == id);
        if (el.id == id) {
          console.log(el);
          // Mostro il contatto che ha la corrispondenza esatta
          el.setAttribute( 'class', 'contact' );
          console.log(el);
        }

      });

    }


  }
}


// Funzione che genera un orario per l'ultimo accesso,
//in modo randomico
function randomTime(){

    var get_hour= Math.floor(Math.random() * 24 + 1);
    var get_minutes =  Math.floor(Math.random() * 59 + 1);

    if (get_hour < 10) {
      get_hour = "0" + get_hour;
    }
    if (get_minutes < 10) {
      get_minutes = "0" + get_minutes;
    }
    return get_hour + ":" + get_minutes

}

// Funzione per eliminare ultimo messaggio
function activedrop(){

  var drop = $(this).siblings('.drop');
  drop.addClass('active');

}

//funzione per clonare ed appendere l'animazione all'interno
//dell'ultima riga presetne in chat
function addAnimation(){

  var wrapperPallini =  $('#templateTwo .contact-chat').clone();
  var appentTo = $('.wrapper-chat.active').append(wrapperPallini);
}
