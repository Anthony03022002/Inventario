import { useEffect, useState } from "react";
import { obtenerVentas, updateVenta, eliminarVenta } from "../api/ventas.api";
import { obtenerProductos } from "../api/productos.api";
import { obtenerClientes } from "../api/clientes.api";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState({});
  const [productos, setProductos] = useState({});
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cantidadEditada, setCantidadEditada] = useState(0);

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

  const handleEliminarVenta = async () => {
    if (ventaSeleccionada) {
      try {
        await eliminarVenta(ventaSeleccionada.id);
        setVentas((prevVentas) =>
          prevVentas.filter((venta) => venta.id !== ventaSeleccionada.id)
        );
        setModalVisible(false);
      } catch (error) {
        console.error("Error al eliminar la venta:", error);
      }
    }
  };

  const handleEditarClick = (venta) => {
    setVentaSeleccionada(venta);
    setCantidadEditada(venta.cantidad);
    setModalVisible(true);
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
    setVentaSeleccionada(null);
  };

  const handleGuardarCambios = async () => {
    if (ventaSeleccionada) {
      try {
        const datosActualizados = {
          cliente: ventaSeleccionada.cliente,
          producto: ventaSeleccionada.producto,
          fecha: ventaSeleccionada.fecha,
          cantidad: parseInt(cantidadEditada, 10),
        };

        await updateVenta(ventaSeleccionada.id, datosActualizados);

        setVentas((prevVentas) =>
          prevVentas.map((venta) =>
            venta.id === ventaSeleccionada.id
              ? { ...venta, cantidad: datosActualizados.cantidad }
              : venta
          )
        );

        setModalVisible(false);
      } catch (error) {
        console.error("Error al actualizar la venta:", error);
      }
    }
  };

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
        <div className="container">
          <table className="table table-hover">
            <thead>
            <tr>
                <th>Clientes</th>
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
                  (acc, venta) => acc + parseInt(venta.cantidad, 10), 
                  0
                );
                const totalAPagar = cliente.ventas.reduce((acc, venta) => {
                  const precio = productos[venta.producto]?.precio || 0;
                  return acc + venta.cantidad * precio;
                }, 0);
                return (
                  <tr key={clienteId}>
                    <td className="">
                      {cliente?.nombre || "Cargando..."}{" "}
                      {cliente?.apellido || ""}
                    </td>
                    <td>
                      <ul className="">
                        {cliente.ventas.map((venta) => (
                          <li key={venta.id} className="list-group-item ">
                            {productos[venta.producto]?.nombre || "Cargando..."}
                            <Button
                              className="ms-2"
                              variant="primary"
                              onClick={() => handleEditarClick(venta)}
                            >
                              Editar
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="">
                      <ul className="">
                        {cliente.ventas.map((venta) => (
                          <li key={venta.id} className="list-group-item ">
                            {venta.cantidad}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="">
                      <ul className="">
                        {cliente.ventas.map((venta) => (
                          <li key={venta.id} className="list-group-item ">
                            ${productos[venta.producto]?.precio || ""}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="">{totalCantidad}</td>
                    <td className="">
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
      <Modal show={modalVisible} onHide={handleCerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ventaSeleccionada && (
            <Form>
              <Form.Group controlId="formCantidad">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  value={cantidadEditada}
                  onChange={(e) => setCantidadEditada(e.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarModal}>
            Cerrar
          </Button>
          <Button variant="danger" onClick={handleEliminarVenta}>
            Eliminar
          </Button>
          <Button variant="primary" onClick={handleGuardarCambios}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
