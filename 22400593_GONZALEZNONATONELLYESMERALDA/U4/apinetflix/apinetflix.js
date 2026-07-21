const express = require("express");
const app = express();
const morgan = require("morgan"); 
const mongoose = require("mongoose"); 

const PORT = 3001; 

app.use(express.json());
app.use(morgan("dev"));

const mongoURI = "mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix";

mongoose.connect(mongoURI)
.then(() => console.log("Conectado a MongoDB Atlas - Módulo de Netflix"))
.catch((error) => console.error(" Error al conectar con MongoDB: ", error));

//  MODELO DE PELÍCULAS
const peliculaSchema = new mongoose.Schema(
    {
        titulo: { type: String, required: true, trim: true },
        director: { type: String, required: true, trim: true },
        anio: { type: Number, required: true },
        genero: { type: String, required: true, trim: true },
        tipo: { type: String, enum: ['pelicula', 'serie'], required: true }
    },
    { timestamps: true, versionKey: false }
);
const Pelicula = mongoose.model("Pelicula", peliculaSchema, "peliculas");

// ==========================================
// 🍿 CRUD: NETFLIX
// ==========================================
app.get("/peliculas", async (req, res) => {
    try {
        const catalogo = await Pelicula.find();
        res.json(catalogo);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el catálogo", error: error.message });
    }
});

app.get("/peliculas/:id", async (req, res) => {
    try {
        const item = await Pelicula.findById(req.params.id);
        if (!item) return res.status(404).json({ mensaje: "Contenido no encontrado" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el contenido", error: error.message });
    }
});

app.post("/peliculas", async (req, res) => {
    try {
        const { titulo, director, anio, genero, tipo } = req.body;
        if (!titulo || !director || !anio || !genero || !tipo) return res.status(400).json({ mensaje: "Faltan datos" }); 
        const nuevaPelicula = await Pelicula.create({ titulo, director, anio, genero, tipo });
        res.status(201).json({ mensaje: "Contenido registrado correctamente", contenido: nuevaPelicula });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al registrar el contenido", error: error.message });
    }
});

app.put("/peliculas/:id", async (req, res) => {
    try {
        const { titulo, director, anio, genero, tipo } = req.body;
        if (!titulo || !director || !anio || !genero || !tipo) return res.status(400).json({ mensaje: "Faltan datos" });
        const peliculaActualizada = await Pelicula.findByIdAndUpdate(req.params.id, { titulo, director, anio, genero, tipo }, { new: true });
        if (!peliculaActualizada) return res.status(404).json({ mensaje: "Contenido no encontrado" });
        res.json({ mensaje: "Contenido actualizado correctamente", contenido: peliculaActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el contenido", error: error.message });
    }
});

app.delete("/peliculas/:id", async (req, res) => {
    try {
        const peliculaEliminada = await Pelicula.findByIdAndDelete(req.params.id);
        if (!peliculaEliminada) return res.status(404).json({ mensaje: "Contenido no encontrado" });
        res.json({ mensaje: "Contenido eliminado correctamente", contenido: peliculaEliminada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el contenido", error: error.message });
    }
});

app.get("/", (req, res) => { res.send("Hola Mundo desde Netflix"); });

app.listen(PORT, () => console.log("Servidor Netflix en http://localhost:" + PORT));