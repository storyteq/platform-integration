import { BaseFrameController } from './BaseFrameController';

export class CreateMediaPage extends BaseFrameController<['loaded', 'created']> {
  constructor(spawnElement, STauthToken, templateId, config) {
    const page = `/content/templates/${templateId}/media/create`;

    super(spawnElement, STauthToken, page, JSON.stringify(config), ['loaded', 'created']);
  }
}
