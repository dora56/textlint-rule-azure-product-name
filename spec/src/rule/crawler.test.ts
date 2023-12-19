import { scrapeAzureProducts } from '../../../src/rule/crawler';
import axios, { type AxiosStatic } from 'axios';
import cheerio from 'cheerio';

describe('scrapeAzureProducts call method', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  it('scrapeAzureProducts', async () => {
    // htmlのダミーデータ
    const html = `
        <html>
            <body>
                <div data-bi-ecn="tarosuke">tarosuke</div>
                <div data-bi-ecn="momo">momo</div>
            </body>
        </html>
        `;

    jest.mock('axios');
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get = jest.fn().mockResolvedValue({ data: html });

    const cheerioSpy = jest.spyOn(cheerio, 'load');

    const url = 'https://example.com';
    const products = await scrapeAzureProducts(url, mockedAxios, cheerio);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(axios.get).toHaveBeenCalledWith(url);
    expect(cheerioSpy).toHaveBeenCalled();
    expect(products).toBeInstanceOf(Array);
  });

  it('scrapeAzureProducts with config', async () => {
    // htmlのダミーデータ
    const html = `
        <html>
            <body>
                <div data-bi-ecn="App Center">App Center</div>
                <div data-bi-ecn="App Center">App Center</div>
                <div data-bi-ecn="Content Delivery Network">Content Delivery Network</div>
                <div data-bi-ecn="SDKs">SDKs</div>
                <div data-bi-ecn="Azure Functions">Azure Functions</div>
                <div data-bi-ecn="HDInsight">HDInsight</div>
                <div data-bi-ecn="Learn more">Learn more</div>
            </body>
        </html>
        `;

    jest.mock('axios');
    const mockedAxios = axios as jest.Mocked<AxiosStatic>;
    mockedAxios.get = jest.fn().mockResolvedValue({ data: html });

    const url = 'https://example.com';
    const products = await scrapeAzureProducts(url, mockedAxios);

    const expectedProducts = [
      'Azure CDN',
      'Azure Functions',
      'Azure HDInsight',
      'Visual Studio App Center',
    ];

    expect(expectedProducts).toEqual(products);
  });
});
