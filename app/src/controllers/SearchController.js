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
            let links = [...dom.getElementsByTagName('a')].filter(element => element.href.startsWith('http', 0));
            let linksFixed = this.fixUrlsWithRoutes(links, url);
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

    //Fix links that contains routes, like /about. For this case, needs to put the correct base URL.
    fixUrlsWithRoutes(links, originalUrl) {
        return links.map(link => {
            if (link.href.startsWith(window.location.href, 0)) {
                link.href = link.href.replace(window.location.href, originalUrl);
            }

            return link;
        });
    }
}
