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
      setValue("cedula", "9999999999");
      setValue("nombre", "consumidor");
      setValue("apellido", "final");
      setValue("email", "consumidor@gmail.com");
      setValue("celular", "999999999");
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

  useEffect(() => {
    async function leerClientes() {
      if (params.id) {
        const res = await obtenerCliente(params.id);
        setValue("identificacion", res.data.identificacion);
        setValue("cedula", res.data.cedula);
        setValue("nombre", res.data.nombre);
        setValue("apellido", res.data.apellido);
        setValue("email", res.data.email);
        setValue("celular", res.data.celular);
        setValue("estado", !!res.data.estado);
      }
    }
    leerClientes();
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Formulario clientes</h1>
        <label htmlFor="">Tipo de identificacion</label>
        <select {...register("identificacion", { required: true })}>
          <option value="04">RUC</option>
          <option value="05">Cedula</option>
          <option value="06">Pasaporte</option>
          <option value="07">Consumidor Final</option>
          <option value="08">ID Exterior</option>
        </select>
        <label htmlFor="">#Identificacion</label>
        <input type="text" {...register("cedula", { required: true })} />
        <label htmlFor="">Nombre:</label>
        <input
          type="text"
          placeholder="Nombre"
          {...register("nombre", { required: true })}
        />
        <label htmlFor="">Apellido:</label>
        <input
          type="text"
          placeholder="apellido"
          {...register("apellido", { required: true })}
        />
        <label htmlFor="">Email:</label>
        <input
          type="email"
          placeholder="email"
          {...register("email", { required: true })}
        />
        <label htmlFor="">Celular:</label>
        <input
          type="text"
          pattern="\d*"
          inputMode="numeric"
          placeholder="Celular"
          {...register("celular", { required: true })}
        />
        <label htmlFor="">Estado</label>
        <input
          type="checkbox"
          {...register("estado")}
          checked={watch("estado") || false}
          onChange={(e) => setValue("estado", e.target.checked)}
        />
        <input type="hidden" {...register("user")} />
        <button type="submit">Guardar Cliente</button>
      </form>
    </div>
  );
}