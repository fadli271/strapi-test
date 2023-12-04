'use strict';

/**
 * site-generator controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::site-generator.site-generator');
