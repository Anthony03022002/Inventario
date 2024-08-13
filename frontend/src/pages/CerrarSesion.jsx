import { useNavigate, Link } from "react-router-dom";

export  function CerrarSesion() {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/inicio");
      };

  return (
    <div>
      <button onClick={handleLogout}>Cerrar Sesion</button>
    </div>
  )
}
