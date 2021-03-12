const isTesting = (process && process.env && process.env.ENVIRONMENT === 'testing');
if (isTesting) {
  window.APP_URL = 'https://platform.storyteq.com';
}

import CreateMediaPage from './classes/CreateMediaPage';
import CrmAnalyticsPage from './classes/CrmAnalyticsPage';

if (isTesting) {
  // const createMediaPage = new CreateMediaPage(
  //   '#frame-tester',
  //   process.env.TEST_API_KEY,
  //   1077,
  //   {
  //     publish: [
  //       {
  //         type: 'brandfolder',
  //       },
  //     ],
  //   }
  // );

  // createMediaPage
  //   .on('loaded', (pl) => console.log('loaded', pl))
  //   .on('created', (media) => console.log('CREATED', media));

  const crmAnalyticsPage = new CrmAnalyticsPage(
    '#frame-tester',
    process.env.TEST_API_KEY,
    115,
    15
  );

  crmAnalyticsPage
    .on('loaded', (pl) => console.log('loaded', pl));
}



export default {
  createMediaPage: CreateMediaPage,
  crmAnalyticsPage: CrmAnalyticsPage,
};
