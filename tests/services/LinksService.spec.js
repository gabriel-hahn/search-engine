/*const assert = require('assert');
const LinksService = require('../../src/services/LinksService');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('Links service tests', () => {

    const DOM = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Gabriel Hahn Site</title>
                <meta charset="utf-8">
                <meta content="Web Crawling" property="description">
            </head>
            <body>
                <a href="www.google.com.br" 
            </body>
        </html>
    `;

    // It simules a DOM object to test all methods.
    const DOM_OBJECT = new JSDOM(DOM);

    describe('Smoke tests', () => {
        it('Should exists startCrawling method', () => {
            assert.ok(LinksService.startCrawling);
        });

        it('Should exists getMetaTags method', () => {
            assert.ok(LinksService.getMetaTags);
        });

        it('Should exists getTitleTags method', () => {
            assert.ok(LinksService.getTitleTags);
        });

        it('Should exists getImagesTags method', () => {
            assert.ok(LinksService.getImagesTags);
        });

        it('Should exists getLinks method', () => {
            assert.ok(LinksService.getLinks);
        });

        it('Should exists getKeywordByTag method', () => {
            assert.ok(LinksService.getKeywordByTag);
        });

        it('Should exists getDescriptionByTag method', () => {
            assert.ok(LinksService.getDescriptionByTag);
        });

        it('Should exists getDOMByURL method', () => {
            assert.ok(LinksService.getDOMByURL);
        });

        it('Should exists getNotSocialNetworkUrl method', () => {
            assert.ok(LinksService.getNotSocialNetworkUrl);
        });

        it('Should exists fixUrlsWithRoutes method', () => {
            assert.ok(LinksService.fixUrlsWithRoutes);
        });

        it('Should exists verifyLinks method', () => {
            assert.ok(LinksService.verifyLinks);
        });

        it('Should exists verifyImages method', () => {
            assert.ok(LinksService.verifyImages);
        });
    });

    describe('Should return all meta tags found', () => {
        //LinksService._currentDom
        //let metaTags = LinksService.getMetaTags();
    });
});*/
