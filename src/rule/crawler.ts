import axios, { type AxiosStatic } from "axios";
import { load } from "js-yaml";
import { readFileSync } from "fs";
import cheerio from "cheerio";
import { join } from "path";

type ProductName = string;

type CrawlerConfig = {
  excludes?: string[];
  exchanges?: ExchangeName[];
  addAzurePrefix?: string[];
};

type ExchangeName = {
  from: string;
  to: string;
};

export async function scrapeAzureProducts(
  url: string,
  axiosInstance: AxiosStatic = axios,
  cheerioInstance: typeof cheerio = cheerio,
): Promise<ProductName[]> {
  const response = await axiosInstance.get(url);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const $ = cheerioInstance.load(response.data);
  const products: ProductName[] = [];

  const config = await readCrawlerConfig();

  $("*[data-bi-ecn]").each((_, element) => {
    let name = $(element).text().replace("ᴾᴿᴱⱽᴵᴱᵂ", "").trim();

    if (name === "Learn more") return;

    if (excludeProduct(name, config)) return;

    name = exchangeProductName(name, config);

    name = addAzurePrefix(name, config);

    // Check if the product already exists in the array
    const isDuplicate = products.some((product) => product === name);

    // If the product does not exist in the array, add it
    if (!isDuplicate) {
      products.push(name);
    }
  });

  return products.sort();
}

async function readCrawlerConfig(): Promise<CrawlerConfig> {
  const config = readFileSync(
    join(__dirname, "./../../", "crawler-config.yml"),
    "utf-8",
  );
  return load(config) as CrawlerConfig;
}

function excludeProduct(product: string, config: CrawlerConfig): boolean {
  const excludes = config.excludes ?? [];
  return excludes.some((exclude) => product.includes(exclude));
}

function exchangeProductName(product: string, config: CrawlerConfig): string {
  const exchanges = config.exchanges ?? [];
  exchanges.forEach((exchange) => {
    if (product !== exchange.from) return;
    product = product.replace(exchange.from, exchange.to);
  });
  return product;
}

function addAzurePrefix(product: string, config: CrawlerConfig): string {
  const addAzurePrefix = config.addAzurePrefix ?? [];

  addAzurePrefix.forEach((prefix) => {
    if (product.includes(prefix)) {
      product = `Azure ${product}`;
    }
  });
  return product;
}
