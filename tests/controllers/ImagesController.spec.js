require("../../src/models/Image");

const assert = require("assert");
const { expect } = require("chai");
const mongoose = require("mongoose");
const Image = mongoose.model("Image");
const sinon = require("sinon");
var httpMock = require("node-mocks-http");

const ImagesController = require("../../src/controllers/ImagesController");
const ImagesService = require("../../src/services/ImagesService");

describe("Images controller tests", () => {
  const IMAGE = new Image({
    siteUrl: "http://www.teste.com.br",
    imageUrl: "http://image.jpg",
    alt: "Alt test",
    title: "Title test",
    clicks: 3,
    broken: false
  });

  describe("Smoke tests", () => {
    it("Should exists getImageByUrl method", () => {
      assert.ok(ImagesController.getImageByUrl);
    });

    it("Should exists getCountByTerm method", () => {
      assert.ok(ImagesController.getCountByTerm);
    });

    it("Should exists getByTerm method", () => {
      assert.ok(ImagesController.getByTerm);
    });

    it("Should exists increaseClicks method", () => {
      assert.ok(ImagesController.increaseClicks);
    });
  });

  describe("Get image from URL", () => {
    let res;
    let req;

    beforeEach(() => {
      res = httpMock.createResponse();
      req = httpMock.createRequest({
        method: "GET",
        url: "/api/image/imageByUrl",
        params: {
          imageUrl: "http://image.jpg"
        }
      });
    });

    it("Should return a image object from a URL", async () => {
      let valueReturned = JSON.stringify(IMAGE);
      sinon.stub(ImagesService, "findByUrl").resolves(valueReturned);
      await ImagesController.getImageByUrl(req, res);

      let responseJson = JSON.parse(res._getData());
      expect(responseJson).to.be.eq(valueReturned);
    });
  });

  describe("Get count by term", () => {
    let res;
    let req;

    beforeEach(() => {
      res = httpMock.createResponse();
      req = httpMock.createRequest({
        method: "GET",
        url: "/api/image/getCountByTerm/:term",
        params: {
          term: "Brasil"
        }
      });
    });

    it("Should return count of items by term", async () => {
      let valueReturned = JSON.stringify("37");
      sinon.stub(ImagesService, "getCountByTerm").resolves(valueReturned);
      await ImagesController.getCountByTerm(req, res);
      let responseJson = JSON.parse(res._getData());

      expect(responseJson).to.be.eq(valueReturned);
    });
  });

  describe("Get results by term", () => {
    let res;
    let req;

    beforeEach(() => {
      res = httpMock.createResponse();
      req = httpMock.createRequest({
        method: "GET",
        url: "/api/image/getByTerm/:term",
        params: {
          term: "Brasil"
        }
      });
    });

    it("Should return results by term", async () => {
      let valueReturned = JSON.stringify(IMAGE);
      sinon.stub(ImagesService, "getByTerm").resolves(valueReturned);
      await ImagesController.getByTerm(req, res);
      let responseJson = JSON.parse(res._getData());

      expect(responseJson).to.be.eq(valueReturned);
    });
  });

  describe("Increase clicks of a image", () => {
    let res;
    let req;

    beforeEach(() => {
      res = httpMock.createResponse();
      req = httpMock.createRequest({
        method: "GET",
        url: "/api/image/increase",
        params: {
          id: "123"
        }
      });
    });

    it("Should return a image of increase images clicks", async () => {
      let valueReturned = JSON.stringify(IMAGE);
      sinon.stub(ImagesService, "increaseClicks").resolves(valueReturned);
      await ImagesController.increaseClicks(req, res);
      let responseJson = JSON.parse(res._getData());

      expect(responseJson).to.be.eq(valueReturned);
    });
  });
});
