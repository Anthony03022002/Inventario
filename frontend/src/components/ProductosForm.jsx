import { useState } from "react";
import { useForm } from "react-hook-form";
import { crearProducto } from "../api/productos.api";

export function ProductosForm() {
  const { register, handleSubmit, reset } = useForm();
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const onSubmit = handleSubmit((data) => {
    setProductos((prevProductos) => [...prevProductos, data]);
    reset();
  });

  const enviarProductos = async () => {
    try {
      for (const producto of productos) {
        await crearProducto(producto);
      }
      setMensaje("Productos guardados exitosamente");
      setProductos([]);
    } catch (error) {
      setMensaje("Error al guardar los productos");
      console.error("Error al guardar los productos:", error);
    }
  };

  const eliminarProducto = (index) => {
    setProductos((prevProductos) =>
      prevProductos.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Formulario de productos</h1>

      {/* Mensaje de éxito o error */}
      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      <form
        onSubmit={onSubmit}
        className="row g-3 border border-secondary-subtle pb-3 shadow p-3"
      >
        <div className="col-md-3">
          <label className="form-label">Código:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Código del producto"
            {...register("codigo", { required: true })}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre del producto"
            {...register("nombre", { required: true })}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Descripción:</label>
          <textarea
            className="form-control"
            placeholder="Descripción del producto"
            {...register("descripcion", { required: true })}
          />
        </div>
        <div className="col-md-1">
          <label className="form-label">$Precio:</label>
          <input
            type="number"
            className="form-control"
            placeholder="Precio"
            step="0.01"
            {...register("precio", { required: true })}
          />
        </div>
        <div className="col-md-1">
          <label className="form-label">Cantidad:</label>
          <input
            type="number"
            className="form-control"
            placeholder="Cantidad"
            {...register("cantidad_ingresar", { required: true })}
          />
        </div>
        <div className="col-md-1">
          <label className="form-label">Stock:</label>
          <input
            type="number"
            className="form-control"
            placeholder="Stock"
            {...register("stock", { required: true })}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Categoría:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Categoría del producto"
            {...register("categoria", { required: true })}
          />
        </div>
        <div className="col-md-2">
          <label className="form-label">Fecha de creación:</label>
          <input
            type="date"
            className="form-control"
            {...register("fecha_creacion", { required: true })}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Proveedor:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Proveedor del producto"
            {...register("proveedor", { required: true })}
          />
        </div>
        <div className="col-md-4 d-flex align-items-center">
          <div className="form-check form-switch me-3">
            <input
              type="checkbox"
              className="form-check-input"
              defaultChecked={true}
              {...register("estado")}
            />
            <label className="form-check-label ms-2">Estado</label>
          </div>
          <button type="submit" className="btn btn-primary">
            Agregar Producto
          </button>
        </div>
      </form>

      <div className="container mt-4">
        <h2 className="mb-4">Lista de Productos</h2>
        <table className="table table-striped table-hover">
          <thead className="table text-center">
            <tr>
              <th>Nombre</th>
              <th>Código</th>
              <th>Precio</th>
              <th>Cantidad Ingreso</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Fecha de Creación</th>
              <th>Proveedor</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index} className="text-center">
                <td>{producto.nombre}</td>
                <td>{producto.codigo}</td>
                <td>{producto.precio}</td>
                <td>{producto.cantidad_ingresar}</td>
                <td>{producto.stock}</td>
                <td>{producto.categoria}</td>
                <td>{producto.fecha_creacion}</td>
                <td>{producto.proveedor}</td>
                <td>{producto.estado ? "Activo" : "Inactivo"}</td>
                <td>
                  <button
                    onClick={() => eliminarProducto(index)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-success" onClick={enviarProductos}>
            Enviar Todos los Productos
          </button>
        </div>
      </div>
    </div>
  );
}
