from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http.response import JsonResponse
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime

class UserView:
    @api_view(['POST'])
    def signUp(request):
        serializer = UserSerializer(data= request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    @api_view(['POST'])
    def login(request):
        email = request.data['email']
        password = request.data['password']
        print('hi',request)

        user  = Users.objects.filter(email = email).first()

        if user is None:
            raise AuthenticationFailed('User not found')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True,samesite='None' , secure=True)
        
        response.data = {
            'jwt': token
        }
        
        return response


    
    @api_view(['GET'])
    def getUser(request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = Users.objects.filter(email=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)

    @api_view(['POST'])
    def logout(request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response