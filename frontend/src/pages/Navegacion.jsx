import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { perfilUsuario } from "../api/perfil";
export function Navegacion() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/inicio");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await perfilUsuario();
        setProfile(profileData);
      } catch (err) {
        setError("Error al obtener el perfil. Asegúrate de estar autenticado.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Cargando...</div>;
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-secondary navbar-dark">
        <div className="container-fluid">
          <button
            className="btn btn-outline-light"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            Menú
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle"></i> Bienvenido{" "}
                  {profile.username}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item"
                      href="#"
                    >
                      Cerrar Sesion
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{ width: "270px" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Nombre de la empresa
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-unstyled">
            <li className="nav-item">
              <Link className="nav-link navegacion" to="/archivos">
              <i className="bi bi-people-fill p-1"></i>
                Clientes
              </Link>
            </li>
          </ul>
          <hr />
          <ul className="list-unstyled">
            <li className="nav-item">
              <Link className="nav-link navegacion" to="/productos">
              <i className="bi bi-cart-fill p-1"></i>
                Productos
              </Link>
            </li>
          </ul>
          <hr />
          <ul className="list-unstyled">
            <li className="nav-item">
              <Link className="nav-link navegacion" to="/ventas">
              <i className="bi bi-handbag-fill p-1"></i>
                Ventas
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
