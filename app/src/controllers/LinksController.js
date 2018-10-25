import RequestUtil from '../utils/RequestUtil';

let apiUrlSite = 'http://localhost:9090/api/site';
let apiUrlImage = 'http://localhost:9090/api/image';

export default class InsertController {

    constructor() {
        this._alreadyCrawled = [];

        this.startEvents();
    }

    startEvents() {
        this.getLinks('http://www.bbc.com/');
    }

    searchLinks(isSites) {
        let url = new URL(window.location.href);
        let terms = url.searchParams.get('term');
    }

    getMetaTags(url) {
        return this.getDOMByURL(url).then(dom => {
            let meta = dom.getElementsByTagName('meta');
            return meta;
        }).catch(err => {
            console.error(err);
        });
    }

    getTitleTags(url) {
        return this.getDOMByURL(url).then(dom => {
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

                this.getTitleTags(url).then(titles => {
                    let title = titles[0].innerText;

                    //Get description and keywords from site.
                    this.getMetaTags(url).then(tags => {
                        let description = [...tags].filter(tag => (tag.attributes["name"] && tag.attributes["name"].nodeValue === 'description'));
                        description = description && description[0] ? description[0].content : null;
                        let keyword = [...tags].filter(tag => (tag.attributes["name"] && tag.attributes["name"].nodeValue === 'keywords'));
                        keyword = keyword && keyword[0] ? keyword[0].content.split(',').map(key => key.trim()).join(',') : null;

                        this.insertLinks(url, title, description, keyword);
                    });
                });
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
            if (link.href.startsWith(window.origin, 0)) {
                link.href = link.href.replace(window.origin.concat('/'), originalUrl);
            }

            return link;
        });
    }

    insertLinks(url, title, description, keywords) {
        let newData = { url, title, description, keywords };

        //Verify if the url already exist on db.
        RequestUtil.post(`${apiUrlSite.concat('/siteByUrl')}`, { url }).then(response => {
            if (JSON.parse(response).length === 0) {
                RequestUtil.post(apiUrlSite, newData).then(data => {
                    console.log('Success');
                }).catch(err => {
                    console.error(err);
                });
            }
        });
    }

    insertImages(siteUrl, imageUrl, alt, title) {
        let newData = { siteUrl, imageUrl, alt, title };

        //Verify if the imageUrl already exist on db.
        RequestUtil.post(`${apiUrlImage.concat('/imageByUrl')}`, { imageUrl }).then(response => {
            if (JSON.parse(response).length === 0) {
                RequestUtil.post(apiUrlImage, newData).then(data => {
                    console.log('Success');
                }).catch(err => {
                    console.error(err);
                });
            }
        });
    }
}
