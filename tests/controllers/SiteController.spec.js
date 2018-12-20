const assert = require('assert');
const Site = require('../../src/models/Site');
const SiteController = require('../../src/controllers/SiteController');

describe('Site controller tests', () => {
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
