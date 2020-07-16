import CreateMediaPage from './classes/CreateMediaPage';

if (process && process.env && process.env.ENVIRONMENT === 'testing') {
  setTimeout(() => {
    const createMediaPage = new CreateMediaPage(
      '#frame-tester',
      process.env.TEST_API_KEY,
      999,
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
  }, 4000);
}

export default {
  createMediaPage: CreateMediaPage,
};
