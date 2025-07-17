# Development
Pasos para levantar la App en desarrollo

1. Levantar la Base de Datos
```
docker compose up -d
```

2. Renombrar el .env.template  a .env y 
3. Reemplazar las variables de entorno
4.Ejecutar el SEDD para [crear la base de Datos Local](http://localhost:3000/api/seed)

# Prisma Commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```