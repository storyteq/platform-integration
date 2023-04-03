import { BaseFrameController } from './BaseFrameController';

export class CrmAnalyticsPage extends BaseFrameController<['loaded']> {
  constructor(spawnElement: string, STauthToken: string, templateId: number, campaignId: number, config?) {
    const page = `/campaigns/${campaignId}/templates/${templateId}`;

    super(spawnElement, STauthToken, page, JSON.stringify(config), ['loaded']);
  }
}
