# Search Engine

[![Build Status](https://travis-ci.com/gabriel-hahn/search-engine.svg?branch=master)](https://travis-ci.com/gabriel-hahn/search-engine) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/80f665bfc0664f19934fd96a275732f7)](https://www.codacy.com/app/gabriel_hahn/search-engine?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gabriel-hahn/search-engine&amp;utm_campaign=Badge_Grade) [![BCH compliance](https://bettercodehub.com/edge/badge/gabriel-hahn/search-engine?branch=master)](https://bettercodehub.com/) [![Coverage Status](https://coveralls.io/repos/github/gabriel-hahn/search-engine/badge.svg?branch=master)](https://coveralls.io/github/gabriel-hahn/search-engine?branch=master) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/gabriel-hahn/search-engine/pulls) [![Bugs](https://img.shields.io/github/issues/gabriel-hahn/search-engine/bug.svg)](https://github.com/gabriel-hahn/search-engine/issues?utf8=?&q=is%3Aissue+is%3Aopen+label%3Abug) [![The MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://opensource.org/licenses/MIT)

A search engine API + Crawling Websites (NodeJS + MongoDB) :mag_right:

## Getting Started

To run this project, you must have installed:

NodeJS (10.13.0 or grather).

MongoDB.

1 - Inside the projects folder, run the follow command to install all NPM dependencies:

```
npm i
```

2 - Create a database to project in MongoDB.

3 - Start MongoDB and change the config/mongodb.js file to right database and url connection as you created before.

4 - Start the project (local host at 9090):

```
npm run start
```

To crawling sites, you need to make a POST request to 'api/start' endpoint.

To include more sites to crawling, you can change the 'this._linksToCraw' property inside services/LinksService.js file.

## Tests
To run the tests, you can choose between with or without coverage:

```
npm run test
```

```
npm run test:coverage
```

## Demo
Project [Search Engine App](https://github.com/gabriel-hahn/search-engine-app) has GIF demo of the project running with a Front-end project that is similar Google.

## Something in the future?

- [ ] Deploy a demo of this project.
- [ ] Swagger documentation.
- [ ] +95% of unit tests coverage.
- [ ] Include more sites to crawling through a web page.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/search-engine/tags).

## Authors

[Gabriel Hahn Schaeffer](https://github.com/gabriel-hahn/)

See also the list of [contributors](https://github.com/gabriel-hahn/search-engine/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
