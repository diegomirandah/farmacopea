## Plataforma en Línea Farmacopea Chilena

Sistema desarrollado para organizar y entregar un acceso controlado a Farmacopea Chilena para los profesionales que requieran acceder al contenido de este libro de manera virtual a través de la compra correspondiente a una licencia o membresía.

##### Requisitos

Debe tener instalado y configurado las siguientes dependencias en la versión indicada o superior:

- Docker 19.03
- docker-compose v1.17

Para comprobar que las dependencias se encuentren correctamente funcionando, puede consultar la versión de estas mediante los comandos
`docker --version` y `docker-compose --version`

##### Configuración opcional

Para poder recuperar la contraseña, es necesario configurar un servidor de correos mediante SMTP. Para esto es necesario configurar los siguientes parámetros desde el archivo `docker-compose.yml`:

```
- SMTP_HOST: dirección del host que enviará email.
- SMTP_PORT: puerto del servidor.
- SMTP_USER: usuario de la cuenta de correo.
- SMTP_PASS: contraseña de la cuenta de correo.
```

##### Ejecución

Para ejecutar la aplicación, esta se puede compilar y posteriormente levantar con el siguiente comando:

```
docker-compose up -d --build
```

Con esto se crearán las imágenes que Docker necesita para levantar la aplicación. Posteriormente ejecutará los contenedores asociados.

##### Verificación

Para comprobar que no existan problemas, puede consultar el servicio mediante `docker-compose logs nodejs`. 

En caso de que la salida sea como se indica a continuación, la aplicación estará funcionando correctamente.

```
farmacopea-chilena (v 1.0.0) funcionando en http://localhost:4556
Base de datos conectada
```

En caso de que se muestre la siguiente salida, deberá reiniciar el contenedor mediante el comando `docker-compose restart nodejs`.

```
farmacopea-chilena (v 1.0.0) funcionando en http://localhost:4556
Error de conexion con Base de Datos.
```

