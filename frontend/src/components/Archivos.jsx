import { obtenerClientes, eliminarClientes } from "../api/clientes.api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export function Archivos() {
  const [clientes, setClientes] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    async function cargarClientes() {
      const res = await obtenerClientes();
      setClientes(res.data);
    }
    cargarClientes();
  }, []);

  const handleEliminarCliente = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
    if (confirmar) {
      try {
        await eliminarClientes(id);
        setClientes(clientes.filter(cliente => cliente.id !== id));
      } catch (error) {
        console.error("Error eliminando cliente", error);
      }
    }
  };
  

  return (
    <div>
      <button
          className="btn1"
          onClick={() => {
            navigate("/crear-clientes");
          }}
        >
          Nuevo cliente
        </button>
      <div className="container border">
        <h4 className="text-center">Clientes</h4>
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Cédula</th>
              <th>Nombre Cliente</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.cedula}</td>
                <td>
                  {cliente.nombre} {cliente.apellido}
                </td>
                <td>
                  {cliente.identificacion === "04" ? "RUC" :
                  cliente.identificacion === "05" ? "Cédula" :
                  cliente.identificacion === "06" ? "Pasaporte" :
                  cliente.identificacion === "07" ? "Consumidor Final" :
                  cliente.identificacion === "08" ? "ID exterior" :
                   cliente.identificacion}
                </td>
                <td>{cliente.estado ? "Activo": "Desactivado"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
