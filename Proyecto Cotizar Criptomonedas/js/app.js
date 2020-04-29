const cotizador = new API('6252193b9c3d0364b9fffc837138ed143e8b3fb7e680fead98e76f5b0b2c0c6d');
const ui = new Interfaz();

cotizador.obtenerMonedasAPI();
// leer el formulario

const formulario = document.querySelector('#formulario');

// Event listener
formulario.addEventListener('submit', (e) =>{
    e.preventDefault();

    // leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

    // leer la criptomoneda seleccionada
    const criptoSelect = document.querySelector('#criptomoneda');
    const criptoSeleccionada = criptoSelect.options[criptoSelect.selectedIndex].value;

    // comprobar que ambos campos tengan algo seleccionado
    if(monedaSeleccionada === '' || criptoSeleccionada === ''){
        // arrojar una alerta de error
        ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');
    }else{
        // todo bien, consultar la api
        cotizador.obtenerValores(monedaSeleccionada, criptoSeleccionada)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoSeleccionada);
            })
    }
    
})