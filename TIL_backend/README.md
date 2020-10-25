# Aplicación backend del juego Tres en línea

Esta aplicación contiene los endpoints necesarios para administrar la funcionalidades del juego tres en línea a través de una API Rest.

## Ejecución en ambiente local
- **Requisitos:**
    - NodeJS versión 10+
    - Base de datos MongoDB (ya sea instalada en la máquina local o virtualizada con docker)
        - Si se desea instalar mediante docker se puede utilizar el siquiente comando `docker run -d -p 27017:27018 --name mongodb mongo`
    
- **Pasos**:
1. Crear un archivo llamado `.env` en la carpeta principal de la aplicación backend (TIL_backend) con la siguiente información acorde a su instalación de la base de datos:
    ```
    APP_ENVIRONMENT=local
    APP_PORT=8080
    MONGO_HOST=localhost
    MONGO_PORT=27017
    MONGO_DATABASE=three-in-line
    MONGO_USER=user
    MONGO_PASSWORD=password
    ```
2. Instalar las dependencias de la aplicación ejecutando el comando `npm install`
3. Ejecutar la aplicación con el comando `npm run start-dev`

## Opciones adiciones
Es posible ejecutar la versión compilada de la aplicación ejecutando primero el comando `npm run build` y luego el comando `npm start`.

Por otro lado, para su ejecución en un ambiente de producción, tras haber compilado el código con el comando `npm run build` y copiar el contenido del 
directorio `dist` al directorio raíz de la aplicación se puede ejecutar mediante el compando `npm run start-prod` 
