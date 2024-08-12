import { useNavigate } from "react-router-dom";
import { Perfil } from "../pages/Perfil";
import { obtenerClientes } from "../api/clientes.api";
import { useEffect, useState } from "react";
export function Archivos() {
  const [clientes, setClientes] = useState([]);

    useEffect (()=>{
      async function cargarClientes() {
        const res = await obtenerClientes();
        setClientes(res.data);
      }
      cargarClientes();
    },[])


    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/inicio');
    }

  return (
    <div>
      <button
      onClick={handleLogout}
      >Cerrar Sesion</button>
      <Perfil/>
      <div>
        {clientes.map((cliente)=>(
          <div key={cliente.id}>
            <p><strong>Persona:</strong> #{cliente.id}</p>
            <p><strong>Cedula:</strong> {cliente.cedula}</p>
            <p><strong>Nombre:</strong> {cliente.nombre}</p>
            <p><strong>Apellido:</strong> {cliente.apellido}</p>
            <p><strong>Email:</strong> {cliente.email}</p>
            <p><strong>Celular:</strong> {cliente.celular}</p>
            <hr />
          </div>
        ))}
      </div>
      
    </div>
  )
}
