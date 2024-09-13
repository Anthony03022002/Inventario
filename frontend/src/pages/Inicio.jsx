import { Link } from "react-router-dom";
export function Inicio() {
  return (
    <div className="inicio-container">
      <header className="header">
        <h1>Pagina de Inicio</h1>
      </header>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" className="nav-link">Inicio</Link></li>
          <li className="nav-item"><Link to="/proyectos" className="nav-link">Proyectos</Link></li>
          <li className="nav-item"><Link to="/contacto" className="nav-link">Contacto</Link></li>
          <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
        </ul>
      </nav>
      <p className="intro-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        veritatis recusandae delectus fugiat omnis excepturi sint soluta facilis
        dolores, optio eaque labore! Sint optio facilis voluptate eos, velit
        aspernatur error beatae, architecto quos culpa tempore non sit eaque
        dicta hic laboriosam, voluptates a deserunt sed quia ut maxime aperiam.
        Obcaecati eligendi nam rerum quos expedita quo, facilis commodi dolores
        similique nisi nobis exercitationem quisquam neque harum illum ab
        voluptates culpa ad corrupti, labore doloribus optio itaque cum quasi?
        Reprehenderit neque incidunt corporis obcaecati reiciendis, atque
        voluptates laborum adipisci accusamus maiores? Eius repellat sequi
        asperiores eligendi obcaecati eaque dolorem tempore harum.
      </p>
      <img
        src="https://concepto.de/wp-content/uploads/2015/04/inventario-e1548898364548.jpg"
        alt="Inventario"
        className="main-image"
      />
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d3354.9750800803877!2d-78.53982964110389!3d-0.30916587778324606!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sec!4v1723221839020!5m2!1ses!2sec"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="map-iframe"
        ></iframe>
      </div>
    </div>
  );
}
