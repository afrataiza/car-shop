import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

class CarController {
  constructor(
    private _service: IService<ICar>,
  ) { }

  public async create(
    req: Request,
    res: Response,
  ) {
    try {
      const car = await this._service.create(req.body);
      return res.status(201).json(car);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  //   public async readOne(
  //     req: Request,
  //     res: Response<ICar>,
  //   ) {
  //     const result = await this._service.readOne(req.params.id);
  //     return res.status(200).json(result);
  //   }

  //   public async update(
  //     req: Request,
  //     res: Response<ICar>,
  //   ) {
  //     const { material, color } = req.body;
  //     const frame = { material, color };
  //     const result = await this._service.update(req.params.id, frame);
  //     return res.status(200).json(result);
  //   }

//   public async read(
//     req: Request,
//     res: Response<ICar[]>,
//   ) {
//     const result = await this._service.read();
//     return res.status(200).json(result);
//   }
}

export default CarController;