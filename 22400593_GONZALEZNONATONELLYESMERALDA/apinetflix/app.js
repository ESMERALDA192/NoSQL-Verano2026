const formulario = document.getElementById("formulario");

const titulo = document.getElementById("titulo");
const genero = document.getElementById("genero");
const año = document.getElementById("año");
const duracion = document.getElementById("duracion");
const idioma = document.getElementById("idioma");
const calificacion = document.getElementById("calificacion");

const btnConsultar = document.getElementById("btnConsultar");
const btnOcultar = document.getElementById("btnOcultar");
const listaPeliculas = document.getElementById("listaPeliculas");

// Guardar película
formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const pelicula = {
        titulo: titulo.value,
        genero: genero.value,
        anio: Number(año.value),
        duracion: Number(duracion.value),
        idioma: idioma.value,
        calificacion: Number(calificacion.value)
    };

    try {

        const respuesta = await agregarPelicula(pelicula);

        alert(respuesta.mensaje);

        formulario.reset();

    } catch (error) {

        alert(error.message);

    }

});

// Consultar películas
btnConsultar.addEventListener("click", async () => {

    try {

        const peliculas = await obtenerPeliculas();

        listaPeliculas.innerHTML = "";

        peliculas.forEach((pelicula) => {

            const tarjeta = document.createElement("div");

            tarjeta.className = "tarjeta";

            tarjeta.innerHTML = `
                <h3>${pelicula.titulo}</h3>

                <p><strong>ID:</strong> ${pelicula._id}</p>
                <p><strong>Género:</strong> ${pelicula.genero}</p>
                <p><strong>Año:</strong> ${pelicula.año}</p>
                <p><strong>Duración:</strong> ${pelicula.duracion}</p>
                <p><strong>Idioma:</strong> ${pelicula.idioma}</p>
                <p><strong>Calificación:</strong> ${pelicula.calificacion}</p>

                <button onclick="editar('${pelicula._id}')">
                    Editar
                </button>

                <button onclick="eliminar('${pelicula._id}')">
                    Eliminar
                </button>
            `;

            listaPeliculas.appendChild(tarjeta);

        });

    } catch (error) {

        alert(error.message);

    }

});

// Ocultar películas
btnOcultar.addEventListener("click", () => {

    listaPeliculas.innerHTML = "";

});

// Editar
async function editar(id){

    const nuevoTitulo = prompt("Nuevo título:");

    if(nuevoTitulo == null) return;

    try{

        await editarPelicula(id,{
            titulo:nuevoTitulo
        });

        alert("Película actualizada");

        btnConsultar.click();

    }catch(error){

        alert(error.message);

    }

}

// Eliminar
async function eliminar(id){

    if(!confirm("¿Deseas eliminar la película?")) return;

    try{

        await eliminarPelicula(id);

        alert("Película eliminada");

        btnConsultar.click();

    }catch(error){

        alert(error.message);

    }

}