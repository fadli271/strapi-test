'use strict';

module.exports = {
    routes: [
        {
            "method": "GET",
            "path": "/scrapers/:slug",
            "handler": "scraper.findOne",
            "config": {
              "policies": []
            }
        },
    ]
  }
