import { IService } from '../interfaces/IService';
import carSchema, { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:ICar): Promise<ICar> {
    const parsed = carSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    return this._car.create(parsed.data);
  }

  public async readOne(_id: string): Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.ObjectNotFound);
    return car;
  }

  //   public async update(_id: string, obj: unknown): Promise<ICar> {
  //     const parsed = carSchema.safeParse(obj);
  //     if (!parsed.success) {
  //       throw parsed.error;
  //     }
  //     const frame = await this._car.update(_id, parsed.data);
  //     if (!frame) throw new Error(ErrorTypes.EntityNotFound);
  //     return frame;
  //   }

  public async read(): Promise<ICar[]> {
    return this._car.read();
  }
}

export default CarService;
