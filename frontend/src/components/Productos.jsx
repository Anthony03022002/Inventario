import { useEffect, useState } from "react";
import { obtenerProductos } from "../api/productos.api";
import { CerrarSesion } from "../pages/CerrarSesion";
export function Productos() {
    const [productos, setProductos] = useState([]); 
    useEffect(() => {
        async function cargarProductos() {
          const res = await obtenerProductos();
          setProductos(res.data);
        }
        cargarProductos();
      }, []);
  return (
    <div>
      <CerrarSesion/>
        <h1>Productos</h1>
      {productos.map((producto)=>(
        <div key={producto.id}>
            <p><strong>Producto:</strong> #{producto.id}</p>
            <p><strong>Nombre:</strong> {producto.nombre}</p>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Stock:</strong> {producto.stock}</p>
            <hr />
        </div>
      ))}
    </div>
  )
}
