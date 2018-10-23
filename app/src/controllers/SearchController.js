import RequestUtil from '../utils/RequestUtil';

let urlApiData = 'http://localhost:9090/api/site';

export default class SearchController {

    constructor() {
        this._searchLinkSites = document.getElementById('sitesLink');
        this._searchLinkImages = document.getElementById('imagesLink');

        this.startEvents();
    }

    changeLinkSelection(isSites) {
        if (isSites) {
            if (![...this._searchLinkSites.classList].includes('active')) {
                this._searchLinkSites.classList.add('active');
                this._searchLinkImages.classList.remove('active');
            }
        }
        else {
            if (![...this._searchLinkImages.classList].includes('active')) {
                this._searchLinkSites.classList.remove('active');
                this._searchLinkImages.classList.add('active');
            }
        }
    }

    startEvents() {
        this._searchLinkSites.addEventListener('click', e => {
            e.preventDefault();
            this.changeLinkSelection(true);
            this.searchLinks(true);
        });

        this._searchLinkImages.addEventListener('click', e => {
            e.preventDefault();
            this.changeLinkSelection(false);
            this.searchLinks(false);
        });
    }

    searchLinks(isSites) {
        let url = new URL(window.location.href);
        let terms = url.searchParams.get('term');

        //Continue
    }
}
