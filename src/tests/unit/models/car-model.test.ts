import * as sinon from "sinon";
import chai from "chai";
const { expect } = chai;
import { Model } from "mongoose";
import * as carMock from "../../mocks/CarsMock";
import CarModel from "../../../models/CarModel";
import { ICar } from "../../../interfaces/ICar";

describe("Testa a camada model da rota /cars", () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, "create").resolves(carMock.validCarWithId);
    sinon.stub(Model, "find").resolves(carMock.listCars);
    sinon.stub(Model, "findOne").resolves(carMock.validCarWithId);
    sinon.stub(Model, "findByIdAndUpdate").resolves(carMock.updatedCar);
    sinon.stub(Model, "findByIdAndDelete").resolves({});
  });

  after(() => {
    sinon.restore();
  });

  describe("Testa a função create", async () => {
    it("quando um carro é criado com sucesso", async () => {
      const newCar = await carModel.create(carMock.validCar);
      expect(newCar).to.be.deep.equal(carMock.validCarWithId);
    });

    it("dispara status 400, quando tenta criar um carro com body vazio", async () => {
      try {
        await carModel.create({} as ICar);
      } catch (error: any) {
        expect(error.message).to.be.eq("FildsMustRequired");
      }
    });

    it("retorna status 400, quando tenta criar um carro com seatQty menor que 2", async () => {
      try {
        await carModel.create(carMock.carSeatsLtTwo);
      } catch (error: any) {
        expect(error.message).to.be.eq("FildsMustRequired");
      }
    });

    it("retorna status 400, quando tenta criar um carro com doorsQty menor que 2", async () => {
      try {
        await carModel.create(carMock.carDoorsLtTwo);
      } catch (error: any) {
        expect(error.message).to.be.eq("FildsMustRequired");
      }
    });
  });

  describe("Testa a função read", async () => {
    it("quando todos os carros são listados com sucesso", async () => {
      const cars = await carModel.read();
      expect(cars).to.be.deep.equal(carMock.listCars);
    });
  });

  describe("Testa a função readOne", async () => {
    it("quando o carro é encontrado com sucesso", async () => {
      const cars = await carModel.readOne("62cf1fc6498565d94eba52cd");
      expect(cars).to.be.deep.equal(carMock.validCarWithId);
    });

    it("retorna status 400, quando o id possui menos de 24 caracteres", async () => {
      try {
        await carModel.readOne("123ERRADO");
      } catch (error: any) {
        expect(error.message).to.be.eq("InvalidMongoId");
      }
    });

    it("retorna status 404, quando o id possui 24 caracteres mas não é válido", async () => {
      try {
        await carModel.readOne("123456789123456789123456");
      } catch (error: any) {
        expect(error.message).to.be.eq("ObjectNotFound");
      }
    });
  });

  describe("Testa a função update", async () => {
    it("quando o carro é atualizado com sucesso", async () => {
      const updatedCar = await carModel.update(
        "62cf1fc6498565d94eba52cd",
        carMock.carUpdate
      );
      expect(updatedCar).to.be.deep.equal(carMock.updatedCar);
    });

    it("retorna status 400, quando o id possui menos de 24 caracteres", async () => {
      try {
        await carModel.update("123ERRADO", carMock.carUpdate);
      } catch (error: any) {
        expect(error.message).to.be.eq("InvalidMongoId");
      }
    });

    it("retorna status 404, quando o id possui 24 caracteres mas não é válido", async () => {
      try {
        await carModel.update("123456789123456789123456", carMock.carUpdate);
      } catch (error: any) {
        expect(error.message).to.be.eq("ObjectNotFound");
      }
    });
  });

  describe("Testa a função delete", async () => {
    it("quando o carro é deletado com sucesso", async () => {
      const deletedCar = await carModel.delete("62cf1fc6498565d94eba52cd");
      expect(deletedCar).to.be.deep.equal({});
    });

    it("retorna status 400, quando o id possui menos de 24 caracteres", async () => {
      try {
        await carModel.delete("123ERRADO");
      } catch (error: any) {
        expect(error.message).to.be.eq("InvalidMongoId");
      }
    });

    it("retorna status 404, quando o id possui 24 caracteres mas não é válido", async () => {
      try {
        await carModel.delete("123456789123456789123456");
      } catch (error: any) {
        expect(error.message).to.be.eq("ObjectNotFound");
      }
    });
  });
});
