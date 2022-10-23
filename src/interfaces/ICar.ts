import { z } from 'zod';
import vehicleZodSchema from './IVehicle';

const carSchema = vehicleZodSchema.extend({
  doorsQty: z.number().gte(2).lte(4),
  seatsQty: z.number().gte(2).lte(7),
});

export type ICar = z.infer<typeof carSchema>;

export default carSchema;