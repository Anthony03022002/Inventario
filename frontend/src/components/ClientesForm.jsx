import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { createClientes } from "../api/clientes.api";
import { perfilUsuario } from "../api/perfil";
import { useNavigate } from "react-router-dom";

export function ClientesForm() {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const identificacion = watch("identificacion");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await perfilUsuario();
        setProfile(profileData);
        setValue('user', profileData.id);
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
    await createClientes(data);
    navigate('/archivos');
  });
  return (
    <div className="container2">
    <form onSubmit={onSubmit} className="form-container">
        <div className="form-group">
            <label htmlFor="identificacion">Tipo de identificación</label>
            <select id="identificacion" {...register("identificacion")} className="form-control">
                <option value="04">RUC</option>
                <option value="05">Cédula</option>
                <option value="06">Pasaporte</option>
                <option value="07">Consumidor Final</option>
                <option value="08">ID Exterior</option>
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="cedula">#Identificación</label>
            <input type="text" id="cedula" {...register("cedula", { required: true })} className="form-control" />
        </div>
        <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" placeholder="Nombre" {...register("nombre", { required: true })} className="form-control" />
        </div>
        <div className="form-group">
            <label htmlFor="apellido">Apellido:</label>
            <input type="text" id="apellido" placeholder="Apellido" {...register("apellido", { required: true })} className="form-control" />
        </div>
        <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Email" {...register("email", { required: true })} className="form-control" />
        </div>
        <div className="form-group">
            <label htmlFor="celular">Celular:</label>
            <input type="number" id="celular" placeholder="Celular" {...register("celular", { required: true })} className="form-control" />
        </div>
        <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <input type="checkbox" id="estado" defaultChecked={true} {...register("estado")} className="form-check" />
        </div>
        <input type="hidden" {...register("user")} />
        <button type="submit" className="submit-btn">Guardar Cliente</button>
    </form>
</div>
  );
}
