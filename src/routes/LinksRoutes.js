const LinksService = require("../services/LinksService");

module.exports = app => {
  app.post("/api/start", LinksService.startCrawling);
};
