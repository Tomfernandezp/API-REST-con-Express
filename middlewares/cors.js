import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://localhost:8080',
    'http://localhost:1234',
    'http://movies.com',
    'http://midu.dev'
]

// función que al ejecutarla me devuelve la funcionalidad de cors
// esto es para poder inyectarle opciones
export const corsMiddleware = ({ acceptedOirings = ACCEPTED_ORIGINS } = {} ) => cors({
    origin: (origin, callback) => {
   
    
    if(acceptedOirings.includes(origin)) {
        return callback(null, true)
    }

    if(!origin) {
        return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
    }
})