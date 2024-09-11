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
    <div className="container mt-4">
      <div>
      <Link to="/ventas" className="btn btn-primary">
        Volver a Ventas
      </Link>
      </div>

      <div className="container row border p-3">
        <h1 className="text-center text-primary">Generar Ventas</h1>
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="cliente" className="form-label">
                Cliente:
              </label>
              <select
                id="cliente"
                className="form-select"
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

            <div className="mb-3">
              <label htmlFor="fechaCompra" className="form-label">
                Fecha de la compra:
              </label>
              <input
                type="date"
                id="fechaCompra"
                className="form-control"
                value={fechaCompra}
                onChange={(event) => setFechaCompra(event.target.value)}
                required
              />
            </div>

            <div className="mb-3 row">
              <div className="col-md-8">
                <label htmlFor="producto" className="form-label">
                  Producto:
                </label>
                <select
                  id="producto"
                  className="form-select"
                  value={productoSeleccionado}
                  onChange={(event) =>
                    setProductoSeleccionado(event.target.value)
                  }
                >
                  <option value="">Seleccione un producto</option>
                  {productos.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre} - ${producto.precio}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label htmlFor="cantidad" className="form-label">
                  Cantidad:
                </label>
                <input
                  type="number"
                  id="cantidad"
                  className="form-control"
                  value={cantidadSeleccionada}
                  onChange={(event) =>
                    setCantidadSeleccionada(event.target.value)
                  }
                  min="1"
                  required
                />
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={agregarCompra}
            >
              Agregar producto
            </button>
            <button
              type="submit"
              className="btn btn-success ms-3"
              onClick={handleSubmit}
            >
              Realizar compra
            </button>
          </form>
        </div>

        {/* Columna derecha: Tabla de productos seleccionados */}
        <div className="col-md-6">
          {compras.length > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {compras.map((compra, index) => (
                  <tr key={index}>
                    <td>
                      {productos.find(
                        (producto) =>
                          producto.id === parseInt(compra.productoId)
                      )?.nombre || "Producto no seleccionado"}
                    </td>
                    <td>{compra.cantidad}</td>
                    <td>${compra.precio}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => eliminarCompra(index)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
