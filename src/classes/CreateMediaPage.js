import BaseFrameController from './BaseFrameController';

class CreateMediaPage extends BaseFrameController{
  constructor(spawnElement, STauthToken, templateId, config) {
    const page = `/content/templates/${templateId}/media/create`;
    super(spawnElement, STauthToken, page, JSON.stringify(config));
    this.availableEvents = [
      'loaded',
      'created',
    ];
  }
}

export default CreateMediaPage;