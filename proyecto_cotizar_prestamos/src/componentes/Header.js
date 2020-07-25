import React, {Fragment} from 'react';
import App from '../App';

// Primera forma de escribir componentes funcionales
/*
function Header(props){

    console.log(props)
    return (
        <Fragment>
            <h1>{props.titulo}</h1>
            <p>{props.descripcion}</p>
        </Fragment>
    )
}
*/

// otra forma de escribir los props
/*
function Header({titulo}){

    return (
        <Fragment>
            <h1>{titulo}</h1>
        </Fragment>
    )
}
*/

// Segunda forma de escribir componentes funcionales
//escribir 'sfc' para que te escriba automaticamente toda la estructura de la función

const Header = ({titulo}) => (
    <h1>{titulo}</h1>
);
 
export default Header;