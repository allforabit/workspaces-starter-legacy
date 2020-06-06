import { app } from '../endpoints';
import supertest from 'supertest';
import os from 'os';

const request = supertest(app);

describe('Jest and Supertest work flawlessy', () => {
  it('Gets the server and returns without open handles', async (done) => {
    const response = await request.get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe(`Hello, ${os.userInfo().username}!`);

    done();
  });
});
