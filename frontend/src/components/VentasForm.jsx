import { useState, useEffect } from 'react';
import { crearVenta } from '../api/ventas.api';
import { obtenerClientes } from "../api/clientes.api";
import { obtenerProductos } from "../api/productos.api";
import { perfilUsuario } from "../api/perfil";

export function VentasForm() {
  const [venta, setVenta] = useState({
    cliente: '',
    producto: '',
    cantidad: 1,
    fecha: '',
    usuario: '', 
  });

  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      const response = await obtenerClientes();
      setClientes(response.data);
    };
    const fetchProductos = async () => {
      const response = await obtenerProductos();
      setProductos(response.data);
    };
    const fetchUsuario = async () => {
      try {
        const usuarioData = await perfilUsuario();
        setVenta((prevVenta) => ({
          ...prevVenta,
          usuario: usuarioData.id, 
        }));
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };
    fetchClientes();
    fetchProductos();
    fetchUsuario();
  }, []);

  const handleChange = (e) => {
    setVenta({
      ...venta,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos de la venta:', venta); // Verificar los datos antes de enviar
    try {
      const response = await crearVenta(venta);
      console.log('Venta creada:', response.data);
    } catch (error) {
      console.error('Error creando la venta:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cliente</label>
        <select name="cliente" value={venta.cliente} onChange={handleChange}>
          <option value="">Seleccione un cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre} {cliente.apellido}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Producto</label>
        <select name="producto" value={venta.producto} onChange={handleChange}>
          <option value="">Seleccione un producto</option>
          {productos.map((producto) => (
            <option key={producto.id} value={producto.id}>
              {producto.nombre} - ${producto.precio}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Cantidad</label>
        <input
          type="number"
          name="cantidad"
          value={venta.cantidad}
          onChange={handleChange}
          min="1"
        />
      </div>

      <div>
        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          value={venta.fecha}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Crear Venta</button>
    </form>
  );
}
