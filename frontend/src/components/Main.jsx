import './Main.css'
import React from 'react'
import Header from './Header.jsx'

// o {..props} significa que as proprieddades do main foi para o header
//o react.fragment possibilita ser mostrado dois elementos(Importado + jsx) sem precisar pôr em uma div
export default props => 
    <React.Fragment>
        <Header {...props}/>
        <main className="content container-fluid">
            <div className="p-3 mt-3">
                {props.children}
            </div>
            </main>
    </React.Fragment>