import { IService } from '../interfaces/IService';
import motorcycleSchema, { IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj:IMotorcycle): Promise<IMotorcycle> {
    const parsed = motorcycleSchema.safeParse(obj);
    if (!parsed.success) throw new Error(ErrorTypes.FildsMustRequired);
    return this._motorcycle.create(parsed.data);
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const motorcycle = await this._motorcycle.readOne(_id);
    if (!motorcycle) throw new Error(ErrorTypes.ObjectNotFound);
    return motorcycle;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    const parsed = motorcycleSchema.safeParse(obj);
    if (!parsed.success) throw new Error(ErrorTypes.FildsMustRequired);
    
    const motorcycle = await this._motorcycle.update(_id, parsed.data);
    if (!motorcycle) throw new Error(ErrorTypes.ObjectNotFound);
    return motorcycle;
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._motorcycle.read();
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const motorcycle = await this._motorcycle.delete(_id);
    if (!motorcycle) throw new Error(ErrorTypes.ObjectNotFound);
    return motorcycle;
  }
}

export default MotorcycleService;
