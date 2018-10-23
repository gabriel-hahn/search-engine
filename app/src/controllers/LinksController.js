import RequestUtil from '../utils/RequestUtil';

let urlApiData = 'http://localhost:9090/api/site';

export default class InsertController {

    constructor() {
        this._alreadyCrawled = [];

        this.startEvents();
    }

    startEvents() {
        this.getImages('http://www.bbc.com/');
    }

    searchLinks(isSites) {
        let url = new URL(window.location.href);
        let terms = url.searchParams.get('term');
    }

    getMetaTags(url) {
        this.getDOMByURL(url).then(dom => {
            let meta = dom.getElementsByTagName('meta');
            return meta;
        }).catch(err => {
            console.error(err);
        });
    }

    getTitleTags(url) {
        this.getDOMByURL(url).then(dom => {
            let title = dom.getElementsByTagName('head')[0].getElementsByTagName('title');
            return title;
        }).catch(err => {
            console.error(err);
        });
    }

    getImages(url) {
        this.getDOMByURL(url).then(dom => {
            let images = [...dom.getElementsByTagName('img')].filter(image => image.src.startsWith('http', 0));
            return images;
        }).catch(err => {
            console.error(err);
        });
    }
    //Get the links into href attributes throuth a URL.
    getLinks(url) {
        this.getDOMByURL(url).then(dom => {
            let links = [...dom.getElementsByTagName('a')].filter(element => element.href.startsWith('http', 0));
            let linksFixed = this.fixUrlsWithRoutes(links, url);

            //Verify if the href already exists in crawled list and add it.
            if (!this._alreadyCrawled.includes(url)) {
                this._alreadyCrawled.push(url);
            }

            //Get the child links that will be 'crawled'.
            let childLinksToSearch = linksFixed.filter(link => link.href !== url);

            childLinksToSearch.forEach(link => {
                if (!this._alreadyCrawled.includes(link.href)) {
                    this.getLinks(link.href);
                }
            });
        }).catch(err => {
            console.error(err);
        });
    }

    //Get the DOM from a URL.
    getDOMByURL(url) {
        return RequestUtil.get(url).then(response => {
            return new DOMParser().parseFromString(response, 'text/html');
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

    insertLinks(url, title, description, keywords) {
        let newData = { url, title, description, keywords };

        //Verify if the url already exist on db.
        RequestUtil.get(`${urlApiData}/${newData.url}`).then(response => {
            if (JSON.parse(response).length === 0) {
                RequestUtil.post(urlApiData, newData).then(data => {
                    console.log('Success');
                }).catch(err => {
                    console.error(err);
                });
            }
        });
    }
}
