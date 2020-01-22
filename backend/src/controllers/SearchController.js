/* eslint-disable consistent-return */
import Dev from '../models/Dev';
import parseStringAsArray from '../utils/parseStringAsArray';

module.exports = {
  async index(request, response) {
    try {
      const { latitude, longitude, techs } = request.query;

      const techsArray = parseStringAsArray(techs);
      const devs = await Dev.find({
        techs: {
          $in: techsArray,
        },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: 10000,
          },
        },
      });

      // Buscar todos os devs num raio de 10km
      // Filtrar por tecnologias

      return response.json({ devs });
    } catch (err) {
      response.json.parseStringAsArray(err);
    }
  },
};
