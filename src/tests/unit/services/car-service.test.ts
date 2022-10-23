import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import * as carMock from '../../mocks/CarsMock';
import { ICar } from '../../../interfaces/ICar';


describe('Testa a camada service da rota /cars', () => {
    const carModel = new CarModel();
    const carService = new CarService(carModel);
  
    before(async () => {
      sinon.stub(carModel, 'create').resolves(carMock.validCarWithId);
      sinon.stub(carModel, 'read').resolves(carMock.listCars);
      sinon.stub(carModel, 'readOne').resolves(carMock.validCarWithId);
      sinon.stub(carModel, 'update').resolves(carMock.carUpdate);
      sinon.stub(carModel, 'delete').resolves({} as ICar);
    });
  
    after(()=>{
      sinon.restore();
    })
  
    describe('Testa a função create', async () => {
  
      it('quando um carro é criado com sucesso', async () => {
        const newCar = await carService.create(carMock.validCar);
        expect(newCar).to.be.deep.equal(carMock.validCarWithId);
      });
  
      it('dispara status 400, quando tenta criar um carro com body vazio', async () => {
        try {
                  await carService.create({} as ICar);
              } catch (error: any) {
                  expect(error.message).to.be.deep.equal(ErrorTypes.FildsMustRequired);
              }
      });
  
      it('retorna status 400, quando tenta criar um carro com seatQty menor que 2', async () => {
        try {
                  await carService.create(carMock.carSeatsLtTwo);
              } catch (error: any) {
                  expect(error.message).to.be.deep.equal(ErrorTypes.FildsMustRequired);
              }
      });
  
      it('retorna status 400, quando tenta criar um carro com doorsQty menor que 2', async () => {
        try {
                  await carService.create(carMock.carDoorsLtTwo);
              } catch (error: any) {
                  expect(error.message).to.be.deep.equal(ErrorTypes.FildsMustRequired);
              }
      });
    });
  
    describe('Testa a função read', async () => {
  
      it('quando todos os carros são listados com sucesso', async () => {
        const cars = await carService.read();
         expect(cars).to.be.deep.equal(carMock.listCars);
      });
    });
  
    describe('Testa a função readOne', async () => {
  
      it('quando o carro é encontrado com sucesso', async () => {
        const cars = await carService.readOne('62cf1fc6498565d94eba52cd');
         expect(cars).to.be.deep.equal(carMock.validCarWithId);
      });
  
      it('retorna status 400, quando o id possui menos de 24 caracteres', async () => {
        try {
                  await carService.readOne('123ERRADO');
              } catch (error: any) {
                  expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
              }
      });
  
      it('retorna status 404, quando o id possui 24 caracteres mas não é válido', async () => {
        try {
                  await carService.readOne('123456789123456789123456');
              } catch (error: any) {
                  expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
              }
      });
    });
  
    describe('Testa a função update', async () => {
  
      it('quando o carro é atualizado com sucesso', async () => {
        const updatedCar = await carService.update('62cf1fc6498565d94eba52cd', carMock.carUpdate);
         expect(updatedCar).to.be.deep.equal(carMock.carUpdate);
      });
  
      it('retorna status 400, quando o id possui menos de 24 caracteres', async () => {
        try {
                  await carService.update('123ERRADO', carMock.carUpdate);
              } catch (error: any) {
                  expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
              }
      });
  
      it('retorna status 404, quando o id possui 24 caracteres mas não é válido', async () => {
        try {
                  await carService.update('123456789123456789123456', carMock.carUpdate);
              } catch (error: any) {
                  expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
              }
      });
    });
  
    describe('Testa a função delete', async () => {
  
      it('quando o carro é deletado com sucesso', async () => {
        const deletedCar = await carService.delete('62cf1fc6498565d94eba52cd');
         expect(deletedCar).to.be.deep.equal({});
      });
  
      it('retorna status 400, quando o id possui menos de 24 caracteres', async () => {
        try {
                  await carService.delete('123ERRADO');
              } catch (error: any) {
                  expect(error.message).to.be.deep.equal(ErrorTypes.InvalidMongoId);
              }
      });
  
      it('retorna status 404, quando o id possui 24 caracteres mas não é válido', async () => {
        try {
                  await carService.delete('123456789123456789123456');
              } catch (error: any) {
                  expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
              }
      });
    });
  });
  