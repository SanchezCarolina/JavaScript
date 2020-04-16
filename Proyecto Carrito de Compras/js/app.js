//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Listeners
cargarEventListeners();

function cargarEventListeners(){
    //dispara cuando se presiona "Agregar carrito"
    cursos.addEventListener('click', comprarCurso);

    // cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // al cargar el documento, mostrar localStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

// Funciones
// Funcion que añade el curso al carrito
function comprarCurso(e){
    e.preventDefault();
    // Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')){
       const curso = e.target.parentElement.parentElement;
       // Enviamos el curso seleccionado para tomar sus datos
       leerDatosCurso(curso);
    }
}

// Lee los datos del curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    
    insertarCarrito(infoCurso);
}

// Muestra el curso seleccionado en el carrito
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td> 
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id=${curso.id}> X </a>
        </td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

// Elimina el curso del carrito
function eliminarCurso(e){
    e.preventDefault();

    let curso;
    let cursoId;

    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }

    eliminarCursoLocalStorage(cursoId);
}

// Eliminar todos los cursos del carrito en el DOM
function vaciarCarrito(){
    // forma lenta
   // listaCursos.innerHTML = '';

    // forma rápida (recomendada)
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }

    return false;

    // vaciar local storage
    vaciarLocalStorage();
}

// Almacena cursos del carrito al localStorage
function guardarCursoLocalStorage(curso){
    let cursos;
    // toma el valor de un arreglo con datos de LS o vacio
    cursos = obtenerCursosLocalStorage();

    // el curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));
}

// Comprueba que haya elementos en el local storage
function obtenerCursosLocalStorage(){
    let cursosLS;

    // comprobamos si hay algo en local storage
    if(localStorage.getItem('cursos') === null){
        cursosLS = [];
    }else{
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }

    return cursosLS;
}

// Imprime los cursos de local storage en el carrito
function leerLocalStorage(){
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso){
        // construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
            <td> 
                <img src="${curso.imagen}" width=100>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" class="borrar-curso" data-id=${curso.id}> X </a>
            </td>
        `;
        listaCursos.appendChild(row);
    });
}

// Eliminar el curso por el ID en local storage
function eliminarCursoLocalStorage(curso){
    let cursosLS;

    // obtenemos el arreglo de todos los cursos
    cursosLS = obtenerCursosLocalStorage();

    // iteramos comparando el ID del curso borrado con los del LS
    cursosLS.forEach(function(cursols, index){
        if(cursols.id === curso){
            cursosLS.splice(index, 1);
        }
    });

    // añadimos el arreglo actual al local storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

// Elimina todos los cursos de local storage
function vaciarLocalStorage(){
    localStorage.clear();
}