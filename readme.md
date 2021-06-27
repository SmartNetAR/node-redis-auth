crear archivo .env (ver .env.example)

crear base de datos auth_db o la mensionada en .env
ejecutar el script db.sql con su editor o en la [terminal de mysql](https://dev.mysql.com/doc/refman/8.0/en/mysql-batch-commands.html)

levantar servicio de redis
``` bash
redis-server
```

instalar dependencias
``` bash
npm i
```

correr
``` bash
npm start
```

modo desarrollo
``` bash
npm run watch
```

scripts test

Instalar nyc globalmente
``` bash
sudo npm i nyc --g
```


Correr el test con nyc con reporte de cobertura
``` bash
nyc npm test
```

Visualizar reportes almacenados en .nyc_ouput
``` bash
nyc report
```

Generar reporte de cobertura html
``` bash
nyc report --reporter=html
```
  
### [Heroku deployment](https://redis-auth.herokuapp.com/)
Solo clon heroku deployar con git 



Run with docker
``` bash
docker-compose up --build -d
```