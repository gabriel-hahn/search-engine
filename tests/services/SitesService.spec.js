require("../../src/models/Site");

const assert = require("assert");
const sinon = require("sinon");
const mongoose = require("mongoose");
const Site = mongoose.model("Site");
const SitesService = require("../../src/services/SitesService");

describe("Sites service tests", () => {
  const SITE = new Site({
    url: "http://www.teste.com.br",
    description: "Description",
    keywords: "Test, unit, node",
    title: "Title test",
    clicks: 3
  });

  describe("Smoke tests", () => {
    it("Should exists createSite method", () => {
      assert.ok(SitesService.createSite);
    });

    it("Should exists findByUrl method", () => {
      assert.ok(SitesService.findByUrl);
    });

    it("Should exists countByTerm method", () => {
      assert.ok(SitesService.countByTerm);
    });

    it("Should exists getByTerm method", () => {
      assert.ok(SitesService.getByTerm);
    });

    it("Should exists increaseClicks method", () => {
      assert.ok(SitesService.increaseClicks);
    });
  });

  describe("Create site function", () => {
    it("Should return the site created", async () => {
      sinon.stub(Site, "create").resolves(SITE);
      const newSite = await SitesService.createSite(SITE);
      assert.equal(SITE, newSite);
    });
  });

  describe("Find site function", () => {
    it("Should return the site found", async () => {
      sinon.stub(Site, "find").resolves(SITE);
      const siteFound = await SitesService.findByUrl(SITE);
      assert.equal(SITE.url, JSON.parse(siteFound).url);
    });
  });
});
