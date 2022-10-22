import { z } from 'zod';

const vehicleZodSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  }).min(3, 'Model must be 3 or more characters long'),
  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  }).min(1900, 'Year must be greater than 1900').max(2022, 'Year must be last than 2022'),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, 'Color must be 3 or more characters long'),
  status: z.boolean({
    invalid_type_error: 'Status must be a boolean',
  }).optional(),
  buyValue: z.number({
    required_error: 'BuyValue is required',
    invalid_type_error: 'BuyValue must be a number',
  }),
});

export type IVehicle = z.infer<typeof vehicleZodSchema>;

export default vehicleZodSchema;