import React, { useState } from 'react';
import { crearExcel } from '../api/excel.api';

export function ProductosExcel() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Por favor, selecciona un archivo.');
      return;
    }

    try {
      const response = await crearExcel(file); // Subir el archivo usando la API
      setMessage('Archivo subido correctamente: ' + response.message); // Muestra mensaje de éxito
    } catch (error) {
      setMessage('Error al subir el archivo.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Subir archivo Excel de Productos</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          accept=".xls,.xlsx" 
          onChange={handleFileChange} 
        />
        <button type="submit">Subir</button>
      </form>
      {message && <p>{message}</p>} 
    </div>
  );
}
