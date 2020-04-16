
/*
//Variables
const listaTweets = document.getElementById('lista-tweets');

//Event Listeners

eventListeners();

function eventListeners(){
    //cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    // contenido cargado
    // este evento se ejecuta una vez que cargó todo el HTML
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

//Funciones

//Añadir tweet del formulario
function agregarTweet(e){
    e.preventDefault();

    // crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    // leer el valor del textarea
    const tweet = document.getElementById('tweet').value;

    // crear elemento
    const li = document.createElement('li');
    li.innerText = tweet;
    // añade el boton de borrar el tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista
    listaTweets.appendChild(li);

    // Añadir a Local Storage
    agregarTweetLocalStorage(tweet);
}

//borrar tweet del DOM
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }
}

// Agregar tweet al Local Storage
function agregarTweetLocalStorage(tweet){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    // añadir el nuevo tweet
    tweets.push(tweet);

    // convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// mostrar datos de Local Storage en la lista
function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();
    
    tweets.forEach(function(tweet){
        // crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        // crear elemento
        const li = document.createElement('li');
        li.innerText = tweet;
        // añade el boton de borrar el tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}

// comprobar que haya elementos en localStorage, retorna un arreglo
function obtenerTweetsLocalStorage(){
    let tweets;
    // revisamos los valores de Local Storage
    // si no hay nada almacenado en local storage devuelve un array vacio
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else{
        // sino devuelve un JSON para que al final se le pueda agregar el ultimo tweet escrito
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

// eliminar tweet de local Storage
function borrarTweetLocalStorage(tweet){
    let tweets;
    let tweetBorrar;

    // elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length -1);
    
    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}
*/

// Variables
 
const listaTweets = document.getElementById('lista-tweets');
 
// Event Listeners
 
eventosEncadenados()
 
 
// Funciones
 
function eventosEncadenados() {
    document.querySelector('#formulario').addEventListener('submit', agregarTweet)
    // Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet)
 
    // contenido Cargado 
    document.addEventListener('DOMContentLoaded', localStorageListo)
}
 
function agregarTweet(e) {
 
    e.preventDefault()
    //console.log('Formulario Enviado')
 
    // crear botón borrar
 
    const botonBorrar = document.createElement('a')
    botonBorrar.classList = 'borrar-tweet'
    botonBorrar.innerText = 'X'
 
 
    // leer el valor del textarea
 
    const tweet = document.getElementById('tweet').value
    //console.log(tweet)
 
    // crear elemento
    const li = document.createElement('li')
    li.innerText = tweet
    // añade el botonBorrar
    li.appendChild(botonBorrar)
    listaTweets.appendChild(li)
 
    
    // agregar Tweet a LocalStorage 
 
    agregarTweetLocalStorage(tweet)
 
}
 
 
function borrarTweet(e) {
    e.preventDefault()
    //console.log('diste click en la lista')
    if(e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove()
        borrarTweetLocalStorage(e.target.parentElement.innerText)
        //console.log(e.target.parentElement.innerText)
    } 
 
}
 
// función que agrega el Tweet a LocalStorage 
 
function agregarTweetLocalStorage(tweet) {
    let tweets;
 
    tweets = obtenerTweetsLocalStorage()
    // añadir nuevo Tweet
    tweets.push(tweet)
    // convertir de string a arreglo para local Storage
    localStorage.setItem('tweets', JSON.stringify(tweets))
}
 
// mostrar la información proveniente de LocalStorage
 
function localStorageListo() {
    let tweets;
 
    tweets = obtenerTweetsLocalStorage()
    //console.log(tweets)
 
    tweets.forEach(function(tweet){
        // crear botón borrar
 
        const botonBorrar = document.createElement('a')
        botonBorrar.classList = 'borrar-tweet'
        botonBorrar.innerText = 'X'
 
 
        // crear elemento
        const li = document.createElement('li')
        li.innerText = tweet
        // añade el botonBorrar
        li.appendChild(botonBorrar)
        listaTweets.appendChild(li)
    })
}
 
// comprueba que haya elementos en localStorage
 
function obtenerTweetsLocalStorage() {
    let tweets;
 
    if(localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'))   
    }
 
    return tweets;
 
}
 
// eliminar Tweet del Local Storage
 
function borrarTweetLocalStorage(tweet) {
    let tweets;
    let tweetBorrado;
    // así se obtiene el tweet a borrar y cortado 
    tweetBorrado = tweet.substring(0, tweet.length - 1)
 
    tweets = obtenerTweetsLocalStorage(); 
 
    tweets.forEach(function(tweet, index){
        if(tweetBorrado === tweet) {
            tweets.splice(index, 1)
        }
    })
 
    localStorage.setItem('tweets', JSON.stringify(tweets))
}