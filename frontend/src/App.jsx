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
import { ProductosXML } from "./components/ProductosXML";
import { ProductosForm } from "./components/ProductosForm";
import { Navegacion } from "./pages/Navegacion";
import { Perfil } from "./pages/Perfil";
import { ClientesForm } from "./components/ClientesForm";
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
      <Route path='/crear-clientes' element={
        <RutasPrivadas>
          <Navegacion/>
          <ClientesForm/>
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
          <ProductosXML/>
        </RutasPrivadas>
      }
      />
      <Route path='/crear-productos' element={
        <RutasPrivadas>
          <Navegacion/>
          <ProductosForm/>
        </RutasPrivadas>
      }
      />
      <Route path='/perfil' element={
        <RutasPrivadas>
          <Navegacion/>
          <Perfil/>
        </RutasPrivadas>
      }
      />
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
