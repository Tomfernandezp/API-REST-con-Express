import { Router } from 'express' //permite crear un enrutador para contestar a todos los path

import { MovieController } from '../Controllers/movie.js'
export const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)

moviesRouter.get('/id', MovieController.getById)

moviesRouter.post('/', MovieController.create)

moviesRouter.delete('/:id', MovieController.delete)

moviesRouter.patch('/:id', MovieController.update)