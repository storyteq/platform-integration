import { BaseFrameController } from './BaseFrameController';

export interface ICreateMediaConfig {
  assetManagerScope?: Array<unknown>; // Scope the asset selection to a set of asset providers
  publish?: Array<{ type: string }>; // Upon rendering completion, publish to this channel
}
export class CreateMediaPage extends BaseFrameController<['loaded', 'created']> {
  constructor(spawnElement: string, STauthToken: string, templateId: number, config: ICreateMediaConfig = {}) {
    const page = `/content/templates/${templateId}/media/create`;

    super(spawnElement, STauthToken, page, JSON.stringify(config), ['loaded', 'created']);
  }
}
