
# Actividad 1 - Gestión de una Biblioteca con MongoDB.
**GONZALEZ NONATO NELLY ESMERALDA
**LABORATORIO DE BASE DE DATOS NOSQL
**VIERNES 03 DE JULIO 2026

## Consultas

1. Mostrar todos los libros publicados después del año 2022.
```js
db["libros"].find({ "año": { $gt: 2022 } })
```

2. Mostrar los usuarios cuya edad sea mayor o igual a 21 años.
```js
db["usuarios"].find({ "edad": { $gte: 21 } })
```

3. Mostrar los libros con menos de 350 páginas.
```js
db["libros"].find({ "paginas": { $lt: 350 } })
```

4. Mostrar los usuarios cuya edad sea menor o igual a 20 años.
```js
db["usuarios"].find({ "edad": { $lte: 20 } })
```

5. Mostrar los libros cuya categoría sea diferente de "Programación".
```js
db["libros"].find({ "categoria": { $ne: "Programación" } })
```

6. Mostrar los usuarios que estudien Ingeniería Informática y estén en sexto semestre o superior.
```js
db["usuarios"].find({ "carrera": "Ingeniería Informática", "semestre": { $gte: 6 } })
```

7. Mostrar los libros cuya categoría sea Programación o Bases de Datos.
```js
db["libros"].find({ "categoria": { $in: ["Programación", "Bases de Datos"] } })
```

8. Mostrar los préstamos que no han sido devueltos y cuya duración sea mayor a 8 días.
```js
db["prestamos"].find({ "devuelto": false, "diasPrestamo": { $gt: 8 } })
```

9. Mostrar los libros cuyo título empiece con la letra M.
```js
db["libros"].find({ "titulo": { $regex: "^M" } })
```

10. Mostrar los usuarios cuyo nombre empiece con la letra A.
```js
db["usuarios"].find({ "nombre": { $regex: "^A" } })
```

11. Mostrar los libros cuyo título contenga la palabra "Base".
```js
db["libros"].find({ "titulo": { $regex: "Base" } })
```

12. Mostrar únicamente el nombre y la carrera de todos los usuarios.
```js
db["usuarios"].find({}, { "nombre": 1, "carrera": 1, "_id": 0 })
```

13. Mostrar únicamente el título y el autor de todos los libros.
```js
db["libros"].find({}, { "titulo": 1, "autor": 1, "_id": 0 })
```

14. Mostrar únicamente el usuario y el libro de todos los préstamos.
```js
db["prestamos"].find({}, { "usuario": 1, "libro": 1, "_id": 0 })
```

15. Mostrar los libros ordenados por año de publicación, del más reciente al más antiguo.
```js
db["libros"].find().sort({ "año": -1 })
```

16. Mostrar los usuarios ordenados alfabéticamente por nombre.
```js
db["usuarios"].find().sort({ "nombre": 1 })
```

17. Mostrar los préstamos ordenados por la cantidad de días de préstamo, del mayor al menor.
```js
db["prestamos"].find().sort({ "diasPrestamo": -1 })
```

18. Mostrar únicamente el título y el año de los libros publicados a partir de 2022, ordenados del más reciente al más antiguo.
```js
db["libros"].find({ "año": { $gte: 2022 } }, { "titulo": 1, "año": 1, "_id": 0 }).sort({ "año": -1 })
```

19. Mostrar el nombre y la carrera de los usuarios cuya carrera sea Ingeniería en Sistemas Computacionales o Ingeniería Informática.
```js
db["usuarios"].find({ "carrera": { $in: ["Ingeniería en Sistemas Computacionales", "Ingeniería Informática"] } }, { "nombre": 1, "carrera": 1, "_id": 0 })
```

20. Mostrar los préstamos no devueltos, ordenados por la cantidad de días de préstamo de mayor a menor, mostrando únicamente el usuario, el libro y los días de préstamo.
```js
db["prestamos"].find({ "devuelto": false }, { "usuario": 1, "libro": 1, "diasPrestamo": 1, "_id": 0 }).sort({ "diasPrestamo": -1 })
```
