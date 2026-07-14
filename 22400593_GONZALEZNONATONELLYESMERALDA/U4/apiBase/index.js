const express =require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;
app.use(morgan("dev"));

app.get("/",(req,res) => {
    res.send("HOLA MUNDO");
});

app.get("/mensaje",(req,res) => {
    res.send("MENSAJE DESDE EXPRESS")
});

app.get("/mensaje",(req,res) => {
    res.send("MENSAJE DESDE EXPRESS 2")
});

app.get("/pagina",(req,res) => {
    const nombre=("HELLO ESMERALDA");
    res.send(` <style>
            .p1{
                color:red;
                background: pink;
            }
        </style>
       <h1>mi pagina web</h1>
    <p class="p1">creada con express</p>
<p>${nombre}</p>`)
});

app.get("/alumno",(req,res) => {
    res.json({
        nombre:"esme",
        carrera:"isc",
        semestre:"9"
    });
} );

app.get("/meterias",(req,res) =>{
    res.json([
        {
            nombre:"NOSQL",
            hora:"8:am-11:am"

        },
        {
            nombre:"PW",
            hora:"2:00pm - 5:00pm"
        }
    ]);
});


app.get("/mensaje/:nombre",(req,res) => {
   
    res.send(`hola ${req.params.nombre}`);
});


app.get("/suma/:a/:b",(req,res)=>{
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    res.send(`Resultado: ${a+b}`)
});

app.get("/multiplicar/:a/:b", (req, res) => {
    const a = Number(req.params.a);
    const b = Number(req.params.b);
    res.send(`Resultado: ${a*b}`)
});

app.get("/aleatorio",(req,res) =>{
    const numero= Math.floor(Math.random()*100)+1;
    res.send(`numero generado es: ${numero}`);
});

app.listen(port,() =>{
    console.log("Servidor iniciando en http://localhost:"+port);
})