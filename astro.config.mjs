import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import { DEFAULT_LOCALE, LOCALES, SITE_URL } from "./src/consts";
import sveltiaCms from "astro-sveltia-cms";
import yaml from '@rollup/plugin-yaml';
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import sveltiaCms from "astro-sveltia-cms";
const defaultLocale = DEFAULT_LOCALE;
const locales = LOCALES;

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
  vite: {
    plugins: [yaml()]
  },
	output: "server",
	trailingSlash: "always",
	build: {
		format: "directory",
	},
	vite: {
		logLevel: "error",
		define: {
			__DATE__: `'${new Date()}'`,
		},
	},
	integrations: [
		mdx(),
		sitemap({
			i18n: {
				locales,
				defaultLocale,
			},
			filter: filterSitemapByDefaultLocale({
				defaultLocale,
			}),
		}),
		tailwind({
			applyBaseStyles: false,
		}),
		alpinejs(),
		i18n({
			locales,
			defaultLocale,
			exclude: ["pages/api/**/*", "pages/rss.xml.ts", "pages/[locale]/rss.xml.ts"],
		}),
		react(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
				debug: false,
			},
		}),
		sveltiaCms(),
	],
	adapter: cloudflare(),
});
