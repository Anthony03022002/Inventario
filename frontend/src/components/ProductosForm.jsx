import { useState } from "react";
import { crearXml } from "../api/xml.api";
export function ProductosForm() {
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
      <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} accept=".xml" />
          <button type="submit">Subir XML</button>
      </form>
  );
}
