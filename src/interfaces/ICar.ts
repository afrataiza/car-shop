import { z } from 'zod';
import vehicleZodSchema from './IVehicle';

const carSchema = vehicleZodSchema.extend({
  doorsQty: z.number({
    required_error: 'DoorsQty is required',
    invalid_type_error: 'DoorsQty must be a number',
  }).min(2, 'DoorsQty must be greater than 1').max(4, 'DoorsQty must be last than 5'),
  seatsQty: z.number({
    required_error: 'SeatsQty is required',
    invalid_type_error: 'SeatsQty must be a number',
  }).min(2, 'SeatsQty must be greater than 1').max(7, 'SeatsQty must be last than 8'),
});

export type ICar = z.infer<typeof carSchema>;

export default carSchema;