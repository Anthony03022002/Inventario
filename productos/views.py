from rest_framework import viewsets
from .serializer import productoSerializer
from .models import Producto
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import xml.etree.ElementTree as ET

class productoView(viewsets.ModelViewSet):
    serializer_class = productoSerializer
    queryset = Producto.objects.all()
    
    authentication_classes = [TokenAuthentication]  
    permission_classes = [IsAuthenticated]
    
class UploadXMLView(APIView):
    authentication_classes = [TokenAuthentication]  
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
       
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No existe ningun documento"}, status=status.HTTP_400_BAD_REQUEST)

       
        try:
            tree = ET.parse(file)
            root = tree.getroot()

            products = []
            for product in root.findall('producto'):
                product_data = {
                    'nombre': product.find('nombre').text,
                    'descripcion': product.find('descripcion').text,
                    'precio': product.find('precio').text,
                    'stock': product.find('stock').text,
                    'codigo': product.find('codigo').text,
                    'categoria': product.find('categoria').text,
                    'fecha_creacion': product.find('fecha_creacion').text,
                    'proveedor': product.find('proveedor').text,
                }
                serializer = productoSerializer(data=product_data)
                if serializer.is_valid():
                    products.append(serializer.save())
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({"message": f"{len(products)} producto creado correctamente"}, status=status.HTTP_201_CREATED)
        
        except ET.ParseError:
            return Response({"error": "Invalido XML"}, status=status.HTTP_400_BAD_REQUEST)