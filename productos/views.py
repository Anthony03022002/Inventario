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
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import pandas as pd

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
                    'cantidad_ingresar': product.find('cantidad_ingresar').text,
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

# NUEVA CLASE PARA PROCESAR ARCHIVOS EXCEL
class UploadExcelView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No existe ningún documento"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Lee el archivo Excel usando pandas
            df = pd.read_excel(file)

            products = []
            for _, row in df.iterrows():
                product_data = {
                    'nombre': row['nombre'],
                    'descripcion': row['descripcion'],
                    'precio': row['precio'],
                    'cantidad_ingresar': row['cantidad_ingresar'],
                    'stock': row['stock'],
                    'codigo': row['codigo'],
                    'categoria': row['categoria'],
                    'fecha_creacion': row['fecha_creacion'],
                    'proveedor': row['proveedor'],
                }
                serializer = productoSerializer(data=product_data)
                if serializer.is_valid():
                    products.append(serializer.save())
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response({"message": f"{len(products)} productos creados correctamente"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@csrf_exempt
@require_http_methods(["POST"])
def importar_productos(request):
    try:
        data = json.loads(request.body)
        productos = data.get("productos", [])
        for producto_data in productos:
            Producto.objects.update_or_create(
                id=producto_data.get("ID"),
                defaults={
                    "codigo": producto_data.get("Codigo"),
                    "nombre": producto_data.get("Nombre"),
                    "precio": producto_data.get("Precio"),
                    "stock": producto_data.get("Stock"),
                    "estado": producto_data.get("Estado") == "Activo",
                },
            )
        return JsonResponse({"message": "Productos importados con éxito."}, status=200)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Error en el formato de los datos."}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
