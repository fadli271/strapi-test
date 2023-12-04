'use strict';

/**
 * site-generator router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::site-generator.site-generator');
