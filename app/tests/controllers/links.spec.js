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

    beforeEach(() => {
        links = new LinksController();
    });

    describe('Smoke', () => {
        it('Should exists startEvents method', () => {
            expect(links.startEvents).to.exists;
        });
    });
});
