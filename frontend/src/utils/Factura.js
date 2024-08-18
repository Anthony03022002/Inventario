import jsPDF from "jspdf";
import "jspdf-autotable";

export const generarFacturaPDF = (clienteNombre, compras, productos) => {
    const doc = new jsPDF();
  
    // Encabezado del PDF
    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
    doc.text("Nombre de la Empresa", 20, 20);
    doc.setFontSize(10);
    doc.text("Dirección de la Empresa", 20, 26);
    doc.text("Teléfono: (000) 123-4567", 20, 32);
    doc.text("Correo: info@empresa.com", 20, 38);
    doc.text("Website: www.empresa.com", 20, 44);
  
    // Logo de la empresa (si hay uno)
    // doc.addImage('path_to_logo', 'PNG', 170, 10, 30, 30); // Asegúrate de que la ruta y formato sean correctos
  
    const fechaActual = new Date().toLocaleDateString();
    const numeroFactura = Math.floor(Math.random() * 1000000);  
    doc.text(`Factura No: ${numeroFactura}`, 120, 20);
    doc.text(`Fecha: ${fechaActual}`, 120, 26);
    doc.text("Clave de Acceso:", 120, 32);
    doc.text("012345678901234567890123456789012345678901234567890123456789", 120, 38, { maxWidth: 80 });
  
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Datos del Cliente", 20, 60);
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(`Nombre: ${clienteNombre}`, 20, 66);
  
    // Encabezado de tabla
    const head = [['Producto', 'Cantidad', 'Precio Unitario', 'Total']];
  
    const body = compras.map(compra => {
      const producto = productos.find(producto => producto.id === parseInt(compra.productoId));
      const productoNombre = producto?.nombre || "Producto desconocido";
      const precioUnitario = parseFloat(producto?.precio) || 0;  
      const totalProducto = precioUnitario * compra.cantidad;
      return [productoNombre, compra.cantidad, `$${precioUnitario.toFixed(2)}`, `$${totalProducto.toFixed(2)}`];
    });
  
    // Generar la tabla
    doc.autoTable({
      head: head,
      body: body,
      startY: 90,
      theme: 'striped',
      styles: { cellPadding: 2, fontSize: 10, halign: 'center' },
      headStyles: { fillColor: [100, 100, 255] },
      margin: { top: 20 }
    });
  
    // Calcular el total de la compra
    const totalCompra = body.reduce((sum, row) => sum + parseFloat(row[3].replace('$', '')), 0);
    const iva = totalCompra * 0.12; // Calcular el IVA (12%)
    const totalConIva = totalCompra + iva;
  
    doc.setFontSize(12);
    doc.text(`Subtotal: $${totalCompra.toFixed(2)}`, 150, doc.lastAutoTable.finalY + 10);
    doc.text(`IVA 12%: $${iva.toFixed(2)}`, 150, doc.lastAutoTable.finalY + 16);
    doc.text(`Total: $${totalConIva.toFixed(2)}`, 150, doc.lastAutoTable.finalY + 22);
  
    // Información adicional
    doc.setFontSize(10);
    doc.text("Términos y condiciones:", 20, doc.lastAutoTable.finalY + 40);
    doc.text("1. Los productos no son retornables.", 20, doc.lastAutoTable.finalY + 46);
    doc.text("2. El pago debe realizarse en un plazo de 30 días.", 20, doc.lastAutoTable.finalY + 52);
    doc.text("3. Para cualquier consulta, por favor contacte con nosotros.", 20, doc.lastAutoTable.finalY + 58);
  
    // Guardar el PDF con un nombre basado en el cliente y número de factura
    doc.save(`factura_${clienteNombre}_${numeroFactura}.pdf`);
    const xml = generarXML(clienteNombre, compras, productos);
    descargarXML(xml, clienteNombre, numeroFactura);
};
const generarXML = (clienteNombre, compras, productos) => {
    // Generar el número de factura
    const numeroFactura = Math.floor(Math.random() * 1000000);

    // Construir el XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<Factura>\n`;
    xml += `  <Numero>${numeroFactura}</Numero>\n`;
    xml += `  <Fecha>${new Date().toLocaleDateString()}</Fecha>\n`;
    xml += `  <Cliente>\n`;
    xml += `    <Nombre>${clienteNombre}</Nombre>\n`;
    xml += `  </Cliente>\n`;
    xml += `  <Productos>\n`;

    compras.forEach(compra => {
        const producto = productos.find(producto => producto.id === parseInt(compra.productoId));
        const productoNombre = producto?.nombre || "Producto desconocido";
        const precioUnitario = parseFloat(producto?.precio) || 0;
        const totalProducto = precioUnitario * compra.cantidad;
        xml += `    <Producto>\n`;
        xml += `      <Nombre>${productoNombre}</Nombre>\n`;
        xml += `      <Cantidad>${compra.cantidad}</Cantidad>\n`;
        xml += `      <PrecioUnitario>${precioUnitario.toFixed(2)}</PrecioUnitario>\n`;
        xml += `      <Total>${totalProducto.toFixed(2)}</Total>\n`;
        xml += `    </Producto>\n`;
    });

    // Calcular totales
    const totalCompra = compras.reduce((sum, compra) => {
        const producto = productos.find(producto => producto.id === parseInt(compra.productoId));
        const precioUnitario = parseFloat(producto?.precio) || 0;
        return sum + (precioUnitario * compra.cantidad);
    }, 0);
    const iva = totalCompra * 0.12;
    const totalConIva = totalCompra + iva;

    xml += `  </Productos>\n`;
    xml += `  <Totales>\n`;
    xml += `    <Subtotal>${totalCompra.toFixed(2)}</Subtotal>\n`;
    xml += `    <IVA>${iva.toFixed(2)}</IVA>\n`;
    xml += `    <Total>${totalConIva.toFixed(2)}</Total>\n`;
    xml += `  </Totales>\n`;
    xml += `</Factura>\n`;

    return xml;
};
const descargarXML = (xml, clienteNombre, numeroFactura) => {
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `factura_${clienteNombre}_${numeroFactura}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

