import express, { response } from 'express';
import './database/connection';
import path from 'path';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import errorHandler from './errors/handler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

app.listen(3333);

//Rota = conjunto

//Recurso = usuario

//metodos HTTP = GET, POST, PUT, DELETE
//Parametros

//GET = buscando informação
//POST = criando informação
//PUT = editando uma informação
//DELETE = deletando uma informação

//Query Params: http://localhost:3333/users?search=diego
//Route Params: http://localhost:3333/users/1 (indentificar recurso)
//Body:  http://localhost:3333/users/1 (indentificar um recurso)