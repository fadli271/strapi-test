// @ts-nocheck
'use strict';
/**
 * scraper controller
*/

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::scraper.scraper', ({ strapi }) => ({
  // wrap a core action, leaving core logic in place
  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.scraper.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.scraper });
  },
}));
