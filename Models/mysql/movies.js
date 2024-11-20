import mysql from 'mysql2/promise' // el barra promise me permite usar las promesas

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'moviesdb',
}

const connection = await mysql.createConnection(config)

export class MovieModel {
    static async getAll ({ genre }){
        if(genre){
            const lowerCaseGenre = genre.toLowerCase()

            // get genre ids from database table using genre names
            const [genres] = await connection.query(
                // el ? lo va reemplazando por los valores de [lowerCaseGenre]
                'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre] //el lower para evitar casos de case sensitive
                
                // NO HACER ESTO, ESTO ES INYECCIÓN Y LE ESTAMOS DANDO PERMISO AL USUARIO DE PODER PONER LO QUE QUIERA
                //'SELECT id, name FROM genre WHERE LOWER(name) = ${lowerCaseGenre}'
            )

            // no genre found
            if( genre.lengh === 0 ) return []
            
            // get id from the first genre result
            const [{ id }] = genres

            // !!HACER EJERCICIO!!
            // get all movies ids from database table, la query a movie_genres, join, y devolver resultados..
            /*
            const [moviesID] = await connection.query(
                'SELECT id FROM movie'
            )
            const [movie_genres_query] = await connection.query(
                'SELECT *, FROM movie_genre'
            )
            cont 
            */
           return []
        }
        const [movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
        )

        return movies
    }


    static async getById ({ id }){
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
             FROM movie
             WHERE id = UUID_TO_BIN(?);`,
             [id]
        )

        if(movies.length === 0) return null
        console.log(movies[0])
        return movies[0]
    }

    static async create ({ input }){
        const {
            genre: genreInput,
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = input

        const [uuidResult] = await connection.query('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult

        try {
            await connection.query(
                `INSERT INTO movie (title, year, director, duration, poster, rate) 
                VALUES (UUID_TO_BIN("${uuid}"),?,?,?,?,?);`,
                [title, year, director, duration, poster, rate]
            )
        } catch (error) {
            // este error no tiene que verlo el usuario porque puede enviar información sensible
            throw new Error('Error creating movie')
            // envíar la traza a un servicio interno
            // sendLog(error)
        }
            

        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
             FROM movie
             WHERE id = UUID_TO_BIN(?);`,
            [uuid]
        )

        return movies[0]
    }
}