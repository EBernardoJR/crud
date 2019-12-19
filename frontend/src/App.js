import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css';
import { BrowserRouter } from 'react-router-dom'//o hashrouter colocar o #
import Routes from './Routes'
import Footer from'./components/Footer'
import Nav from'./components/Nav'
import Logo from'./components/Logo'

//substituir o HOME pelo Routes, que onde irá os Componentes home e userCrud

function App() {
  return (
    <BrowserRouter>

      <div className="app">
    <Logo />
    <Nav />
    <Routes />
    <Footer />
    </div>
    </BrowserRouter>

  );
}

export default App;
