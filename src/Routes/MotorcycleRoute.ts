import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController'; 
import MotorcycleService from '../services/MotorcycleService';
import MotorcycleModel from '../models/MotorcycleModel';

const motorcycleRouter = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);
const idEndpoint = '/motorcycles/:id';

motorcycleRouter.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
motorcycleRouter.get(idEndpoint, (req, res) => motorcycleController.readOne(req, res));
motorcycleRouter.put(idEndpoint, (req, res) => motorcycleController.update(req, res));
motorcycleRouter.delete(idEndpoint, (req, res) => motorcycleController.delete(req, res));
motorcycleRouter.get('/motorcycles', (req, res) => motorcycleController.read(req, res));

export default motorcycleRouter;