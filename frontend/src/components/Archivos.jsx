import { Link } from "react-router-dom";
import { obtenerClientes } from "../api/clientes.api";
import { useEffect, useState } from "react";
export function Archivos() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function cargarClientes() {
      const res = await obtenerClientes();
      setClientes(res.data);
    }
    cargarClientes();
  }, []);
  
  return (
    <div>
      <div>
        <h1 className="text-center">Clientes</h1>
        {clientes.map((cliente) => (
          <div key={cliente.id}>
            <p>
              <strong>Persona:</strong> #{cliente.id}
            </p>
            <p>
              <strong>Cedula:</strong> {cliente.cedula}
            </p>
            <p>
              <strong>Nombre:</strong> {cliente.nombre}
            </p>
            <p>
              <strong>Apellido:</strong> {cliente.apellido}
            </p>
            <p>
              <strong>Email:</strong> {cliente.email}
            </p>
            <p>
              <strong>Celular:</strong> {cliente.celular}
            </p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
