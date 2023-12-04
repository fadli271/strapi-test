const jamstack = require("../.scripts/starters/jamstack.js");
module.exports = {
  jamstackScraped: {
    task: async ({ strapi }) => {
      jamstack.main();
    },
    options: {
      // Every minute
      rule: "* * * * *",
    },
  },
};
