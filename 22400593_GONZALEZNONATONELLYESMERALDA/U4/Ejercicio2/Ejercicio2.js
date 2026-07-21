const express = require("express");
const morgan =  require("morgan");
const app= express();
const port=3000;

app.use(morgan("dev")); 

//Ejercicio 1: Numero par o impar
//Ruta: /par/:numero
//Respuesta: Numero es un numero par/impar.

app.get("/par/:numero",(req,res) => {
    const numero = Number(req.params.numero);
    if(numero % 2 === 0  ){
        res.send(`${numero} es un numero par.`);

    }else{
        res.send(`${numero} es un numero impar.`);
    }
});


//Ejercicio 2:Mayor de edad.
// Ruta: /edad/:edad
//Respuesta: Eres menor/ mayor de edad

app.get("/edad/:edad",(req,res) =>{
    const edad =Number(req.params.edad);
    if(edad <18){
        res.send("Eres menor de edad.");

    }else{
        res.send("Eres mayor de edad");
    }
})


// Ejercicio 3: Calculadora
//Ruta: /calculadora/:operacion/:a/:b
// respuesta: Resultado:N
app.get("/calculadora/:operacion/:a/:b", (req, res) => {
    const operacion = req.params.operacion;
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    let resultado;

    if (operacion === "suma") {
        resultado = a + b;
    } else if (operacion === "resta") {
        resultado = a - b;
    } else if (operacion === "multiplicacion") {
        resultado = a * b;
    } else if (operacion === "division") {
        resultado = a / b;
    } else {
        return res.send("Operación no válida.");
    }

    res.send(`Resultado: ${resultado}`);
});

//Ejercicio 4: Tabla de multiplicar.
//Ruta:/tabla/:numero
//respuesta 
// N * 1 = R
// N * 2 = R
//N * 3 = R
//hasta N * 10 = R
// Ejercicio 4. Tabla de multiplicar
// Ruta: /tabla/:numero
app.get("/tabla/:numero", (req, res) => {
    const numero = Number(req.params.numero);
    let tabla = "";

    for (let i = 1; i <= 10; i++) {
        tabla += `${numero} x ${i} = ${numero * i} <br>`;
    }

    res.send(tabla);
});

//Ejercicio 5:calificacion
//Ruta:/calificacion/:nota
//Respuesta
//:nota < 70 => reprobado
//:nota >=70  => aprobado
//:nota >=80  => muy bien
//:nota >=90  => Excelente
app.get("/calificacion/:nota", (req, res) => {
    const nota = Number(req.params.nota);
    let resultado;

    if (nota < 70) {
        resultado = "Reprobado";
    } else if (nota >= 90) {
        resultado = "Excelente";
    } else if (nota >= 80) {
        resultado = "Muy bien";
    } else if (nota >= 70) {
        resultado = "Aprobado";
    }

    res.send(resultado);
});

app.listen(port,() =>{
    console.log("Servidor iniciando en http://localhost:"+port);
})