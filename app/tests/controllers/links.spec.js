// Needs polyfill because I used async functions.
import 'babel-polyfill';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

global.fetch = require('node-fetch');

import LinksController from '../../src/controllers/LinksController';

describe('Links', () => {
    let links;
    let fetchedStub;

    beforeEach(() => {
        links = new LinksController();

        fetchedStub = sinon.stub(global, 'fetch');
        fetchedStub.resolves({ json: () => { } });
    });

    afterEach(() => {
        fetchedStub.restore();
    });

    describe('Smoke tests', () => {
        it('Should exists startEvents method', () => {
            expect(links.startEvents).to.exist;
        });

        it('Should exists getMetaTags method', () => {
            expect(links.getMetaTags).to.exist;
        });

        it('Should exists getTitleTags method', () => {
            expect(links.getTitleTags).to.exist;
        });

        it('Should exists getImagesTags method', () => {
            expect(links.getImagesTags).to.exist;
        });

        it('Should exists getLinks method', () => {
            expect(links.getLinks).to.exist;
        });

        it('Should exists getDOMByURL method', () => {
            expect(links.getDOMByURL).to.exist;
        });

        it('Should exists getNotSocialNetworkUrl method', () => {
            expect(links.getNotSocialNetworkUrl).to.exist;
        });

        it('Should exists fixUrlsWithRoutes method', () => {
            expect(links.fixUrlsWithRoutes).to.exist;
        });

        it('Should exists insertLinks method', () => {
            expect(links.insertLinks).to.exist;
        });

        it('Should exists insertImages method', () => {
            expect(links.insertImages).to.exist;
        });
    });
});
