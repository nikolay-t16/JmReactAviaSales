import { TicketData } from '../components/pages/IndexPage/TicketData';

class AviaSales {
  protected readonly API_PATH = 'https://front-test.beta.aviasales.ru/';

  protected readonly API_GET_SEARCH_ID_PATH = 'search';

  protected readonly API_GET_TICKETS_PATH = 'tickets';

  protected searchId: string | null = null;

  protected makeQueryString = (params: any) =>
    Object.keys(params)
      .map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

  protected async fetch(
    path: string,
    getParams: object = {},
    method: string = 'GET',
    postParams: object = {},
  ): Promise<any> {
    const queryString = this.makeQueryString(getParams);
    const apiPath = `${this.API_PATH}${path}?${queryString}`;
    const params: any = { method };
    if (method !== 'GET') {
      params.body = JSON.stringify(postParams);
      params.headers = { 'Content-Type': 'application/json;charset=utf-8' };
    }
    const response = await fetch(apiPath, params).catch(() => {
      throw new Error('connection error');
    });
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    return response.json();
  }

  protected async fetchSearchId() {
    return this.fetch(this.API_GET_SEARCH_ID_PATH).then((result) => result.searchId);
  }

  protected async initSearchId() {
    this.searchId = await this.fetchSearchId();
  }

  public async fetchTickets(): Promise<{ tickets: TicketData[]; stop: boolean }> {
    if (this.searchId === null) {
      await this.initSearchId();
    }
    return this.fetch(this.API_GET_TICKETS_PATH, { searchId: this.searchId });
  }
}

export default AviaSales;
