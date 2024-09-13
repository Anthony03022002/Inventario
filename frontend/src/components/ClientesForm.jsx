import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  createClientes,
  updateClientes,
  obtenerCliente,
} from "../api/clientes.api";
import { perfilUsuario } from "../api/perfil";
import { useNavigate, useParams } from "react-router-dom";

export function ClientesForm() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const identificacion = watch("identificacion");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await perfilUsuario();
        setProfile(profileData);
        setValue("user", profileData.id);
      } catch (err) {
        setError("Error al obtener el perfil. Asegúrate de estar autenticado.");
      }
    };

    fetchProfile();
  }, [setValue]);

  useEffect(() => {
    if (identificacion === "07") {
      setValue('cedula', '9999999999'); 
      setValue('nombre', 'consumidor'); 
      setValue('apellido', 'final'); 
      setValue('email', 'consumidor@gmail.com'); 
      setValue('celular', '999999999'); 
    }
  }, [identificacion, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      updateClientes(params.id, data);
    } else {
      await createClientes(data);
    }
    navigate("/archivos");
  });

  return (
    <div className="container3">
    <form onSubmit={handleSubmit(onSubmit)} >
      <h1>Formulario clientes</h1>
      <div className="row mb-3">

        {/* Columna izquierda */}
        <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="identificacion">Tipo de identificación</label>
          <select {...register("identificacion", { required: true })} id="identificacion" className="form-dropdown">
            <option value="04">RUC</option>
            <option value="05">Cédula</option>
            <option value="06">Pasaporte</option>
            <option value="07">Consumidor Final</option>
            <option value="08">ID Exterior</option>
          </select>
          </div>
        <div className="col-md-6">          <label htmlFor="cedula">#Identificación</label>
          <input type="text" {...register("cedula", { required: true })} id="cedula" className="form-control" />
</div>
<div className="col-md-6">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" placeholder="Nombre" {...register("nombre", { required: true })} id="nombre" className="form-control" />
</div>

<div className="col-md-6">
          <label htmlFor="apellido">Apellido</label>
          <input type="text" placeholder="Apellido" {...register("apellido", { required: true })} id="apellido" className="form-control" />
</div>
<div className="col-md-6">
          <label htmlFor="celular">Celular</label>
          <input type="varchar" placeholder="Celular" {...register("celular", { required: true })} id="celular" className="form-control" />
        </div>
</div>

        {/* Columna derecha */}

        <div className="row mb-3">
          
<div className="col-md-6">
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" {...register("email", { required: true })} id="email" className="form-control" />
      </div>
        </div>
      </div>
      <div className="form-check form-switch">
      <label htmlFor="estado">Estado</label>
      <input className="form-check-input" type="checkbox" role="switch"defaultChecked="true" {...register("estado", { required: true })} id="flexSwitchCheckDefault" />
      </div>
      <input type="hidden" {...register("user")} />
      <div className="col-md-6">
      <button type="submit" className="btn btn-dark">Guardar Cliente</button>
      </div>
    </form>
  </div>
  );
}
