import { Router } from 'express';
import CarController from '../controllers/CarController'; 
import CarService from '../services/CarService';
import CarModel from '../models/CarModel';

const carRouter = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

carRouter.post('/cars', (req, res) => carController.create(req, res));
// route.get('/frame/:id', (req, res) => carController.readOne(req, res));
// route.put('/frame/:id', (req, res) => carController.update(req, res));
// route.get('/frame', (req, res) => carController.read(req, res));

export default carRouter;