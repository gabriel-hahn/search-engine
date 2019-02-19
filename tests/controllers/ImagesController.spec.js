const assert = require('assert');
const Image = require('../../src/models/Image');
const ImagesController = require('../../src/controllers/ImagesController');

describe('Images controller tests', () => {
    describe('Smoke tests', () => {
        it('Should exists getImageByUrl method', () => {
            assert.ok(ImagesController.getImageByUrl);
        });

        it('Should exists getCountByTerm method', () => {
            assert.ok(ImagesController.getCountByTerm);
        });

        it('Should exists getByTerm method', () => {
            assert.ok(ImagesController.getByTerm);
        });

        it('Should exists increaseClicks method', () => {
            assert.ok(ImagesController.increaseClicks);
        });
    });
});
