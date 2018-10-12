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

        this.getLinks();
    }

    searchLinks(isSites) {
        let url = new URL(window.location.href);
        let terms = url.searchParams.get('term');
    }

    //Get the links into href attributes throuth a URL.
    getLinks(url) {
        url = 'https://gabrielhahn.netlify.com/';
        this.getDOMByURL(url).then(dom => {
            [...dom.getElementsByTagName('a')].forEach(element => {
                console.log(element.href);
            });
        });
    }

    //Get the DOM from a URL.
    getDOMByURL(url) {
        return new Promise((resolve, reject) => {
            var ajax = new XMLHttpRequest();

            ajax.open('GET', url);
            ajax.send();

            ajax.onload = event => {
                let domElement = new DOMParser().parseFromString(ajax.responseText, 'text/html');
                resolve(domElement);
            }
        });
    }
}
