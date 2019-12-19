import './Header.css'
import React from 'react'

//o header recebeu as propriedades (title, subtitle...) do MAin
//o d-none permite que o header não aperecerá em dispositivos pequenos, o sm-flex permite que seja msotrado em dispositivo médio pra cima
export default props => 
    <header className="header d-none d-sm-flex flex-column">
        <h1 className="mt-3">
            <i className={`fa fa-${props.icon}`}></i> {props.title}

        </h1>
        <p className="lead text-muted">{props.subtitle}</p>
    </header>