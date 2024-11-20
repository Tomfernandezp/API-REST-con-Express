import { randomUUID } from 'node:crypto'
import { readJSON } from '../../web/utils.js'

const movies = readJSON('../movies.json')

//al hacerlo async, garantizo que todos tengan el mismo contrado, es decir, que todos tengan que devolver una promesa
//independientemente de si la implementación es sincrona. Esto ayuda a que, el día de mañana, sea compatible con todas las soluciones

export class MovieModel {
    //le paso un objeto en los parámetros, ya que es mejor por si el día de mañana se agregan más cosas (más parametros), en ese caso se lo paso todo a un objeto
    static async getAll ({ genre }){
        if (genre){
            return movies.filter(
                (movie) => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
        }
        return movies
    }

    static async getById ({ id }){
        const movie = movies.find(movie => movie.id === id)
        if (movie) return movie
    }

    static async create({ input }) {
        const newMovie = {
            id: randomUUID(),
           ...input // el operador ... me permite utilizar toda la información que viene cargado en result
        }
    
        //Esto no es REST, porque estamos guardando el estado de la aplicación en memoria
        movies.push(newMovie)
    
        return newMovie
    }

    static async delete({ id }){
        const movieIndex = movies.findIndex( (movie) => movie.id === id)
        if (movieIndex === -1) return false

        movies.splice(movieIndex, 1)
        return true
    }

    static async update({ id, input}){
        const movieIndex = movies.findIndex((peliBuscada) => peliBuscada.id === id)
        if (movieIndex === -1) return false
        
        movie[movieIndex] = {
            ...movies[movieIndex],
            ...input
        }
        
        movies[movieIndex] = updateMovie // guardamos la pelicula modificada
    }

}

