const express = require("express");
const app = express();
const morgan = require("morgan"); 
const mongoose = require("mongoose"); 
const cors = require("cors");

const PORT = process.env.PORT || 3001; 

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// 🔌 CONEXIÓN A MONGO ATLAS
const mongoURI = "mongodb+srv://grupo:grupo@servidorprueba.ygegryf.mongodb.net/netflix";

mongoose.connect(mongoURI)
.then(() => console.log("🍿 Conectado a MongoDB Atlas - Módulo de Netflix"))
.catch((error) => console.error("❌ Error al conectar con MongoDB: ", error));

// ==========================================
// 🎬 ESQUEMA FLEXIBLE (Para evitar el error 500 / Timeout)
// ==========================================
// Usamos { strict: false } porque las películas y series no tienen los mismos campos 
// (unas tienen duración, otras temporadas, etc.)
const contenidoSchema = new mongoose.Schema(
    {
        titulo: { type: String, required: true, trim: true },
        genero: { type: String, trim: true },
        anio: { type: Number }
    },
    { timestamps: false, versionKey: false, strict: false }
);

// Mapeo exacto a las dos colecciones separadas que tienes en Compass
const Pelicula = mongoose.model("Pelicula", contenidoSchema, "peliculas");
const Serie = mongoose.model("Serie", contenidoSchema, "series");


// ==========================================
// 🍿 CRUD 1: PELÍCULAS (Colección 'peliculas')
// ==========================================
app.get("/peliculas", async (req, res) => {
    try {
        const catalogo = await Pelicula.find();
        res.json(catalogo);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las películas", error: error.message });
    }
});

app.get("/peliculas/:id", async (req, res) => {
    try {
        const item = await Pelicula.findById(req.params.id);
        if (!item) return res.status(404).json({ mensaje: "Película no encontrada" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la película", error: error.message });
    }
});

app.post("/peliculas", async (req, res) => {
    try {
        // Guardamos todo lo que envíes en el body sin restricciones estrictas
        const nuevaPelicula = await Pelicula.create(req.body);
        res.status(201).json({ mensaje: "Película registrada correctamente", contenido: nuevaPelicula });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al registrar la película", error: error.message });
    }
});

app.put("/peliculas/:id", async (req, res) => {
    try {
        const peliculaActualizada = await Pelicula.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!peliculaActualizada) return res.status(404).json({ mensaje: "Película no encontrada" });
        res.json({ mensaje: "Película actualizada correctamente", contenido: peliculaActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar la película", error: error.message });
    }
});

app.delete("/peliculas/:id", async (req, res) => {
    try {
        const peliculaEliminada = await Pelicula.findByIdAndDelete(req.params.id);
        if (!peliculaEliminada) return res.status(404).json({ mensaje: "Película no encontrada" });
        res.json({ mensaje: "Película eliminada correctamente", contenido: peliculaEliminada });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar la película", error: error.message });
    }
});


// ==========================================
// 📺 CRUD 2: SERIES (Colección 'series')
// ==========================================
app.get("/series", async (req, res) => {
    try {
        const catalogo = await Serie.find();
        res.json(catalogo);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener las series", error: error.message });
    }
});

app.get("/series/:id", async (req, res) => {
    try {
        const item = await Serie.findById(req.params.id);
        if (!item) return res.status(404).json({ mensaje: "Serie no encontrada" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener la serie", error: error.message });
    }
});

app.post("/series", async (req, res) => {
    try {
        const nuevaSerie = await Serie.create(req.body);
        res.status(201).json({ mensaje: "Serie registrada correctamente", contenido: nuevaSerie });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al registrar la serie", error: error.message });
    }
});


// ==========================================
// ⚙️ RUTA RAÍZ Y EXPORTACIÓN PARA VERCEL
// ==========================================
app.get("/", (req, res) => { 
    res.send("Hola Mundo desde Netflix (API Corregida)"); 
});

// Esto le permite a Vercel controlar el ciclo de vida de Express de manera Serverless
module.exports = app;

// Solo corre el listen si no estamos en el entorno de Vercel
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log("Servidor Netflix en http://localhost:" + PORT));
}