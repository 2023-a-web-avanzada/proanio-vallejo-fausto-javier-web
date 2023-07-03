import inquirer from 'inquirer';
import fs from "fs";
import * as constants from "constants";


async function main() {
    let opcion;
    opcion = await menu();
    switch (opcion.menu) {
        case 'Listar Productoras':
            let lista;
            lista = await listar();
            lista.forEach(element => {
                element.peliculas = JSON.stringify(element.peliculas);
            })
            console.log(lista);
            break;
        case 'Registrar Productora':
            crear(await solicitarDatosProductora());
            break;
        case 'Actualizar Productora':
            try {
                const respuesta = await inquirer
                    .prompt([
                        {
                            type: 'number',
                            name: 'id',
                            message: 'Ingresa el id de la productora: '
                        },
                        {
                            type: 'input',
                            name: 'nombre',
                            message: 'Ingresa el nombre de la productora: '
                        },
                        {
                            type: 'number',
                            name: 'año',
                            message: 'Ingresa el año de fundación de la productora: '
                        },
                        {
                            type: 'input',
                            name: 'localizacion',
                            message: 'Ingresa la localización de la productora: '
                        },
                        {
                            type: 'confirm',
                            name: 'reconocimientos',
                            message: '¿La productora posee premios o reconocimientos?'
                        },
                        {
                            type: 'input',
                            name: 'genero',
                            message: 'Ingrese el género en el que se especializa la productora: '
                        }
                    ]);
                actualizar(respuesta);
            } catch (e) {
                console.error(e);
            }
            break;
        case 'Eliminar Productora':
            try {
                const respuesta = await inquirer
                    .prompt([
                        {
                            type: 'number',
                            name: 'id',
                            message: 'Ingresa el id de la productora'
                        }
                    ]);
                eliminar(respuesta);
            } catch (e) {
                console.error(e);
            }
            break;
        case 'Registrar Película':
            try {
                let data;
                data = await listar();
                const respuesta = await inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'menu',
                            message: 'Seleccione una categoría: ',
                            choices: data.map(a => a.id + " " + a.nombre),
                        }
                    ]);
                console.log(respuesta.menu.slice(0, 1));
                crearPelicula(await solicitarDatosPelicula(), respuesta.menu.slice(0, 1));
            } catch (e) {
                console.error(e)
            }
            break;
        case 'Actualizar Película':
            try {
                let data;
                data = await listar();
                const respuesta = await inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'menu',
                            message: 'Seleccione una categoría: ',
                            choices: data.map(a => a.id + " " + a.nombre),
                        }
                    ]);
                const datos = await inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'nombre',
                            message: 'Ingresa el nombre de la película: '
                        },
                        {
                            type: 'number',
                            name: 'presupuesto',
                            message: 'Ingresa el presupuesto de la película: '
                        },
                        {
                            type: 'input',
                            name: 'genero',
                            message: 'Ingresa el género al que pertenece la película: '
                        },
                        {
                            type: 'input',
                            name: 'director',
                            message: 'Ingrese el nombre del director de la película: '
                        },
                        {
                            type: 'number',
                            name: 'año',
                            message: 'Ingrese el año de estreno: '
                        },
                        {
                            type: 'number',
                            name: 'id',
                            message: 'Ingrese el id de la pelicula: '
                        }
                    ]);
                actualizarPelicula(datos, respuesta.menu.slice(0, 1));
            } catch (e) {
                console.error(e)
            }
            break;
        case 'Eliminar Película':
            try {
                let data;
                data = await listar();
                const respuesta = await inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'menu',
                            message: 'Seleccione una categoría: ',
                            choices: data.map(a => a.id + " " + a.nombre),
                        }
                    ]);
                const datos = await inquirer
                    .prompt([
                        {
                            type: 'number',
                            name: 'id',
                            message: 'Ingrese el id de la película: '
                        }
                    ]);
                eliminarPelicula(datos, respuesta.menu.slice(0, 1));
            } catch (e) {
                console.error(e)
            }
            break;
    }
    main();
}

async function menu() {
    try {
        const respuesta = await inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'menu',
                    message: 'Seleccione una categoría: ',
                    choices: ['Listar Productoras', 'Registrar Productora', 'Actualizar Productora', 'Eliminar Productora','Registrar Película', 'Actualizar Película', 'Eliminar Película']
                }
            ]);
        return respuesta;
    } catch (e) {
        console.error(e)
    }
}

async function solicitarDatosProductora() {
    try {
        const respuesta = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'nombre',
                    message: 'Ingresa el nombre de la productora: '
                },
                {
                    type: 'number',
                    name: 'año',
                    message: 'Ingresa el año de fundación de la productora: '
                },
                {
                    type: 'input',
                    name: 'localizacion',
                    message: 'Ingresa la localización de la productora: '
                },
                {
                    type: 'confirm',
                    name: 'reconocimientos',
                    message: '¿La productora posee premios o reconocimientos?'
                },
                {
                    type: 'input',
                    name: 'genero',
                    message: 'Ingrese el género en el que se especializa la productora: '
                },

            ]);
        return respuesta;
    } catch (e) {
        console.error(e);
    }
}

async function solicitarDatosPelicula() {
    try {
        const respuesta = await inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'nombre',
                    message: 'Ingresa el nombre de la película: '
                },
                {
                    type: 'number',
                    name: 'presupuesto',
                    message: 'Ingresa el presupuesto de la película: '
                },
                {
                    type: 'input',
                    name: 'genero',
                    message: 'Ingresa el género al que pertenece la película: '
                },
                {
                    type: 'input',
                    name: 'director',
                    message: 'Ingrese el nombre del director de la película: '
                },
                {
                    type: 'number',
                    name: 'año',
                    message: 'Ingrese el año de estreno: '
                }
            ]);
        return respuesta;
    } catch (e) {
        console.error(e);
    }
}


function escribirArchivo(contenido) {
    const escribirArchivoPromesa = new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'deber1.txt',
                contenido,
                (error) => {
                    if (error) {
                        console.log('Error en la escritura del archivo');
                    } else {
                        console.log('Escritura realizada correctamente');
                        resolve();
                    }
                }
            );
        }
    )
    return escribirArchivoPromesa;
}

function listar() {
    const leerArchivoPromesa = new Promise(
        (resolve, reject) => {
            fs.readFile('deber1.txt', 'utf-8',
                (error, contenido) => {
                    if (error) {
                        console.log('Error en la lectura del archivo');
                    } else {
                        if (contenido) {
                            resolve(JSON.parse(contenido));
                        } else {
                            resolve([]);
                        }

                    }
                }
            );
        }
    )
    return leerArchivoPromesa;
}

function crear(nuevoContenido) {
    listar().then((contenido) => {
        if (contenido.at(-1)) {
            nuevoContenido['id'] = contenido.at(-1)['id'] + 1;
        } else {
            nuevoContenido['id'] = 1;
        }
        nuevoContenido['peliculas'] = [];
        contenido.push(nuevoContenido);
        return escribirArchivo(JSON.stringify(contenido));
    })
}

function actualizar(contenido) {
    listar().then((contenidoactual) => {
        contenidoactual.forEach((element) => {
            if (element['id'] === contenido['id']) {
                element['nombre'] = contenido['nombre'];
                element['año'] = contenido['año'];
                element['localizacion'] = contenido['localizacion'];
                element['reconocimientos'] = contenido['reconocimientos'];
                element['genero'] = element['genero'];
            }
        })
        return escribirArchivo(JSON.stringify(contenidoactual));
    })
}

function eliminar(contenido) {
    listar().then((contenidoactual) => {
        contenidoactual.forEach((element) => {
            if (element['id'] === contenido['id']) {
                contenidoactual.splice(contenidoactual.indexOf(element), 1);
            }
        })
        return escribirArchivo(JSON.stringify(contenidoactual));
    })
}


function crearPelicula(nuevoContenido, id) {
    listar().then((contenido) => {
        let elementos;
        elementos = contenido.find((pelicula) => pelicula.id == id).peliculas;
        if (elementos.at(-1)) {
            nuevoContenido['id'] = elementos.at(-1)['id'] + 1;
        } else {
            nuevoContenido['id'] = 1;
        }
        elementos.push(nuevoContenido);
        contenido.find((juego) => juego.id == id).peliculas = elementos;
        return escribirArchivo(JSON.stringify(contenido));
    })
}

function actualizarPelicula(contenido, id) {
    listar().then((contenidoactual) => {
        let elementos;
        elementos = contenidoactual.find((pelicula) => pelicula.id == id).peliculas;
        elementos.forEach((element) => {
            if (element['id'] === contenido['id']) {
                element['nombre'] = contenido['nombre'];
                element['presupuesto'] = contenido['presupuesto'];
                element['genero'] = contenido['genero'];
                element['plataforma'] = contenido['plataforma'];
                element['online'] = contenido['online'];
            }

        })
        contenidoactual.find((pelicula) => pelicula.id == id).peliculas = elementos
        return escribirArchivo(JSON.stringify(contenidoactual));
    })
}

function eliminarPelicula(contenido, id) {
    listar().then((contenidoactual) => {
        let elementos;
        elementos = contenidoactual.find((pelicula) => pelicula.id == id).peliculas;
        elementos.forEach((element) => {
            if (element['id'] === contenido['id']) {
                elementos.splice(elementos.indexOf(element), 1);
            }
        })
        contenidoactual.find((pelicula) => pelicula.id == id).peliculas = elementos
        return escribirArchivo(JSON.stringify(contenidoactual));
    })
}

main();