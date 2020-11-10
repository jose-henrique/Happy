import Orphanage from '../models/orphanage'
import image_views from './image_views'

export default {
    render(orphanage:Orphanage) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hour: orphanage.opening_hour,
            open_on_weekends: orphanage.open_on_weekends,
            images: image_views.renderMany(orphanage.images)
        };
    },
    renderMany(orphanages: Orphanage[]){
        return orphanages.map(orphanage => this.render(orphanage));
    }
}