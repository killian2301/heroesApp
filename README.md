# HeroW2m

Este proyecto fue realizado por Killian Jiménez Lecroc y generado con [Angular CLI](https://github.com/angular/angular-cli) versión 17.2.2. Utiliza Angular como framework para el desarrollo de una aplicación SPA (Single Page Application) que permite gestionar un mantenimiento de superhéroes.

## Requisitos

Para ejecutar este proyecto necesitas tener instalado Node.js y npm. Asegúrate de tener la última versión LTS de Angular CLI instalada globalmente en tu sistema.

## Instalación

Primero, clona el repositorio y navega al directorio del proyecto. Luego, instala las dependencias necesarias con npm:

```bash
npm install
```

## Uso de JSON Server como backend

Este proyecto utiliza [JSON Server](https://github.com/typicode/json-server) para simular una API REST. Para iniciar el servidor, ejecuta el siguiente comando en tu terminal:

```bash
npm run backend
```

La base de datos de pruebas ha sido descargada de internet ([SuperHeroApi](https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json)).

## Servidor de desarrollo

Ejecuta `ng start` para iniciar un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Ejecución de pruebas unitarias

Este proyecto utiliza Jest para las pruebas unitarias. Ejecuta `npm run test` para ejecutar las pruebas unitarias.

Para observar cambios en los archivos de prueba y re-ejecutar las pruebas automáticamente, usa `npm run test:watch`.

Para generar y ver un informe de cobertura de código, ejecuta `npm run test:coverage`.
