require("../../src/models/Site");

const assert = require("assert");
const { expect } = require("chai");
const mongoose = require("mongoose");
const Image = mongoose.model("Site");
const sinon = require("sinon");
var httpMock = require("node-mocks-http");

const SitesController = require("../../src/controllers/SitesController");
const SitesService = require("../../src/services/SitesService");

describe("Site controller tests", () => {
  const SITE = new Image({
    url: "http://www.teste.com.br",
    description: "Description",
    keywords: "Test, unit, node",
    title: "Title test",
    clicks: 3
  });

  describe("Smoke tests", () => {
    it("Should exists getSiteByUrl method", () => {
      assert.ok(SitesController.getSiteByUrl);
    });

    it("Should exists getCountByTerm method", () => {
      assert.ok(SitesController.getCountByTerm);
    });

    it("Should exists getByTerm method", () => {
      assert.ok(SitesController.getByTerm);
    });

    it("Should exists increaseClicks method", () => {
      assert.ok(SitesController.increaseClicks);
    });
  });

  describe("Get site from URL", () => {
    let res;
    let req;

    beforeEach(() => {
      res = httpMock.createResponse();
      req = httpMock.createRequest({
        method: "GET",
        url: "/api/site/siteByUrl",
        params: {
          url: "http://teste.com.br"
        }
      });
    });

    it("Should return a site object from a URL", async () => {
      let valueReturned = JSON.stringify(SITE);
      sinon.stub(SitesService, "findByUrl").resolves(valueReturned);
      await SitesController.getSiteByUrl(req, res);

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
        url: "/api/site/getCountByTerm/:term",
        params: {
          term: "Brasil"
        }
      });
    });

    it("Should return count of items by term", async () => {
      let valueReturned = JSON.stringify("37");
      sinon.stub(SitesService, "countByTerm").resolves(valueReturned);
      await SitesController.getCountByTerm(req, res);
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
        url: "/api/site/getByTerm/:term",
        params: {
          term: "Brasil"
        }
      });
    });

    it("Should return results by term", async () => {
      let valueReturned = JSON.stringify(SITE);
      sinon.stub(SitesService, "getByTerm").resolves(valueReturned);
      await SitesController.getByTerm(req, res);
      let responseJson = JSON.parse(res._getData());

      expect(responseJson).to.be.eq(valueReturned);
    });
  });

  describe("Increase clicks of a site", () => {
    let res;
    let req;

    beforeEach(() => {
      res = httpMock.createResponse();
      req = httpMock.createRequest({
        method: "GET",
        url: "/api/site/increase",
        params: {
          id: "123"
        }
      });
    });

    it("Should return a site of increase site clicks", async () => {
      let valueReturned = JSON.stringify(SITE);
      sinon.stub(SitesService, "increaseClicks").resolves(valueReturned);
      await SitesController.increaseClicks(req, res);
      let responseJson = JSON.parse(res._getData());

      expect(responseJson).to.be.eq(valueReturned);
    });
  });
});
