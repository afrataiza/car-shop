import { z } from 'zod';
import vehicleZodSchema from './IVehicle';

const motorcycleSchema = vehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().min(1).max(2500),
});

export type IMotorcycle = z.infer<typeof motorcycleSchema>;

export default motorcycleSchema;
