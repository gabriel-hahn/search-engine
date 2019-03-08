require("babel-polyfill");
const ImagesService = require("../services/ImagesService");

module.exports = {
  async getImageByUrl(req, res) {
    let image = await ImagesService.findByUrl(req.body.imageUrl);
    res.json(image);
  },
  async getCountByTerm(req, res) {
    let countImages = await ImagesService.getCountByTerm(req.params.term);
    res.json(countImages);
  },
  async getByTerm(req, res) {
    let images = await ImagesService.getByTerm(req.params.term);
    res.json(images);
  },
  async increaseClicks(req, res) {
    let image = await ImagesService.increaseClicks(req.body.id);
    res.json(image);
  }
};
