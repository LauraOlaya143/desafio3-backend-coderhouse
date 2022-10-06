const express = require('express');
const fs = require('fs');

const app = express()

const PORT = 8080;

const direccion = "productos2.txt"

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const leerArchivo = async (archivo) => {
    const contenido = await fs.promises.readFile(archivo,"utf-8")
    const result = JSON.parse(contenido);
    return result
}

const getAll = async () => {
    const contenido = await leerArchivo(direccion)
    return contenido
}

const tamañoArray = async () => {
    const contenido = await getAll()
    const tamaño = contenido.length
    return tamaño
}

const dollRandom = async () => {
    const productos = await getAll();
    const arrayTamaño = await tamañoArray();
    const number = random(0, arrayTamaño)
    const dollSelect = productos[number]

    return dollSelect
}

app.get("/", async (req, res) => {
    const productos = await getAll()
    res.send(productos)
})

app.get("/productoRandom", async (req, res) => {
    const doll = await dollRandom()
    res.send(doll)
})


const server = app.listen(PORT, () => {
    console.log(`server http escuchando en el puerto ${server.address().port}`)
})

server.on("error", (err) => {
    console.log(`Ocurrio un error: ${err}`)
})
