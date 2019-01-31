const assert = require('assert');
const nock = require('nock');
const Site = require('../../src/models/Site');
const SitesController = require('../../src/controllers/SitesController');

describe('Site controller tests', () => {
    //this.beforeAll(() => {
        //Object from DB
        //nock('http://localhost:8080')
        //.get('/?term=Dog')
        //.reply(200, Response);
    //});

    describe('Smoke tests', () => {
        it('Should exists getSiteByUrl method', () => {
            assert.ok(SitesController.getSiteByUrl);
        });

        it('Should exists getCountByTerm method', () => {
            assert.ok(SitesController.getCountByTerm);
        });

        it('Should exists getByTerm method', () => {
            assert.ok(SitesController.getByTerm);
        });
    });
});
