import jsPDF from "jspdf";
import "jspdf-autotable";

export const generarFacturaPDF = (clienteNombre, compras, productos) => {
    const doc = new jsPDF();

    // Configurar la información de la empresa
    const empresaInfo = {
        nombre: "NOMBRE DE LA EMPRESA",
        direccion: "Dirección de la Empresa",
        telefono: "Teléfono: (000) 123-4567",
        correo: "Correo: info@empresa.com"
    };

    const pageWidth = doc.internal.pageSize.getWidth();
    const startX = 20;
    const startY = 30;  // Ajusta la posición Y de los cuadros
    const lineHeight = 5;  // Ajusta el espacio entre las líneas
    const cornerRadius = 5;  // Radio de las esquinas redondeadas

    // Agregar el nombre de la empresa centrado y en negrita arriba de todo
    doc.setFontSize(18);
    doc.setFont("Helvetica", "bold");
    doc.text(empresaInfo.nombre, pageWidth / 2, 15, { align: 'center' });

    // Dibujar un rectángulo con esquinas redondeadas alrededor de la información de la empresa
    const boxWidth = 90;
    const boxHeight = 25;
    doc.roundedRect(startX - 5, startY - 8, boxWidth, boxHeight, cornerRadius, cornerRadius);

    // Agregar el resto de la información de la empresa
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(empresaInfo.direccion, startX, startY);  // Ajusta la posición Y
    doc.text(empresaInfo.telefono, startX, startY + lineHeight);
    doc.text(empresaInfo.correo, startX, startY + lineHeight * 2);

    // Información de la factura envuelta en un cuadro con esquinas redondeadas
    const fechaActual = new Date().toLocaleDateString();
    const numeroFactura = Math.floor(Math.random() * 1000000);

    const facturaX = 120;
    const facturaY = 30;
    const facturaBoxWidth = 90;
    const facturaBoxHeight = 40;

    doc.roundedRect(facturaX - 5, facturaY - 10, facturaBoxWidth, facturaBoxHeight, cornerRadius, cornerRadius);
    doc.setFont("Helvetica", "normal");
    doc.text(`Factura No: ${numeroFactura}`, facturaX, facturaY);
    doc.text(`Fecha: ${fechaActual}`, facturaX, facturaY + 6);
    doc.text("Clave de Acceso:", facturaX, facturaY + 12);
    doc.text("012345678901234567890123456789012345678901234567890123456789", facturaX, facturaY + 18, { maxWidth: 75 });

    // Datos del cliente envueltos en un cuadro con esquinas redondeadas
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.text("Datos del Cliente", startX, 69);
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(`Nombre: ${clienteNombre}`, startX, 74);

    const clienteBoxWidth = 80;
    const clienteBoxHeight = 20;
    doc.roundedRect(startX - 5, 60, clienteBoxWidth, clienteBoxHeight, cornerRadius, cornerRadius);

    // Tabla de compras
    const head = [['Producto', 'Cantidad', 'Precio Unitario', 'Total']];
    const body = compras.map(compra => {
        const producto = productos.find(producto => producto.id === parseInt(compra.productoId));
        const productoNombre = producto?.nombre || "Producto desconocido";
        const precioUnitario = parseFloat(producto?.precio) || 0;
        const totalProducto = precioUnitario * compra.cantidad;
        return [productoNombre, compra.cantidad, `$${precioUnitario.toFixed(2)}`, `$${totalProducto.toFixed(2)}`];
    });

    doc.autoTable({
        head: head,
        body: body,
        startY: 90,
        theme: 'striped',
        styles: { cellPadding: 2, fontSize: 10, halign: 'center' },
        headStyles: { fillColor: [100, 100, 255] },
        margin: { top: 20 }
    });

    // Cálculo de totales
    const totalCompra = body.reduce((sum, row) => sum + parseFloat(row[3].replace('$', '')), 0);
    const iva = totalCompra * 0.12;
    const totalConIva = totalCompra + iva;

    doc.setFontSize(12);
    doc.text(`Subtotal: $${totalCompra.toFixed(2)}`, 150, doc.lastAutoTable.finalY + 10);
    doc.text(`IVA 12%: $${iva.toFixed(2)}`, 150, doc.lastAutoTable.finalY + 16);
    doc.text(`Total: $${totalConIva.toFixed(2)}`, 150, doc.lastAutoTable.finalY + 22);

    // Guardar PDF
    doc.save(`factura_${clienteNombre}_${numeroFactura}.pdf`);
};



// const xml = generarXML(clienteNombre, compras, productos);
// descargarXML(xml, clienteNombre, numeroFactura);

const generarXML = (clienteNombre, compras, productos) => {

    const numeroFactura = Math.floor(Math.random() * 1000000);


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

