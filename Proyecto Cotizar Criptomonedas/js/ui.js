class Interfaz {

    constructor(){
        this.init();
    }

    init(){
        this.construirSelect();
    }

    construirSelect(){
        cotizador.obtenerMonedasAPI()
            .then(monedas =>{
                // crear un select de opciones
                const select = document.querySelector('#criptomoneda');

                // iterar por los resultados de la api
                for ( const [key, value] of Object.entries(monedas.monedas.Data)){

                    // añadir el symbol y el nombre como opciones
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
                }
            })
    }

    mostrarMensaje(mensaje, clases){
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        // seleccionar mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        //mostrar contenido
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);
    }

    // Imprime el resultado de la cotizacion
    mostrarResultado(resultado, moneda, criptomoneda){

        // en caso de un resultado anterior, ocultarlo
        const resultadoAnterior = document.querySelector('#resultado > div');

        if( resultadoAnterior ){
            resultadoAnterior.remove();
        }

        const datosMoneda = resultado[criptomoneda][moneda];

        // recortar digitos de precio 
        let precio = datosMoneda.PRICE.toFixed(2);
        let porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2);
        let actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-AR');

        // construir el template
        let templateHTML = `
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title"> Resultado: </h2>
                    <p> EL precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de: $ ${precio}
                    <p> Variación último día: % ${porcentaje} </p>
                    <p> Última actualización: ${actualizado} </p>
                </div>    
            </div>
        `;

        this.mostrarOcultarSpinner('block');

        setTimeout(() => {
             // insertar el resultado
        document.querySelector('#resultado').innerHTML = templateHTML;

        //ocultar el spinner
        this.mostrarOcultarSpinner('none');
        }, 3000);
       
    }

    // mostrar spinner de carga al enviar la cotizacion
    mostrarOcultarSpinner(vista){
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;
    }
}