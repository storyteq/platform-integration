import { CreateMediaPage } from './index';

window.APP_URL = 'https://platform.storyteq.work';

const TEST_API_KEY = 'PASTE_TOKEN_HERE';

const createMediaPage = new CreateMediaPage('#frame-tester', TEST_API_KEY, 115, {
  publish: [
    {
      type: 'brandfolder',
    },
  ],
});

createMediaPage
  .on('loaded', (pl) => {
    console.log('loaded', pl);
  })
  .on('created', (media) => {
    console.log('CREATED', media);
  });

/*const crmAnalyticsPage = new CrmAnalyticsPage('#frame-tester', TEST_API_KEY, 115, 15);

crmAnalyticsPage.on('loaded', (pl) => {
  console.log('loaded', pl);
});*/
