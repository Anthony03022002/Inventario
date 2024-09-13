import { useEffect, useState } from "react";
import { obtenerProductos, eliminarProductos } from "../api/productos.api";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

export function Productos() {
  const [productos, setProductos] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarProductos() {
      const res = await obtenerProductos();
      setProductos(res.data);
    }
    cargarProductos();
  }, []);

  const handleExportToExcel = () => {
    const data = productos.map((producto) => ({
      ID: producto.id,
      Codigo: producto.codigo,
      Nombre: producto.nombre,
      Precio: producto.precio,
      Stock: producto.stock,
      Estado: producto.estado ? "Activo" : "Desactivado",
    }));

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

    XLSX.writeFile(workbook, "productos.xlsx");
  };

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
  const handleDelete = async () => {
    if (selected.length === 0) {
      alert("No hay productos seleccionados para eliminar.");
      return;
    }

    const confirmDelete = window.confirm(
      `¿Estás seguro que quieres eliminar ${selected.length} productos?`
    );

    if (!confirmDelete) return;

    for (let id of selected) {
      try {
        await eliminarProductos(id);
        setProductos((prevProductos) =>
          prevProductos.filter((producto) => producto.id !== id)
        );
      } catch (error) {
        console.error(`Error eliminando el producto con ID: ${id}`, error);
      }
    }

    setSelected([]);
  };
  return (
    <div className="container">
      <h1 className="text-center">Productos</h1>
      <Link to="/crear-xml" className="btn btn-primary mb-3">
        Subir XML
      </Link>
      <Link to="/crear-excel" className="btn btn-success mb-3">Importar de excel</Link>
      <button className="btn btn-success mb-3" onClick={handleExportToExcel}>
        Exportar a Excel
      </button>

      <button className="btn btn-danger mb-3" onClick={handleDelete}>
        Eliminar Seleccionados
      </button>
      <Link to="/crear-productos" className="btn btn-primary mb-3">
        Crear Producto
      </Link>
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
            <th>Acciones</th>
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
              <td>
                <button
                  onClick={() => {
                    navigate(`/crear-productos/${producto.id}`);
                  }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
