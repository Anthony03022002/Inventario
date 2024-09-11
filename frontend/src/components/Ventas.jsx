import { useEffect, useState } from "react";
import { obtenerVentas } from "../api/ventas.api";
import { obtenerProductos } from "../api/productos.api";
import { obtenerClientes } from "../api/clientes.api";
import { Link } from "react-router-dom";

export function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState({});
  const [productos, setProductos] = useState({});

  useEffect(() => {
    async function cargarDatos() {
      try {
        const ventasRes = await obtenerVentas();
        setVentas(ventasRes.data);

        const clientesRes = await obtenerClientes();
        const clientesMap = clientesRes.data.reduce((acc, cliente) => {
          acc[cliente.id] = cliente;
          return acc;
        }, {});
        setClientes(clientesMap);

        const productosRes = await obtenerProductos();
        const productosMap = productosRes.data.reduce((acc, producto) => {
          acc[producto.id] = producto;
          return acc;
        }, {});
        setProductos(productosMap);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }

    cargarDatos();
  }, []);

  const ventasPorCliente = ventas.reduce((acc, venta) => {
    const clienteId = venta.cliente;
    if (!acc[clienteId]) {
      acc[clienteId] = { ...clientes[clienteId], ventas: [] };
    }
    acc[clienteId].ventas.push(venta);
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <h1 className="text-primary">Listado de Ventas</h1>
      <div className="col-3 mt-2 ms-3">
        <Link to="/crear-ventas" className="btn btn-success">
          Generar Nueva Venta
        </Link>
      </div>
      {ventas.length > 0 ? (
        <div className="table">
          <table className="table table-striped table-bordered table-hover">
            <thead className="thead-dark text-center">
              <tr>
                <th>Cliente</th>
                <th>Productos</th>
                <th>Unidades</th>
                <th>Precio</th>
                <th>Total Cantidad</th>
                <th>Total a Pagar</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(ventasPorCliente).map((clienteId) => {
                const cliente = ventasPorCliente[clienteId];
                const totalCantidad = cliente.ventas.reduce(
                  (acc, venta) => acc + venta.cantidad,
                  0
                );
                const totalAPagar = cliente.ventas.reduce((acc, venta) => {
                  const precio = productos[venta.producto]?.precio || 0;
                  return acc + venta.cantidad * precio;
                }, 0);
                return (
                  <tr key={clienteId}>
                    <td className="text-center">
                      {cliente?.nombre || "Cargando..."}{" "}
                      {cliente?.apellido || ""}
                    </td>
                    <td>
                      <ul className="">
                        {cliente.ventas.map((venta) => (
                          <li key={venta.id} className="list-group-item ">
                            {productos[venta.producto]?.nombre || "Cargando..."}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="text-center">
                      <ul className="">
                        {cliente.ventas.map((venta) => (
                          <li key={venta.id} className="list-group-item ">
                            {venta.cantidad}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="text-center">
                      <ul className="">
                        {cliente.ventas.map((venta) => (
                          <li key={venta.id} className="list-group-item ">
                            ${productos[venta.producto]?.precio || ""}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="text-center">{totalCantidad}</td>
                    <td className="text-center">
                      <span className="font-weight-bold text-success">
                        ${totalAPagar.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No hay ventas disponibles.</p>
      )}
    </div>
  );
}
