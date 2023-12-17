/**
 * From https://github.com/trktml/lotusforafrica/blob/main/src/utils/translationTools.ts
 */

import { getLocale } from "astro-i18n-aut";
import { DEFAULT_LOCALE, LOCALES } from "../consts";

import uk from "@/locales/uk.json";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

const handler = {
	get(target: any, prop: any, receiver: any) {
		return target[prop].replaceAll("\n", "<br/>");
	},
};

const uk_proxy = new Proxy(uk, handler);
const en_proxy = new Proxy(en, handler);
const ru_proxy = new Proxy(ru, handler);

export const defaultLocale = DEFAULT_LOCALE;
export const locales = LOCALES;

/**
 * Return the locale object with all the translations for a specific locale
 * @param astroUrl
 * @returns
 */
export default function t(astroUrl: URL): Locales {
	let locale = getLocale(astroUrl);

	switch (locale) {
		case "en":
			return en_proxy as Locales;
		case "ru":
			return ru_proxy as Locales;
		default:
			return uk_proxy as Locales;
	}
}

/**
 *
 * @param link Localize a specific path
 * @param astroUrl
 * @returns
 */
export function localizePath(link: string | URL, astroUrl: string | URL): string {
	let locale = getLocale(astroUrl);
	let localizedLink: string = "";
	if (locale && locale !== defaultLocale) {
		let localeLink = `/${getLocale(astroUrl) ?? ""}/${link}`.replaceAll("//", "/") ?? "";
		localizedLink = localeLink;
	} else {
		localizedLink = String(link);
	}

	// localizedLink add last slash
	if (!localizedLink.endsWith("/")) {
		localizedLink += "/";
	}

	return localizedLink;
}

export const prerender = true;
