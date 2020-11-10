import {  Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

import * as Yup from 'yup';

class UserController {
    index(req: Request, res: Response){
        return res.send({ userId: req.userId })
    }

    async store(req: Request, res: Response) {
        const repository = getRepository(User);
        const { name, email, password } = req.body;
		console.log(name, email, password )

        const userExists = await repository.findOne({ where: { email } })

        if (userExists) {
            return res.sendStatus(409);
        }

        const data = {name, email, password}

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required()
        })

        await schema.validate(data, {
            abortEarly: false
        } )

        const user = repository.create(data);
        await repository.save(user);

        return res.json(user);

        
    }
    
    async Authenticate(req: Request, res: Response){
        const repository = getRepository(User);
        const {  email, password } = req.body;

        const user = await repository.findOne({ where: { email } })

        if (!user) {
            return res.sendStatus(401)
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword){
            return res.sendStatus(401);
        }

        

        const token = jwt.sign({ id: user.id }, 'secret', {expiresIn: '1d'})


        return res.json({
            user,
            token
        })


    }

}

export default new UserController();