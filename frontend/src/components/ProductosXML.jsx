import { useState } from "react";
import { crearXml } from "../api/xml.api";
export function ProductosXML() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
      setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      if (file) {
          try {
              const response = await crearXml(file);
              console.log('Response:', response);
              alert('Archivo subido correctamente');
          } catch (error) {
              console.error('Error:', error);
              alert('No se pudo cargar el archivo');
          }
      } else {
          alert('Por favor seleccione un archivo primero');
      }
  };

  return (
    <div className="container4">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form">
          <h1>Subir XML</h1>
          <input
            className="form-control form-control-lg"
            type="file"
            id="formFileLg"
            onChange={handleFileChange}
            accept=".xml"
          />
          <div className="button-container">
            <button type="submit" className="btn-submit">Subir XML</button>
          </div>
        </form>
      </div>
    </div>
  );
};