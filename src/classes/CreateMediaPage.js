import BaseFrameController from './BaseFrameController';

class CreateMediaPage extends BaseFrameController{
  constructor(spawnElement, STauthToken, templateId, config) {
    const page = '/integration';
    super(spawnElement, STauthToken, page, JSON.stringify(config), templateId);
    this.availableEvents = [
      'loaded',
      'created',
      'batch-created',
    ];
  }
}

export default CreateMediaPage;