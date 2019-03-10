require("../../src/models/Image");

const assert = require("assert");
const sinon = require("sinon");
const mongoose = require("mongoose");
const Image = mongoose.model("Image");
const ImagesService = require("../../src/services/ImagesService");

describe("Images service tests", () => {
  const IMAGE = new Image({
    siteUrl: "http://www.teste.com.br",
    imageUrl: "http://image.jpg",
    alt: "Alt test",
    title: "Title test",
    clicks: 3,
    broken: false
  });

  describe("Smoke tests", () => {
    it("Should exists createImage method", () => {
      assert.ok(ImagesService.createImage);
    });

    it("Should exists findByUrl method", () => {
      assert.ok(ImagesService.findByUrl);
    });

    it("Should exists getCountByTerm method", () => {
      assert.ok(ImagesService.getCountByTerm);
    });

    it("Should exists getByTerm method", () => {
      assert.ok(ImagesService.getByTerm);
    });

    it("Should exists increaseClicks method", () => {
      assert.ok(ImagesService.increaseClicks);
    });
  });

  describe("Create image function", () => {
    it("Should return the image created", async () => {
      sinon.stub(Image, "create").resolves(IMAGE);
      const newImage = await ImagesService.createImage(IMAGE);
      assert.equal(IMAGE, newImage);
    });
  });

  describe("Find image function", () => {
    it("Should return the image found", async () => {
      sinon.stub(Image, "find").resolves(IMAGE);
      const imageFound = await ImagesService.findByUrl(IMAGE);
      assert.equal(IMAGE.imageUrl, JSON.parse(imageFound).imageUrl);
    });
  });
});
