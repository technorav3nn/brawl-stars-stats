/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable no-param-reassign */
/* eslint-disable no-empty */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * Copyright (c) 2018 - 2023 Brawl Time Ninja
 * Not licensed
 */

// @ts-check
const wtf = require("wtf_wikipedia");
// @ts-ignore
wtf.extend(require("wtf-plugin-api"));
const jsdom = require("jsdom");

const { JSDOM } = jsdom;
const fs = require("fs");
const stringSimilarity = require("string-similarity");
const Axios = require("axios");
const { promisify } = require("util");
const stream = require("stream");

const finished = promisify(stream.finished);
const { dirname } = require("path");

const DOMAIN = "brawlstars.fandom.com";
const OUT_DIR = "./public/data";
const BRAWLERS_DIR = "/brawlers/";
const GADGETS_DIR = "/gadgets/";
const STARPOWERS_DIR = "/starpowers/";

function printProgress(curPercentage: number, size: number, step: string) {
	const dots = ".".repeat(Math.round(curPercentage * size));
	const left = size - Math.round(curPercentage * size);
	const empty = " ".repeat(left);
	console.log(`[${dots}${empty}] ${Math.round(curPercentage * 100)}% - ${step}`);
}

function encodePath(path: string) {
	return encodeURIComponent(path).replaceAll("%2F", "/");
}

async function main() {
	const brawlerPages = await wtf.getCategoryPages("Category:Brawlers", {
		domain: DOMAIN,
		path: "api.php",
	});
	console.log(brawlerPages);
	const brawlerNames = brawlerPages.map((brawlerPage: { title: any }) => brawlerPage.title);

	// get ids of starpowers and gadgets
	const brawltimeNinjaStarpowerJSONFull = await fetch(
		"https://cube.brawltime.ninja/cubejs-api/v1/load?query=%7B%22measures%22%3A%5B%22battle.starpowerName_measure%22%5D%2C%22dimensions%22%3A%5B%22battle.brawler_dimension%22%2C%22battle.starpower_dimension%22%5D%2C%22filters%22%3A%5B%7B%22member%22%3A%22battle.season_dimension%22%2C%22operator%22%3A%22afterDate%22%2C%22values%22%3A%5B%222023-01-01%22%5D%7D%2C%7B%22member%22%3A%22battle.starpower_dimension%22%2C%22operator%22%3A%22notEquals%22%2C%22values%22%3A%5B%220%22%5D%7D%5D%7D&queryType=multi"
	).then((response) => response.json());
	const brawltimeNinjaGadgetJSONFull = await fetch(
		"https://cube.brawltime.ninja/cubejs-api/v1/load?query=%7B%22measures%22%3A%5B%22battle.gadgetName_measure%22%5D%2C%22dimensions%22%3A%5B%22battle.brawler_dimension%22%2C%22battle.gadget_dimension%22%5D%2C%22filters%22%3A%5B%7B%22member%22%3A%22battle.season_dimension%22%2C%22operator%22%3A%22afterDate%22%2C%22values%22%3A%5B%222023-01-01%22%5D%7D%2C%7B%22member%22%3A%22battle.gadget_dimension%22%2C%22operator%22%3A%22notEquals%22%2C%22values%22%3A%5B%220%22%5D%7D%5D%7D&queryType=multi"
	).then((response) => response.json());

	const brawltimeNinjaStarpowerJSON = brawltimeNinjaStarpowerJSONFull.results[0].data;
	const brawltimeNinjaGadgetJSON = brawltimeNinjaGadgetJSONFull.results[0].data;

	const starpowerNameToIdDict: Record<string, any> = {};
	for (const starPowerJSON of brawltimeNinjaStarpowerJSON) {
		starpowerNameToIdDict[starPowerJSON["battle.starpowerName_measure"]] =
			starPowerJSON["battle.starpower_dimension"];
	}
	const gadgetNameToIdDict: Record<string, any> = {};
	for (const gadgetJSON of brawltimeNinjaGadgetJSON) {
		gadgetNameToIdDict[gadgetJSON["battle.gadgetName_measure"]] = gadgetJSON["battle.gadget_dimension"];
	}

	function getIdFromStarpowerName(name: string) {
		name = name.toUpperCase();
		const starpowerKeys = Object.keys(starpowerNameToIdDict);
		const matches = stringSimilarity.findBestMatch(name, starpowerKeys);
		const bestMatch = matches.bestMatch.target;
		return starpowerNameToIdDict[bestMatch];
	}
	function getIdFromGadgetName(name: string) {
		name = name.toUpperCase();
		const gadgetKeys = Object.keys(gadgetNameToIdDict);
		const matches = stringSimilarity.findBestMatch(name, gadgetKeys);
		const bestMatch = matches.bestMatch.target;
		return gadgetNameToIdDict[bestMatch];
	}

	const downloadQueue: { link: any; path: any }[] = [];

	async function downloadFileToLocation(link: any, path: string) {
		path = OUT_DIR + path;

		const parentFolder = dirname(path);
		await fs.promises.mkdir(parentFolder, { recursive: true });

		let actualSize = 0;
		try {
			const fileMetadata = await fs.promises.stat(path);
			actualSize = fileMetadata.size;
		} catch (err) {}

		if (actualSize > 0) {
			const httpMetadata = await Axios({
				method: "head",
				url: link,
			});
			const expectedSize = parseInt(httpMetadata.headers["content-length"], 10);

			if (actualSize == expectedSize) {
				// already downloaded
				return;
			}
		}
		console.log("downloading", path);

		const writer = fs.createWriteStream(path);
		return Axios({
			method: "get",
			url: link,
			responseType: "stream",
		}).then((response: { data: { pipe: (arg0: any) => void } }) => {
			// https://stackoverflow.com/a/61269447
			response.data.pipe(writer);
			return finished(writer);
		});
	}

	// iterate over all brawlers and scrape information
	let progress = 0;
	console.log(`Downloading Brawler information for ${brawlerNames.length} brawlers`);
	for (const brawlerName of brawlerNames) {
		let brawlerObj;
		try {
			brawlerObj = await getBrawlerData(brawlerName);
		} catch (err) {
			console.error(`Cannot scrape ${brawlerName}`, err);
		}
		if (brawlerObj == undefined) {
			continue;
		}

		await fs.promises.mkdir(OUT_DIR + brawlerObj.directory, {
			recursive: true,
		});
		await fs.promises.writeFile(`${OUT_DIR + brawlerObj.directory}data.json`, JSON.stringify(brawlerObj));

		printProgress(++progress / brawlerNames.length, 20, brawlerName);
	}

	// download all assets
	progress = 0;
	for (const { link, path } of downloadQueue) {
		if (link == undefined) {
			console.error(`Invalid link for path ${path}`);
			continue;
		}

		await downloadFileToLocation(link, path);

		printProgress(++progress / downloadQueue.length, 20, "");
	}

	function getFirstParagraphFromSectionJson(sectionJson: {
		paragraphs: { sentences: { text: string | any[] }[] }[];
	}) {
		try {
			return sectionJson.paragraphs[0].sentences[0].text.slice(1, -1);
		} catch {}
	}

	function getVoiceLineURLFromName(links: any[], voiceLineName: string) {
		return links.find((link: string) => link.toLowerCase().includes(voiceLineName.toLowerCase()));
	}

	function getSkinURLFromName(links: any[], skinType: string, skinName: string) {
		const skinFileName = skinName.replaceAll(" ", "_");
		const brawlerFileName = skinType.replaceAll(" ", "_");
		return links.find((link: string | any[]) => link.includes(brawlerFileName) && link.includes(skinFileName));
	}

	function getAccessoryURLFromIndex(links: any[], kind: string, brawlerName: string, index: number) {
		const short = kind == "gadgets" ? "gd" : "sp";
		return links.find((link: string) =>
			link.toLowerCase().includes(`${short}-${brawlerName.toLowerCase()}${index + 1}`)
		);
	}

	function getAllLinksFromDoc(brawlerDoc: { getElementsByTagName: (arg0: string) => any }) {
		const links = [];
		const attributes = ["src", "href", "data-src"];
		const allElements = brawlerDoc.getElementsByTagName("*");
		for (const element of allElements) {
			for (const attribute of attributes) {
				const attributeValue = element.getAttribute(attribute);
				if (attributeValue && attributeValue.includes("https")) {
					const link = attributeValue.replaceAll(/scale-to-.*?(?=\?)/g, "");
					links.push(link);
				}
			}
		}
		return links;
	}

	function getVoiceLinesFromSection(
		voiceLineSectionJson: { templates: never[] },
		brawlerDocLinks: any[],
		brawlerVoicelineDirectory: string
	) {
		const voiceLineElements = voiceLineSectionJson.templates ?? [];
		return voiceLineElements
			.filter((ve: { filename: undefined }) => ve.filename != undefined)
			.map((voiceLineElement: { filename: string; filedescription: any }) => {
				const voiceLineFileName = voiceLineElement.filename.replaceAll(" ", "_");
				const voiceLineLink = getVoiceLineURLFromName(brawlerDocLinks, voiceLineFileName);
				const voiceLineName = voiceLineElement.filename;
				const path = brawlerVoicelineDirectory + voiceLineName;

				downloadQueue.push({ link: voiceLineLink, path });

				return {
					name: voiceLineName,
					description: voiceLineElement.filedescription,
					path: encodePath(path),
				};
			});
	}

	async function getBrawlerData(brawlerName: string) {
		const wtfBrawler = await wtf.fetch(brawlerName, { domain: DOMAIN });
		// EN
		const brawlerUrl = wtfBrawler.url().replace("//en.", "//");
		const brawlerHtml = await fetch(brawlerUrl).then((response) => response.text());
		const brawlerDoc = new JSDOM(brawlerHtml).window.document;
		const brawlerDocLinks = getAllLinksFromDoc(brawlerDoc);

		const brawlerId = brawlerName.replace(/\.| /g, "_").toLowerCase();
		const brawlerDirectory = `${BRAWLERS_DIR + brawlerId}/`;
		const brawlerVoicelineDirectory = `${brawlerDirectory}voice-lines/`;
		// const brawlerPinDirectory = `${brawlerDirectory}pins/`;
		const brawlerDescription = getFirstParagraphFromSectionJson(wtfBrawler.sections()[0].json());

		const brawler = {
			id: brawlerId,
			url: brawlerUrl,
			name: brawlerName,
			directory: brawlerDirectory,
			description: brawlerDescription,
			stats: {},
			gadgets: [],
			starpowers: [],
			tips: [],
			voicelines: [],
			history: [],
			skins: [],
			healthByLevel: [],
		};

		// assign section ids
		let attackSectionID;
		let superSectionID;
		let gadgetSectionID;
		let starPowerSectionID;
		let tipSectionID;
		let voiceLineSectionID;
		let historySectionID;
		let skinSectionID;
		let lastSectionID;

		for (let i = 0; i < wtfBrawler.sections().length; i++) {
			const section = wtfBrawler.sections()[i];
			const { title } = section.json();
			if (title.includes("Attack")) {
				attackSectionID = i;
			}
			if (title.includes("Super")) {
				superSectionID = i;
			}
			if (title.includes("Gadget")) {
				gadgetSectionID = i;
			}
			if (title.includes("Star Powers")) {
				starPowerSectionID = i;
			}
			if (title.includes("Tips")) {
				tipSectionID = i;
			}
			if (title.includes("Voice Lines")) {
				voiceLineSectionID = i;
			}
			if (title.includes("History")) {
				historySectionID = i;
			}
			if (title.includes("Skins")) {
				skinSectionID = i;
			}
		}
		lastSectionID = wtfBrawler.sections().length - 1;

		if (wtfBrawler.sections()[0].json().infoboxes == undefined) {
			return;
		}

		// stats
		const stats = wtfBrawler.sections()[0].json().infoboxes[0];

		// TODO: gadgetcharges missing
		const brawlerStatKeys = ["rarity", "class", "movementspeed", "voiceactor"];
		const brawlerAttackStatKeys = [
			"attackrange",
			"reload",
			"attackbullets",
			"attacksupercharge",
			"attackspread",
			"attackspeed",
			"attackwidth",
			"attackcooldown",
		];
		const brawlerSuperStatKeys = [
			"superrange",
			"superbullets",
			"supersupercharge",
			"superspread",
			"superspeed",
			"superwidth",
			"superminionrange",
			"superminion",
			"supermovementspeed",
			"superduration",
			"superreload",
		];
		const brawlerHealthKey = "health";
		const brawlerAttackKey = "attack";
		const brawlerSuperKey = "super";

		for (const key in stats) {
			stats[key] = stats[key].text.replace(/\s(\d)/g, ", $1");
		}
		const brawlerStats: Record<string, any> = {};
		brawlerStatKeys.forEach((key) => {
			brawlerStats[key] = stats[key];
		});
		const brawlerAttackStats: Record<string, any> = {};
		brawlerAttackStatKeys.forEach((key) => {
			brawlerAttackStats[key] = stats[key];
		});
		const brawlerSuperStats: Record<string, any> = {};
		brawlerSuperStatKeys.forEach((key) => {
			brawlerSuperStats[key] = stats[key];
		});

		brawler.stats = brawlerStats;

		function generateStatsPerLevelList(base: string | number) {
			base = parseInt(base as string, 10);
			const statsPerLevel = [];
			for (let level = 0; level < 11; level++) {
				statsPerLevel.push(base + level * (base / 20));
			}
			return statsPerLevel;
		}

		//@ts-ignore
		brawler.healthByLevel = generateStatsPerLevelList(stats[brawlerHealthKey]);

		function getStatsByLevelWithKey(stats: { [x: string]: any }, statName: string) {
			function getIndexString(index: number) {
				return index == 1 ? "" : index.toString();
			}

			const statsByLevel = [];
			let i = 1;
			while (statName + getIndexString(i) in stats) {
				statsByLevel.push({
					name: stats[`${statName}label${getIndexString(i)}`],
					list: generateStatsPerLevelList(stats[statName + getIndexString(i)]),
				});
				i++;
			}
			return statsByLevel;
		}

		// attack
		//@ts-ignore
		const attackSection = wtfBrawler.sections()[attackSectionID].json();
		//@ts-ignore
		brawler.attack = {
			name: attackSection.title.replace("Attack: ", ""),
			description: getFirstParagraphFromSectionJson(attackSection),
			stats: brawlerAttackStats,
			statsByLevel: getStatsByLevelWithKey(stats, brawlerAttackKey),
		};

		// super
		const superSection = wtfBrawler.sections()[superSectionID as number].json();
		//@ts-ignore
		brawler.super = {
			name: superSection.title.replace("Super: ", ""),
			description: getFirstParagraphFromSectionJson(superSection),
			stats: brawlerSuperStats,
			statsByLevel: getStatsByLevelWithKey(stats, brawlerSuperKey),
		};

		// gadgets
		let gadgetCounter = 0;
		// @ts-ignore
		for (let i = gadgetSectionID; i < starPowerSectionID; i++) {
			// @ts-ignore
			const gadgetSection = wtfBrawler.sections()[i].json();
			const name = gadgetSection.title;

			if (name == "Gadgets") {
				// pages with only 1 gadget have the gadget section at top level,
				// pages with 2 have 1 section with 2 child sections
				// if the section title is 'Gadgets', this is the parent section - skip it
				continue;
			}

			const id = getIdFromGadgetName(name);
			const description = getFirstParagraphFromSectionJson(gadgetSection);
			const link = getAccessoryURLFromIndex(brawlerDocLinks, "gadgets", brawler.name, gadgetCounter);
			const path = `${GADGETS_DIR + id}.png`;
			//@ts-ignore
			brawler.gadgets.push({
				name,
				description,
				id,
				path: encodePath(path),
			});

			downloadQueue.push({ link, path });

			gadgetCounter++;
		}

		// star powers
		let starpowerCounter = 0;
		// @ts-ignore
		for (let i = starPowerSectionID; i < tipSectionID; i++) {
			// @ts-ignore
			const starPowerSection = wtfBrawler.sections()[i].json();
			const name = starPowerSection.title;
			if (name == "Star Powers") {
				// pages with only 1 star power have the star power section at top level,
				// pages with 2 have 1 section with 2 child sections
				// if the section title is 'Star Powers', this is the parent section - skip it
				continue;
			}

			const description = getFirstParagraphFromSectionJson(starPowerSection);
			const id = getIdFromStarpowerName(name);
			const link = getAccessoryURLFromIndex(brawlerDocLinks, "starpowers", brawler.name, starpowerCounter);
			const path = `${STARPOWERS_DIR + id}.png`;
			//@ts-ignore
			brawler.starpowers.push({
				name,
				description,
				id,
				path: encodePath(path),
			});

			downloadQueue.push({ link, path });

			starpowerCounter++;
		}

		// tips
		// @ts-ignore

		const tipsSection = wtfBrawler.sections()[tipSectionID].json();
		const tipsElements = tipsSection.lists != undefined ? tipsSection.lists[0] : [];
		brawler.tips = tipsElements.map((tipElement: { text: any }) => tipElement.text);

		// voice lines
		// @ts-ignore
		if (voiceLineSectionID) {
			const voiceLineSection = wtfBrawler.sections()[voiceLineSectionID].json();
			// @ts-ignore
			brawler.voicelines = getVoiceLinesFromSection(voiceLineSection, brawlerDocLinks, brawlerVoicelineDirectory);
		}

		// history (little refactoring required :])
		// @ts-ignore
		if (wtfBrawler.sections()[historySectionID] != undefined) {
			// @ts-ignore
			const historySection = wtfBrawler.sections()[historySectionID].json();
			let historyEntryDescriptionCount = 0;
			let date = -1;
			if (historySection.lists != undefined) {
				for (const historyEntryElement of historySection.lists[0]) {
					if (historyEntryElement.text.search("[0-9]+/[0-9]+/[0-9]+") != -1) {
						date = historyEntryElement.text;
					} else {
						const historyEntryDescriptions = historySection.templates;
						let historyEntryType = "";
						if (historyEntryDescriptions.length - 1 > historyEntryDescriptionCount) {
							// @ts-ignore
							historyEntryType = historyEntryDescriptions[historyEntryDescriptionCount].list[0];
						}
						// @ts-ignore
						brawler.history.push({
							date,
							description: historyEntryElement.text,
							type: historyEntryType,
						});
						historyEntryDescriptionCount += 1;
					}
				}
			}
		}

		// model / default skin
		const modelLink = getSkinURLFromName(brawlerDocLinks, brawlerName, "Default");
		const modelPath = `${brawlerDirectory}model.png`;
		downloadQueue.push({ link: modelLink, path: modelPath });

		// @ts-ignore
		brawler.model = { path: encodePath(modelPath) };

		// portrait
		const portraitLink = getSkinURLFromName(brawlerDocLinks, brawlerName, "Portrait");
		const portraitPath = `${brawlerDirectory}avatar.png`;
		downloadQueue.push({ link: portraitLink, path: portraitPath });

		// @ts-ignore
		brawler.avatar = { path: encodePath(portraitPath) };

		// output
		return brawler;
	}
}

main().catch(console.error);
