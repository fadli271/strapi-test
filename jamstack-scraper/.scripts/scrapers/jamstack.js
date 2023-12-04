"use strict";

import { red } from "chalk";
import puppeteer from "puppeteer";
import { getReport, getDate, getAllSG, scraperCanRun } from "./utils/utils.js";

let report = {};
let errors = [];
let newSG = 0;

const scrape = async () => {
  console.log("Scrape function");
};

const main = async () => {
  // Fetch the correct scraper thanks to the slug
  const slug = "jamstack-org";
  const scraper = await strapi.query("scraper").findOne({
    slug: slug,
  });

  // If the scraper doesn't exists, is disabled or doesn't have a frequency then we do nothing
  if (scraper == null || !scraper.enabled || !scraper.frequency) {
    console.log(
      `${red(
        "Exit"
      )}: (Your scraper may does not exist, is not activated or does not have a frequency field filled in)`
    );
    return;
  }

  const canRun = await scraperCanRun(scraper);
  if (canRun && scraper.enabled) {
    const allSG = await getAllSG(scraper);
    await scrape(allSG, scraper);
    report = await getReport(newSG);
  }
};

const _main = main;
export { _main as main };
