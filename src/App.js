import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';

export default class App extends Component {

  render() {
    return (
      <BrowserRouter basename='/'>
        <Navbar />

        <Routes>

          <Route path='/' element={
            <News
              pageSize={6}
              country="in"
            />
          } />

          <Route path='/about' element={
            <About />
          } />


        </Routes>
      </BrowserRouter>
    )
  }
}