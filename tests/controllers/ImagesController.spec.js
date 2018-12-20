const assert = require('assert');
const Images = require('../../src/models/Images');
const ImagesController = require('../../src/controllers/ImagesController');

describe('Images controller tests', () => {
    describe('Smoke tests', () => {
        it('Should exists insertImage method', () => {
            assert.ok(ImagesController.insertImage);
        });

        it('Should exists getSiteByUrl method', () => {
            assert.ok(ImagesController.getImageByImageUrl);
        });

        it('Should exists getCountByTerm method', () => {
            assert.ok(ImagesController.getCountByTerm);
        });

        it('Should exists getByTerm method', () => {
            assert.ok(ImagesController.getByTerm);
        });
    });
});
