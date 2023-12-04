// utils.js
const { parseExpression } = require("cron-parser");
const { blue } = require("chalk");

const scraperCanRun = async (scraper) => {
  const frequency = parseExpression(scraper.frequency);
  const current_date = new Date().getTime() / 1000;
  let next_execution_at = 0;

  if (scraper.next_execution_at) {
    next_execution_at = scraper.next_execution_at;
  } else {
    next_execution_at = frequency.next().getTime() / 1000;
    await strapi.db.query("api::scraper.scraper").update({
      where: { id: scraper.id },
      data: {
        next_execution_at: next_execution_at,
      },
    });
  }

  if (next_execution_at <= current_date) {
    await strapi.db.query("api::scraper.scraper").update({
      where: { id: scraper.id },
      data: {
        next_execution_at: frequency.next().getTime() / 1000,
      },
    });
    return true;
  }
  return false;
};

const getAllSG = async (scraper) => {
  const existingSG = await strapi.db
    .query("api::site-generator.site-generator")
    .findMany({
      select: ["name"],
      populate: { scraper: true },
      limit: 1000,
    });
  const allSG = existingSG.map((x) => x.name);
  console.log(`Site generators in database: \t${blue(allSG.length)}`);

  return allSG;
};

const getDate = async () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return date + " " + time;
};

const getReport = async (newSG) => {
  return { newSG: newSG, date: await getDate() };
};

module.exports = { scraperCanRun, getAllSG, getDate, getReport };
