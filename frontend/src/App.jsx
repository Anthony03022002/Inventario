import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Inicio } from "./pages/Inicio";
import { Login } from "./pages/Login";
import { Archivos } from "./components/Archivos";
import { Registro } from "./pages/Registro";
import { RutasPrivadas } from "./pages/RutasPrivadas";
import { Productos } from "./components/Productos";
import { Ventas } from "./components/Ventas";
import { VentasForm } from "./components/VentasForm";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to='/Inicio' />} />
      <Route path='/inicio' element={<Inicio/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/registro' element={<Registro/>} />

      <Route path='/archivos' element={
        <RutasPrivadas>
          <Archivos/>
        </RutasPrivadas>
      } />

      <Route path='/productos' element={
        <RutasPrivadas>
          <Productos/>
        </RutasPrivadas>
      }
      />
      <Route path='/ventas' element={
        <RutasPrivadas>
          <Ventas/>
        </RutasPrivadas>
      }
      />
      <Route path='/crear-ventas' element={
        <RutasPrivadas>
          <VentasForm/>
        </RutasPrivadas>
      }
      />
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
