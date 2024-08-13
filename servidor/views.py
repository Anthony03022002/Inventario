from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.views import APIView
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse
from django.utils.encoding import force_str

@api_view(['POST'])
def login(request):
    
    user = get_object_or_404(User, username = request.data['username'])
    
    if not user.check_password(request.data['password']):
        return Response({"error": "Contrasena invalida"}, status=status.HTTP_400_BAD_REQUEST)
    
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    
    return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        
        user = User.objects.get(username=serializer.data['username'])
        user.set_password(serializer.data['password'])
        user.save()
        
        token = Token.objects.create(user = user)
        return Response({'token': token.key, 'user': serializer.data}, status=status.HTTP_201_CREATED)
        
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    
    serializer = UserSerializer(instance=request.user)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_url = request.build_absolute_uri(reverse('password-reset-confirm', args=[uid, token]))
            send_mail(
                'Solicitud de restablecimiento de contraseña',
                f'Utilice el siguiente enlace para restablecer su contraseña: {reset_url}',
                'from@example.com',
                [email],
                fail_silently=False,
            )
        return Response({"message": "Se ah enviado un correo para restablecer su contraseña"}, status=status.HTTP_200_OK)
    
class PasswordResetConfirmView(APIView):
    def post(self, request, uidb64, token):
        uid = force_str(urlsafe_base64_decode(uidb64)) 
        user = User.objects.get(pk=uid)
        if user and default_token_generator.check_token(user, token):
            new_password = request.data.get('new_password')
            user.set_password(new_password)
            user.save()
            return Response({"message": "La contraseña ha sido restablecida."}, status=status.HTTP_200_OK)
        return Response({"error": "Vuelva a intentarlo"}, status=status.HTTP_400_BAD_REQUEST)