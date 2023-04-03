import { CreateMediaPage } from './index';

window.APP_URL = 'https://platform.storyteq.work';

const TEST_API_KEY =
  'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJOV0dvRVMtclJkekU4eDFEYUo1UkpzaTRlOGYtX3JGa05TUldtb18ybjRVIn0.eyJleHAiOjE2ODA1MjA3ODYsImlhdCI6MTY4MDUyMDQ4NiwiYXV0aF90aW1lIjoxNjgwNTEwNTc3LCJqdGkiOiI2OTZkNDUxZC0wYTkxLTRjZDAtYjA0ZC04MmY0OTc5NmJhZTkiLCJpc3MiOiJodHRwczovL2tleWNsb2FrLXRlc3QuaXRnLmNvLnVrL3JlYWxtcy9zdG9yeXRlcS53b3JrIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6ImQ0NGIxYWY1LThkMjQtNDg2NS1iMDc0LWMzMTk4ZTE0NzQxZiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImJyYW5kLnN0b3J5dGVxLndvcmsiLCJzZXNzaW9uX3N0YXRlIjoiNTA0ZjQ0MDQtYjM2NC00OGNmLWI3ZTEtYzBhYTk0MTZmYWI0IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwczovL2JyYW5kLnN0b3J5dGVxLmRldiIsImh0dHBzOi8vYnJhbmQuc3Rvcnl0ZXEud29yayIsImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1zdG9yeXRlcS53b3JrIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiI1MDRmNDQwNC1iMzY0LTQ4Y2YtYjdlMS1jMGFhOTQxNmZhYjQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlJhZmFlbCBGZXJuYW5kZXogU2VycmEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJyYWZhZWxmZXJuYW5kZXpzZXJyYUB0ZWFtaXRnLmNvbSIsImdpdmVuX25hbWUiOiJSYWZhZWwiLCJmYW1pbHlfbmFtZSI6IkZlcm5hbmRleiBTZXJyYSIsImVtYWlsIjoicmFmYWVsZmVybmFuZGV6c2VycmFAdGVhbWl0Zy5jb20ifQ.kBGHaLmnCo05Dt0wMUV8VJGPyxF9a5BNM5AwWa3pGyTSXOyHMHABupIvXunw7MsGA5IDnJ-iYGUICNwekC6j3dhFJ3AlSey9pcENR6eBknont-u1qnRU748Io5W2rQh9nzCBRFMG4wVBB3JB0UCpQ8SI3Ri0-0UaSczkPpxV3CS_dLOsOjFq5CZVqytFQrKlF_YYeCW1D8ARX9KkchtXhrHvjktcf6fJdh9nbky6EZspdq3p4kJ6ccYy1nc3je1V4_6NX_ugfOLPbVZniQ6LEzAmAknWPbhiJugWI34JRMUEbkzQcAG4nojtiBUDd3t_PUCVNioktMAoPi4Pc3E6UA';

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
