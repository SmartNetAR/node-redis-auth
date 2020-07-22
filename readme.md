crear archivo .env (ver .env.example)

crear base de datos auth_db o la mensionada en .env

levantar servicio de redis
$ redis-server

instalar dependencias
$ npm i

correr
$ npm start

modo desarrollo
$ npm run watch

scripts test

Instalar nyc globalmente
$ sudo npm i nyc --g


Correr el test con nyc con reporte de cobertura
  nyc npm test

Visualizar reportes almacenados en .nyc_ouput
  nyc report

Generar reporte de cobertura html
  nyc report --reporter=html
  
### [Heroku deployment](https://redis-auth.herokuapp.com/)
