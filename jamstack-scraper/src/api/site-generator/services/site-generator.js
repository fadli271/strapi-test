'use strict';

/**
 * site-generator service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::site-generator.site-generator');
