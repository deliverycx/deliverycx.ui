import Api from './AjaxCreate';

export type IAjaxparams = {
  params: {
    method: string;
    url: string;
    data?: Record<string, unknown>;
    token?: string;
  };
};

export abstract class AjaxApiSuper {
  protected readonly api = Api.getInstance();
  protected params = {};
  protected request<T>(url: string) {
    return this.api.apiAjax<T>(this.params, url);
  }
}
