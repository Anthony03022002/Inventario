import { useState, useEffect } from "react";
import { crearVenta } from "../api/ventas.api";
import { obtenerProductos } from "../api/productos.api";
import { obtenerClientes } from "../api/clientes.api";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { generarFacturaPDF } from "../utils/Factura";

export function VentasForm() {
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [compras, setCompras] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const productosRes = await obtenerProductos();
        setProductos(productosRes.data);

        const clientesRes = await obtenerClientes();
        setClientes(clientesRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }
    cargarDatos();
  }, []);

  const agregarCompra = () => {
    if (!productoSeleccionado) {
      alert("Por favor, selecciona un producto.");
      return;
    }

    const productoYaAgregado = compras.find(
      (compra) => compra.productoId === productoSeleccionado
    );

    if (productoYaAgregado) {
      alert("Este producto ya ha sido agregado.");
      return;
    }

    const producto = productos.find(
      (producto) => producto.id === parseInt(productoSeleccionado)
    );

    const nuevoProducto = {
      productoId: productoSeleccionado,
      cantidad: cantidadSeleccionada,
      precio: Number(producto?.precio) || 0,
    };

    setCompras([...compras, nuevoProducto]);
    setProductoSeleccionado("");
    setCantidadSeleccionada(1);
  };

  const eliminarCompra = (index) => {
    const nuevasCompras = compras.filter((_, i) => i !== index);
    setCompras(nuevasCompras);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!clienteSeleccionado) {
        alert("Por favor, selecciona un cliente.");
        return;
    }
    const promesas = compras.map((compra) => {
        const data = {
            cliente: clienteSeleccionado,
            producto: compra.productoId,
            cantidad: compra.cantidad,
            fecha: fechaCompra,
        };
        console.log("Datos enviados:", data);
        return crearVenta(data);
    });

    Promise.all(promesas)
        .then((responses) => {
            alert("Compra realizada con éxito");
            const clienteNombre = clientes.find(
                (c) => c.id === parseInt(clienteSeleccionado)
            ).nombre;
            generarFacturaPDF(clienteNombre, compras, productos);
            setCompras([]);
            setClienteSeleccionado("");
        })
        .catch((error) => {
            console.error("Error al enviar la compra:", error);
        });
};


  return (
    <form onSubmit={handleSubmit}>
      <Link to="/ventas">Ventas</Link>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="cliente">Cliente:</label>
        <select
          id="cliente"
          value={clienteSeleccionado}
          onChange={(event) => setClienteSeleccionado(event.target.value)}
          required
        >
          <option value="">Seleccione un cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nombre} {cliente.apellido}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="fechaCompra">Fecha de la compra:</label>
        <input
          type="date"
          id="fechaCompra"
          value={fechaCompra}
          onChange={(event) => setFechaCompra(event.target.value)}
          required
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="producto">Producto:</label>
        <select
          id="producto"
          value={productoSeleccionado}
          onChange={(event) => setProductoSeleccionado(event.target.value)}
        >
          <option value="">Seleccione un producto</option>
          {productos.map((producto) => (
            <option key={producto.id} value={producto.id}>
              {producto.nombre} - ${producto.precio}
            </option>
          ))}
        </select>

        <label htmlFor="cantidad" style={{ marginLeft: "1rem" }}>
          Cantidad:
        </label>
        <input
          type="number"
          id="cantidad"
          value={cantidadSeleccionada}
          onChange={(event) => setCantidadSeleccionada(event.target.value)}
          min="1"
          required
          style={{ marginLeft: "0.5rem" }}
        />

        <button
          type="button"
          onClick={agregarCompra}
          style={{ marginLeft: "1rem" }}
        >
          Guardar
        </button>
      </div>

      {compras.length > 0 && (
        <table
          style={{
            marginTop: "1rem",
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Producto
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Cantidad
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Precio
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {productos.find(
                    (producto) => producto.id === parseInt(compra.productoId)
                  )?.nombre || "Producto no seleccionado"}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {compra.cantidad}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  ${compra.precio}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  <button type="button" onClick={() => eliminarCompra(index)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button type="submit" style={{ marginTop: "1rem" }}>
        Realizar compra
      </button>
    </form>
  );
}
