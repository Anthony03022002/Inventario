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
import { ProductosForm } from "./components/ProductosForm";
import { Navegacion } from "./pages/Navegacion";
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
          <Navegacion/>
          <Archivos/>
        </RutasPrivadas>
      } />

      <Route path='/productos' element={
        <RutasPrivadas>
          <Navegacion/>
          <Productos/>
        </RutasPrivadas>
      }
      />
      <Route path='/ventas' element={
        <RutasPrivadas>
          <Navegacion/>
          <Ventas/>
        </RutasPrivadas>
      }
      />
      <Route path='/crear-ventas' element={
        <RutasPrivadas>
          <Navegacion/>

          <VentasForm/>
        </RutasPrivadas>
      }
      />
      <Route path='/crear-xml' element={
        <RutasPrivadas>
          <Navegacion/>

          <ProductosForm/>
        </RutasPrivadas>
      }
      />
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
