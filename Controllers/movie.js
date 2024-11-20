// import { MovieModel  } from "../Models/local-file-system/movie.js"
import { MovieModel } from "../Models/mysql/movies.js" // con este cambio y comentando lo de arriba ya estoy diciendo que puedo usar mysql, mongodb, etc

export class MovieController {
    static async getAll(req, res){
        const { genre } = req.query // la función query ya me devuelve los parametros
        const movies = await MovieModel.getAll({ genre }) //me devuelve las movies, pero no conozco su lógica (esta en otra parte)
        //el MovieController decide que es lo que renderiza, en este caso un json, pero podría ser un html por ejemplo
        res.json(movies)
    }

    static async getById(req, res){
        const { id } = req.params
        const movie = await MovieModel.getById({ id })
        if (movie) return res.json(movie)
        res.status(404).json({message: 'Movie not found'})
    }

    static async create(req, res){
        const result = validateMovie(req.body) // en el body de la req vienen los datos a validar
    
        if (result.error){
            return res.status(404).json({ error: JSON.parse( result.error.message ) })
        }
        
        const newMovie = await MovieModel.create({ input: result.data })
    
        res.status(201).json(newMovie)
    }

    static async delete(req, res){
        const { id } = req.params
        
        const result = await MovieModel.delete({ id })
        if(result === false){
            return res.status(404).json({ message: 'Movie not found'})
        }
    
        return res.json({ message: 'Movie deleted'})
    }

    static async update(req, res){
        const result = validateParcialMovie(req.body)
        
        if(!result.success) { // = result.error
            return res.status(404).json({ error: JSON.parse(result.error.message)})
        } 
        
        const { id } = req.params
        const updateMovie = await MovieModel.updateMovie({ id, input: result.data})
    
        return res.json(updateMovie)
    }
}