import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CerrarSesion } from "../pages/CerrarSesion";
import { obtenerCompras } from "../api/ventas.api";
import { obtenerClientes } from "../api/clientes.api";
import { obtenerProductos } from "../api/productos.api";

export function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarDatos() {
      try {
        const resVentas = await obtenerCompras();
        const resClientes = await obtenerClientes();
        const resProductos = await obtenerProductos();
        setVentas(resVentas.data);
        setClientes(resClientes.data);
        setProductos(resProductos.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    }
    cargarDatos();
  }, []);

  const obtenerClienteNombre = (id) => {
    const cliente = clientes.find(c => c.id === id);
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Desconocido';
  };

  const obtenerProductoDetalles = (id) => {
    const producto = productos.find(p => p.id === id);
    return producto ? `${producto.nombre} - $${producto.precio}` : 'Desconocido';
  };

  return (
    <div>
      <button onClick={() => navigate('/crear-ventas')}>
        Crear Venta
      </button>
      <CerrarSesion />
      <h1>Ventas</h1>
      <div>
        {ventas.length > 0 ? (
          ventas.map((venta) => (
            <div key={venta.id}>
              <p><strong>Venta:</strong> #{venta.id}</p>
              <p><strong>Nombre Cliente:</strong> {obtenerClienteNombre(venta.cliente)}</p>
              <p><strong>Detalles Producto:</strong> {obtenerProductoDetalles(venta.producto)}</p>
              <p><strong>Cantidad del Producto:</strong> {venta.cantidad}</p>
              <p><strong>Fecha:</strong> {venta.fecha}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No hay ventas disponibles.</p>
        )}
      </div>
    </div>
  );
}
