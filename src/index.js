const isTesting = (process && process.env && process.env.ENVIRONMENT === 'testing');
if (isTesting) {
  window.APP_URL = 'https://platform.storyteq.work';
}

import CreateMediaPage from './classes/CreateMediaPage';

if (isTesting) {
  const createMediaPage = new CreateMediaPage(
    '#frame-tester',
    process.env.TEST_API_KEY,
    1077,
    {
      publish: [
        {
          type: 'brandfolder',
        },
      ],
    }
  );

  createMediaPage
    .on('loaded', (pl) => console.log('loaded', pl))
    .on('created', (media) => console.log('CREATED', media));
}

export default {
  createMediaPage: CreateMediaPage,
};
