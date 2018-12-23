const assert = require('assert');
const nock = require('nock');
const Site = require('../../src/models/Site');
const SiteController = require('../../src/controllers/SiteController');

describe('Site controller tests', () => {
    //this.beforeAll(() => {
        //Object from DB
        //nock('http://localhost:8080')
        //.get('/?term=Dog')
        //.reply(200, Response);
    //});

    describe('Smoke tests', () => {
        it('Should exists insertSite method', () => {
            assert.ok(SiteController.insertSite);
        });

        it('Should exists getSiteByUrl method', () => {
            assert.ok(SiteController.getSiteByUrl);
        });

        it('Should exists getCountByTerm method', () => {
            assert.ok(SiteController.getCountByTerm);
        });

        it('Should exists getByTerm method', () => {
            assert.ok(SiteController.getByTerm);
        });
    });
});
