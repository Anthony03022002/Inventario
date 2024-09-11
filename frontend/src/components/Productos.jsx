import { useEffect, useState } from "react";
import { obtenerProductos } from "../api/productos.api";
import { Link } from "react-router-dom";

export function Productos() {
  const [productos, setProductos] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function cargarProductos() {
      const res = await obtenerProductos();
      setProductos(res.data);
    }
    cargarProductos();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(productos.map((producto) => producto.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectProduct = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };
  const handleDelete = () => {
    if (selected.length === 0) {
      alert("No hay productos seleccionados para eliminar.");
      return;
    }

    selected.forEach((id) => {
      alert(`Producto eliminado con ID: ${id}`);
    });
  };
  return (
    <div className="container">
      <h1 className="text-center">Productos</h1>
      <Link to="/crear-xml" className="btn btn-primary mb-3">
        Subir XML
      </Link>
      <button className="btn btn-danger mb-3" onClick={handleDelete}>
        Eliminar Seleccionados
      </button>
      <Link to='/crear-productos' className="btn btn-primary mb-3">Crear Producto</Link>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleSelectAll}
                  checked={selected.length === productos.length}
                />
              </div>
            </th>
            <th>ID</th>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>
                <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selected.includes(producto.id)}
                  onChange={() => handleSelectProduct(producto.id)}
                />
                </div>
              </td>
              <td>{producto.id}</td>
              <td>{producto.codigo}</td>
              <td>{producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>{producto.stock}</td>
              <td>{producto.estado ? "Activo" : "Desactivado"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
