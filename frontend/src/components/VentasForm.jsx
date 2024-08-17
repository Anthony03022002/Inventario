import { useState, useEffect } from "react";
import { crearVenta } from "../api/ventas.api";
import { obtenerProductos } from "../api/productos.api";
import { obtenerClientes } from "../api/clientes.api";
import { Link } from "react-router-dom";

export function VentasForm() {
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [compras, setCompras] = useState([{ productoId: "", cantidad: 1 }]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const token = localStorage.getItem('token');  


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

  const handleCompraChange = (index, event) => {
    const { name, value } = event.target;
    const nuevasCompras = [...compras];
    nuevasCompras[index][name] = value;
    setCompras(nuevasCompras);
  };

  const agregarCompra = () => {
    setCompras([...compras, { productoId: "", cantidad: 1 }]);
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

    compras.forEach((compra) => {
        const data = {
            cliente: clienteSeleccionado,
            producto: compra.productoId,
            cantidad: compra.cantidad,
            fecha: fechaCompra,
        };
        console.log("Datos enviados:", data);
        crearVenta(data)
            .then((response) => {
                alert("Compra realizada con éxito");
                setCompras([{ productoId: "", cantidad: 1 }]);
                setClienteSeleccionado("");
            })
            .catch((error) => {
                console.error("Error al enviar la compra:", error);
            });
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

      {compras.map((compra, index) => (
        <div key={index} style={{ marginBottom: "1rem" }}>
          <select
            name="productoId"
            value={compra.productoId}
            onChange={(event) => handleCompraChange(index, event)}
            required
          >
            <option value="">Seleccione un producto</option>
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="cantidad"
            value={compra.cantidad}
            onChange={(event) => handleCompraChange(index, event)}
            min="1"
            required
            style={{ marginLeft: "1rem" }}
          />
          <button
            type="button"
            onClick={() => eliminarCompra(index)}
            style={{ marginLeft: "1rem" }}
          >
            Eliminar
          </button>
        </div>
      ))}

      <button type="button" onClick={agregarCompra}>
        Añadir otro producto
      </button>
      <button type="submit" style={{ marginLeft: "1rem" }}>
        Realizar compra
      </button>
    </form>
  );
}
