crear archivo .env (ver .env.example)

crear base de datos auth_db o la mensionada en .env
ejecutar el script db.sql con su editor o en la [terminal de mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql-batch-commands.html)

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
$ nyc npm test

Visualizar reportes almacenados en .nyc_ouput
$ nyc report

Generar reporte de cobertura html
$ nyc report --reporter=html
  
### [Heroku deployment](https://redis-auth.herokuapp.com/)
Solo clon heroku deployar con git 



Run with docker
docker-compose up --build -d