import { Configuration } from 'webpack';
import paths from './util/paths';

const services: Configuration = {
  entry: {
    'service/flight': paths.source.service.flight,
    'service/plantae': paths.source.service.plantae,
    'service/user': paths.source.service.user,
  },
};

export default services;
