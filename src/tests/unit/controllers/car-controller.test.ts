import * as sinon from "sinon";
import chai from "chai";
const { expect } = chai;
import CarModel from "../../../models/CarModel";
import CarService from "../../../services/CarService";
import CarController from "../../../controllers/CarController";
import * as carMock from "../../mocks/CarsMock";
import { ICar } from "../../../interfaces/ICar";
import { Request, Response } from "express";

describe("Testa a camada controller da rota /cars", () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon.stub(carService, "create").resolves(carMock.validCarWithId);
    sinon.stub(carService, "read").resolves(carMock.listCars);
    sinon.stub(carService, "readOne").resolves(carMock.validCarWithId);
    sinon.stub(carService, "update").resolves(carMock.carUpdate);
    sinon.stub(carService, "delete").resolves({} as ICar);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  describe("Testa a função create", async () => {
    it("quando um carro é criado com sucesso", async () => {
      req.body = carMock.validCar;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock.validCarWithId))
        .to.be.true;
    });
  });

  describe("Testa a função read", async () => {
    it("quando todos os carros são listados com sucesso", async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock.listCars)).to.be
        .true;
    });
  });

  describe("Testa a função readOne", async () => {
    it("quando o carro é encontrado com sucesso", async () => {
      req.params = { id: "62cf1fc6498565d94eba52cd" };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock.validCarWithId))
        .to.be.true;
    });
  });

  describe("Testa a função update", async () => {
    it("quando o carro é atualizado com sucesso", async () => {
      req.params = { id: "62cf1fc6498565d94eba52cd" };
      req.body = carMock.carUpdate;
      await carController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock.carUpdate)).to.be
        .true;
    });
  });

  describe("Testa a função delete", async () => {
    it("quando o carro é deletado com sucesso", async () => {
      req.params = { id: "62cf1fc6498565d94eba52cd" };
      await carController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({})).to.be.true;
    });
  });
});
