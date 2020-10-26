# Three in line Frontend

Aplicación web que permite jugar a 3 en línea apoyandose en el consumo del API Rest del backend.

## Requisitos

- NodeJS varsión 10+
- Angular cli versión 10+ (se puede instalar mediante el comando `npm i -g @angular/cli`)

## Ejecución en ambiente local

1. Instalar las dependencias de la aplicación con el comando `npm install`
2. Ejecutar la aplicación del backend cuya documentación se encuentra en su directorio `TIL_backend`
3. Ajustar la ruta de consumo del API en la variable `URL_API` del archivo `environment` de acuerdo
a la ejecución del servidor backend.
3. Ejecutar la aplicación con el comando `npm start` o `ng serve -o`

## Compilación

Ejecute `ng build` para construir la aplicación final. El artefacto generado se almacena en el directorio `dist/`. Utilice la opción `--prod` para compilar la versión de producción.
