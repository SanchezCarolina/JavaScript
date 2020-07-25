    // Seguro Constructor
     
    function Seguro(marca, anio, tipo) {
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
        
    }
     
    Seguro.prototype.cotizarSeguro = function() {
        /*
            1 = americano = 1.15
            2 asiatico = 1.05
            3 europeo = 1.35
     
        */
        let cantidad;
        const base = 2000;
     
        switch(this.marca) {
            case '1':
                cantidad = base * 1.15
                break;
            case '2':
                cantidad = base * 1.05
                break;
            case '3':
                cantidad = base * 1.35
                break;
        }
     
        // Leer el año 
        const diferencia = new Date().getFullYear() - this.anio;
        // Cada año de diferencia hayq ue reducir 3% el valor del seguro
        cantidad -= ((diferencia * 3) * cantidad) / 100;
     
        /* si el seguro es básico se multiplica 30% más*/
        /* si es completo 50% */ 
        if(this.tipo === 'basico') {
            cantidad *= 1.30;
        } else {
            cantidad *= 1.50;
        }
     
     
        return cantidad;
    }
     
    // Todo lo que se muestra
     
    function Interfaz() {}
     
    Interfaz.prototype.mostrarMensaje = function(mensaje, tipo){
     
        const div = document.createElement('div');
     
        if(tipo === 'error') {
     
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
     
        div.innerHTML = `${mensaje}`; 
        formulario.insertBefore(div, document.querySelector('.form-group'));
     
        setTimeout(function(){
            document.querySelector('.mensaje').remove();
        }, 3000);
     
    }
     
    Interfaz.prototype.mostrarResultado = function(seguro, cantidad) {
     
        const resultado = document.getElementById('resultado');
        let marca;
        switch(seguro.marca){
            case '1':
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiático';
                break;
            case '3':
                marca = 'Europeo';
                break;
        }
        
        const div = document.createElement('div');
     
        div.innerHTML = `
            <p class="header">Tu Resumen: </p>
            <p> Marca: ${marca} </p>
            <p> Año: ${seguro.anio} </p>
            <p> Tipo: ${seguro.tipo} </p>
            <p> Total : $ ${cantidad} </p>
        `;
     
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
     
        setTimeout(function(){
     
            spinner.style.display = 'none';
            resultado.appendChild(div)
     
        }, 2000)
     
     
        
     
    }
     
    // EventListener
     
    const formulario = document.getElementById('cotizar-seguro');
     
    formulario.addEventListener('submit', function(e){
        e.preventDefault();
     
        // método para obtener el valor de un option
        const marca = document.getElementById('marca')
        const marcaSeleccionada = marca.options[marca.selectedIndex].value;
     
        const anio = document.getElementById('anio');
        const anioSeleccionado = anio.options[anio.selectedIndex].value;
     
        // leer el valor de radio button
     
        const tipo = document.querySelector('input[name="tipo"]:checked').value;
        
        // La interfaz se construye adentro del EventListener
     
        const interfaz = new Interfaz();
     
        // Revisamos que los campos no estén vacíos
     
        if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === '' ) {
     
            //Interfaz imprimiendo error
            interfaz.mostrarMensaje('Faltan datos, revisa el formulario', 'error')
        } else {
     
            const resultados = document.querySelector('#resultado div')
     
            if(resultados != null) {
                resultados.remove()
            }
     
            const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
     
            const cantidad = seguro.cotizarSeguro(seguro)
     
            interfaz.mostrarResultado(seguro, cantidad);
            interfaz.mostrarMensaje('Cotizando...', 'correcto')
        }
     
        
    })
     
    const max = new Date().getFullYear();
          min = max - 20;
          
    const selectAnios = document.getElementById('anio')
     
    for(let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        selectAnios.appendChild(option);
    }