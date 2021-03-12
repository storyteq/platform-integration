import BaseFrameController from './BaseFrameController';

class CrmAnalyticsPage extends BaseFrameController {
  constructor(spawnElement, STauthToken, templateId, campaignId, config) {
    const page = `/campaigns/${campaignId}/templates/${templateId}`;
    super(spawnElement, STauthToken, page, JSON.stringify(config));
    this.availableEvents = [
      'loaded',
    ];
  }
}

export default CrmAnalyticsPage;