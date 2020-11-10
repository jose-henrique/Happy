import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/orphanage';
import orphanages_view from '../views/orphanages_view';

import * as Yup from 'yup';

export default {
    async show(request: Request, response: Response){
        const orphanageRepository = getRepository(Orphanage);

        const orphanages = await orphanageRepository.find({
            relations: ['images']
        });

        return response.json(orphanages_view.renderMany(orphanages));
    },
    async delete(request: Request, response:Response){
        const { id } = request.params;

        const orphanageRepository = getRepository(Orphanage);

        await orphanageRepository.delete(id)

        

        return response.sendStatus(202);
    },
    async index(request: Request, response:Response){
        const { id } = request.params;

        const orphanageRepository = getRepository(Orphanage);

        const orphanage = await orphanageRepository.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orphanages_view.render(orphanage));
    },
    async edit(request: Request, response:Response){
        
        const { id } = request.params;

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hour,
            open_on_weekends
        } = request.body

        

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hour,
            open_on_weekends: open_on_weekends === 'true',
        }

        const schema = Yup.object().shape({
            name: Yup.string(),
            latitude: Yup.number(),
            longitude: Yup.number(),
            about: Yup.string().max(300),
            instructions: Yup.string(),
            opening_hour: Yup.string(),
            open_on_weekends: Yup.boolean(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string()
            }))

        })


        await schema.validate(data, {
            abortEarly: false,
        })

        const orphanageRepository = await getRepository(Orphanage).update(id, data);

        if(orphanageRepository.affected === 1){
            const OrphanageUpdated = await getRepository(Orphanage).findOneOrFail(id, {
                relations: ['images']
            });

            return response.json(OrphanageUpdated);
        };

        
        return response.status(404).json({ messege: 'Orphanage not found!' })
        
    }
}