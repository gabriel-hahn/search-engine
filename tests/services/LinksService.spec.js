const assert = require("assert");
const LinksService = require("../../src/services/LinksService");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("Links service tests", () => {
  const DOM = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Gabriel Hahn Site</title>
                <meta charset="utf-8" />
                <meta content="Web Crawling" property="description" />
            </head>
            <body>
                <a href="www.google.com.br" />
                <img src="http://image.png" alt="Image" />
            </body>
        </html>
    `;

  const domObject = new JSDOM(DOM);
  LinksService.setCurrentDomObject(domObject.window.document);

  describe("Smoke tests", () => {
    it("Should exists setCurrentDomObject method", () => {
      assert.ok(LinksService.setCurrentDomObject);
    });

    it("Should exists startCrawling method", () => {
      assert.ok(LinksService.startCrawling);
    });

    it("Should exists getMetaTags method", () => {
      assert.ok(LinksService.getMetaTags);
    });

    it("Should exists getTitleTags method", () => {
      assert.ok(LinksService.getTitleTags);
    });

    it("Should exists getImagesTags method", () => {
      assert.ok(LinksService.getImagesTags);
    });

    it("Should exists getLinks method", () => {
      assert.ok(LinksService.getLinks);
    });

    it("Should exists getKeywordByTag method", () => {
      assert.ok(LinksService.getKeywordByTag);
    });

    it("Should exists getDescriptionByTag method", () => {
      assert.ok(LinksService.getDescriptionByTag);
    });

    it("Should exists getDOMByURL method", () => {
      assert.ok(LinksService.getDOMByURL);
    });

    it("Should exists getNotSocialNetworkUrl method", () => {
      assert.ok(LinksService.getNotSocialNetworkUrl);
    });

    it("Should exists fixUrlsWithRoutes method", () => {
      assert.ok(LinksService.fixUrlsWithRoutes);
    });

    it("Should exists verifyLinks method", () => {
      assert.ok(LinksService.verifyLinks);
    });

    it("Should exists verifyImages method", () => {
      assert.ok(LinksService.verifyImages);
    });
  });

  describe("Get tags from DOM", () => {
    it("Should return all meta tags found", () => {
      let metaTags = LinksService.getMetaTags();
      assert.equal(metaTags.length, 2);
    });

    it("Should return correct sort of results", () => {
      let metaTags = LinksService.getMetaTags();
      assert.ok(metaTags[0].attributes.length === 1);
    });
  });

  describe("Get title from DOM", () => {
    it("Should return correct title", () => {
      let titleTags = LinksService.getTitleTags();
      assert.equal(titleTags[0].textContent, "Gabriel Hahn Site");
    });
  });

  describe("Get images from DOM", () => {
    it("Should return the correct image URL", () => {
      let imagesTags = LinksService.getImagesTags();
      assert.equal(imagesTags[0].src, "http://image.png/");
    });
  });
});
