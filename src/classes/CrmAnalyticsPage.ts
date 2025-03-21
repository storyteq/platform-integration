import { BaseFrameController } from './BaseFrameController';

export class CrmAnalyticsPage extends BaseFrameController<['loaded']> {
  constructor(spawnElement: string, STAuthToken: string | false, templateId: number, campaignId: number, config?) {
    const page = `/campaigns/${campaignId}/templates/${templateId}`;

    super(spawnElement, STAuthToken, page, JSON.stringify(config), ['loaded']);
  }
}
