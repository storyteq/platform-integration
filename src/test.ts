import { CreateMediaPage, CrmAnalyticsPage } from './index';

window.APP_URL = 'https://platform.storyteq.work';

const testAnalytics = false;
const TEST_API_KEY = 'YOUR_API_KEY';
const TEST_COMPANY_ID = 1;
const TEST_TEMPLATE_ID = 1159;

if (!testAnalytics) {
  const createMediaPage = new CreateMediaPage('#frame-tester', TEST_API_KEY, TEST_TEMPLATE_ID, TEST_COMPANY_ID, {
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
} else {
  const TEST_CAMPAIGN_ID = 0;
  const crmAnalyticsPage = new CrmAnalyticsPage('#frame-tester', TEST_API_KEY, TEST_TEMPLATE_ID, TEST_CAMPAIGN_ID);

  crmAnalyticsPage.on('loaded', (pl) => {
    console.log('loaded', pl);
  });
}
