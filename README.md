# Development
Pasos para levantar la App en desarrollo

1. Levantar la Base de Datos
```
docker compose up -d
```

2. Crear una copia y renombralo el .env.template  a .env y 
3. Reemplazar las variables de entorno
4. Ejecutar comando ``` npm instal ```
5. Ejecutar comando ``` npm run dev ```
6. Ejecutar comando ``` npx prisma migrate dev  ```
7. Ejecutar comando ``` npx prisma generate```
8. Ejecutar el SEDD para [crear la base de Datos Local](http://localhost:3000/api/seed)

# Nota:
usuario: test1@google.com
password: 123456

# Prisma Commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```