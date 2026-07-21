const express =require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 3000;
app.use(morgan("dev"));

mongoose.connect("mongodb://127.0.0.1:27017/school")
.then(()=>{
    console.log("CONECTADO CORRECTAMENTE A MONGODB");

})
.catch((error)=>{
    console.error("ERROR AL CONECTAR CON MONGODB:",error);
});



const alumnoSchema = new mongoose.Schema(
    {
        nombre:{type: String,required: true,trim:true},
        carrera:{type: String,required: true,trim:true},
        semestre:{type: Number,required: true,min:1},
    },
    {
        timestamps: true
    }
);//schema

const  Alumno= mongoose.model("Alumno",alumnoSchema,"alumnos");

app.post("/alumnos",async(req,res)=>{
    try{
const{nombre,carrera,semestre}= req.body;
    if(!nombre || !carrera || !semestre){
        return res.status(400).json({
            mensaje: "falta datos del alumno"
        });

    }
 const nuevoAlumno = new Alumno({
    nombre,carrera,semestre
 });
 const alumnoGuardado= await nuevoAlumno.save();

    res.json({
        mensaje: "Alumno registrado correctamnete",
        alumno: alumnoGuardado
 

    });
    }catch(error){
        res.status(500).json({
            mensaje:" EEROR AL GUARDAR",
            error:error
        })

    }
});

app.put("/alumnos/:id", async (req,res)=>{
   try{
     const id = (req.params.id);
    const {nombre,carrera,semestre} = req.body;
     if(!nombre || !carrera || !semestre){
        return res.status(404).json({
            mensaje: "falta datos del alumno"
        });

    }
    const alumnoActualizado = await Alumno.findByIdAndUpdate(
     id,
     
        {nombre,carrera, semestre},
        {new: true,runValidators:true}
     

    );
    if(!alumnoActualizado){
        return res.status(404).json({
            mensaje: "Alumno no encontrado"
        });

    }
    res.json({
        mensaje: "Alumno actualizado correctamnete",
        alumno: alumnoActualizado
    })


   }catch(error){
    res.status(500).json({
        mensaje:"ERROR AL ACTUALIZAR ALUMNO",
        error:error
    })

   }
});
app.delete("/alumnos/:id", async (req,res)=>{
   try{
     const id = (req.params.id);
     const alumnoEliminado = await Alumno.findByIdAndDelete(
  id
     );
     
if(!alumnoEliminado){
    return res.status(404).json({
        mensaje:"Alumno no encontrado",

    });

}
    res.json({
        mensaje: "Alumno eliminado correctamnete",
        alumno: alumnoEliminado
    });
    
   }catch(error){
res.status(500).json({
    mensaje: "ERROR AL ELIMINAR ALUMNO",
    error:error

});

   }
    
});

app.get("/alumnos",async (req,res)=>{
   try{
    const alumnos= await Alumno.find();
    res.json(alumnos);
   }catch(error){
    res.status(500).json({
        mensaje: "Error al obtener los alumnos",
        error:error
    });
   }

});

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
        semestre:"9",
        id:1
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

app.get("/alumnos/:id", async (req,res)=>{
    try{
    const id = req.params.id;
    const alumno = await Alumno.findById(id);
    if(!alumno){
    return res.status(404).json({
        mensaje: "alumno no encontrado"
    });
    }
    res.json(alumno);
   }catch(error){    
    res.status(500).json({
        mensaje:"Error al ontener alumnos",
        error:error
    })

    }
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