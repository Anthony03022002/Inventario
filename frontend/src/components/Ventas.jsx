import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CerrarSesion } from "../pages/CerrarSesion";
import { obtenerCompras } from "../api/ventas.api";
export function Ventas() {

    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        async function cargarVentas() {
          const res = await obtenerCompras();
          setVentas(res.data);
        }
        cargarVentas();
      }, []);

  return (
    <div>
        <CerrarSesion/>
      <h1>Ventas</h1>
      <div>
        {ventas.map((ventas)=>(
            <div>
            <p><strong>Venta:</strong> #{ventas.id}</p>
            <p><strong>Nombre Cliente:</strong> {ventas.cliente.nombre} {ventas.cliente.apellido}</p>
            <p><strong>Producto:</strong> {ventas.producto.nombre}</p>
            <p><strong>Precio:</strong> {ventas.producto.precio}</p>
            <p><strong>Stock:</strong> {ventas.producto.stock}</p>
            <p><strong>Cantidad del Producto:</strong> {ventas.cantidad}</p>
            <hr />
            </div>
        ))}
      </div>
    </div>
  )
}
