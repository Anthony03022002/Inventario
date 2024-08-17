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

  return (
      <div>
        <Link to='/crear-ventas'>Generar Venta</Link>
        <h1>Ventas</h1>
          {ventas.map((venta) => (
              <div key={venta.id}>
                  <p>ID: {venta.id}</p>
                  <p>Cliente: {clientes[venta.cliente]?.nombre || "Cargando..."} {clientes[venta.cliente]?.apellido || ""}</p>
                  <p>Producto: {productos[venta.producto]?.nombre || "Cargando..."} - ${productos[venta.producto]?.precio || ""}</p>
                  <p>Cantidad: {venta.cantidad}</p>
                  <hr />
              </div>
          ))}
      </div>
  );
}
