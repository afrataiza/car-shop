export enum ErrorTypes {
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
  FildsMustRequired = 'FildsMustRequired',
}
  
export type ErrorResponseObject = { 
  error: string;
  httpStatus: number
};
  
export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};
  
export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    error: 'Object not found',
    httpStatus: 404,
  },
  InvalidMongoId: {
    error: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  FildsMustRequired: {
    error: 'Filds must be required ',
    httpStatus: 400,
  },
};