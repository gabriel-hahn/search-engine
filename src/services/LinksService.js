const ImagesService = require("./ImagesService");
const SitesService = require("./SitesService");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class LinksService {
  constructor() {
    this._alreadyCrawled = [];
    this._depth = 1;
    this._currentDom = null;
    this._currentWindow = null;

    //Social medias needs a authentication in most of time, so the project needs to ignore links that contains these words.
    this._socialNetworks = ["instagram", "facebook", "pinterest", "linkedin"];

    //Sites to crawling. I really recommend to use news sites, because their have much information and links to other sites.
    this._linksToCraw = [
      "https://www.udemy.com",
      "https://www.youtube.com",
      "https://gauchazh.clicrbs.com.br",
      "https://medium.com",
      "https://www.bbc.com/portuguese",
      "https://www.bbc.com",
      "https://www.terra.com.br",
      "https://www.globo.com"
    ];

    //Bind methods.
    this.setCurrentDomObject = this.setCurrentDomObject.bind(this);
    this.startCrawling = this.startCrawling.bind(this);
    this.getMetaTags = this.getMetaTags.bind(this);
    this.getTitleTags = this.getTitleTags.bind(this);
    this.getImagesTags = this.getImagesTags.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.getKeywordByTag = this.getKeywordByTag.bind(this);
    this.getDescriptionByTag = this.getDescriptionByTag.bind(this);
    this.getDOMByURL = this.getDOMByURL.bind(this);
    this.getNotSocialNetworkUrl = this.getNotSocialNetworkUrl.bind(this);
    this.fixUrlsWithRoutes = this.fixUrlsWithRoutes.bind(this);
    this.verifyLinks = this.verifyLinks.bind(this);
    this.verifyImages = this.verifyImages.bind(this);
  }

  /**
   * Set a new current DOM to be use.
   *
   * @param {DOM Object} dom
   */
  setCurrentDomObject(dom) {
    this._currentDom = dom;
  }

  /**
   * Website that will be crawled.
   */
  async startCrawling(req, res) {
    this._linksToCraw.forEach(link => this.getLinks(link, link, 0));
    res.send("All sites included successfully");
  }

  /**
   * Get Meta tags from current DOM object.
   */
  getMetaTags() {
    return this._currentDom.getElementsByTagName("meta");
  }

  /**
   * Get Title tags from current DOM object.
   */
  getTitleTags() {
    return this._currentDom
      .getElementsByTagName("head")[0]
      .getElementsByTagName("title");
  }

  /**
   * Get Image tags from current DOM object.
   */
  getImagesTags() {
    return [...this._currentDom.getElementsByTagName("img")];
  }

  /**
   * Get the links from href attributes throuth a URL.
   * In this file, I used async/await only to make the code more easier to read.
   * The performance isn't a critical field in this moment, because this file will be run once to each site that I'd crawling. POST functions are using asynchronous methods to best performance :)
   *
   * @param {URL that will be crawled} url
   * @param {Current host (domain)} host
   * @param {Current depth of crawling} currentDepth
   */
  async getLinks(url, host, currentDepth) {
    //Verify if the href already exists in crawled list and add it.
    if (!this._alreadyCrawled.includes(url)) {
      //DOM from the page.
      let dom = await this.getDOMByURL(url);
      this.setCurrentDomObject(dom);

      this._alreadyCrawled.push(url);

      //Get title from the page
      let titles = this.getTitleTags();
      let title = titles[0] ? titles[0].innerHTML : "";

      //Get description and keywords from site.
      let tags = this.getMetaTags();

      //If description and keyword tags don't exist, the url will be insert too, but it's more harder to appear when the user will use the project and search a site.
      let description = this.getDescriptionByTag(tags);
      let keyword = this.getKeywordByTag(tags);

      //After insert the site in DB, do the same things with 'children' urls.
      this.verifyLinks(url, title, description, keyword);

      //Get images from website
      let images = this.getImagesTags();
      images.forEach(image => {
        if (image.dataset && image.dataset.src) {
          this.verifyImages(url, image.dataset.src, image.alt, image.title);
        }
      });

      //Get links from the page.
      let links = [...this._currentDom.getElementsByTagName("a")].filter(
        element => element.href.startsWith("http", 0)
      );
      let linksFixed = this.fixUrlsWithRoutes(links, host);

      //Get the child links that will be crawling.
      let childLinksToSearch = linksFixed.filter(link => link.href !== url);

      //To control the depth of links inside a webpage, the count of layers that crawling method will search inside each URL.
      currentDepth++;

      if (currentDepth <= this._depth) {
        childLinksToSearch.forEach(link => {
          if (
            !this._alreadyCrawled.includes(link.href) &&
            !link.href.startsWith("http://localhost:8080") &&
            this.getNotSocialNetworkUrl(link.href)
          ) {
            this.getLinks(link.href, link.host, currentDepth);
          }
        });
      }
    }
  }

  /**
   * Return keyword found by tags.
   *
   * @param {Tags from DOM object} tags
   */
  getKeywordByTag(tags) {
    if (tags.length > 0) {
      var keyword = [...tags].filter(
        tag =>
          tag.attributes["name"] &&
          tag.attributes["name"].nodeValue === "keywords"
      );
      return keyword && keyword[0]
        ? keyword[0].content
            .split(",")
            .map(key => key.trim())
            .join(",")
        : "";
    }
  }

  /**
   * Return description found by tags.
   *
   * @param {Tags from DOM object} tags
   */
  getDescriptionByTag(tags) {
    if (tags.length > 0) {
      var description = [...tags].filter(
        tag =>
          tag.attributes["name"] &&
          tag.attributes["name"].nodeValue === "description"
      );
      return description && description[0] ? description[0].content : "";
    }
  }

  /**
   * Get DOM object from a URL.
   *
   * @param {URL that I want to get DOM object} url
   */
  async getDOMByURL(url) {
    return await JSDOM.fromURL(url).then(dom => {
      this._currentWindow = dom.window;
      return dom.window.document;
    });
  }

  /**
   * Return if in the url exists a name from a social network, that probably will throw a error because the crawling method doesn't have a authentication for it.
   *
   * @param {URL of a site that probably will be crawled} href
   */
  getNotSocialNetworkUrl(href) {
    return (
      this._socialNetworks.filter(socialName => href.indexOf(socialName) > -1)
        .length === 0
    );
  }

  /**
   * Fix links that contains routes, like /about. For this case, needs to put the correct base URL.
   *
   * @param {Links to be fixed} links
   * @param {Current host} host
   */
  fixUrlsWithRoutes(links, host) {
    return links.map(link => {
      if (link.href.startsWith(this._currentWindow.location.href)) {
        link.href = link.href.replace(this._currentWindow.location.href, host);
      } else if (link.href.startsWith(this._currentWindow.origin, 0)) {
        link.href = link.href.replace(this._currentWindow.origin, host);
      }

      return link;
    });
  }

  /**
   * Verify if the URL already exists in database.
   *
   * @param {Site of URL} url
   * @param {Title of site} title
   * @param {Description of site} description
   * @param {Keywords of site} keywords
   */
  async verifyLinks(url, title, description, keywords) {
    let newData = { url, title, description, keywords };

    let siteExists = await SitesService.findByUrl(url);
    if (siteExists == "") {
      SitesService.createSite(newData);
      console.log("Site added");
    }
  }

  /**
   * Verify if the image already exists in database.
   *
   * @param {Site that contains the url image} siteUrl
   * @param {Image URL} imageUrl
   * @param {Alt of the image} alt
   * @param {Title of the image} title
   */
  async verifyImages(siteUrl, imageUrl, alt, title) {
    let newData = { siteUrl, imageUrl, alt, title };

    let imageExists = await ImagesService.findByUrl(imageUrl);
    if (imageExists == "") {
      ImagesService.createImage(newData);
      console.log("Image added");
    }
  }
}

module.exports = new LinksService();
