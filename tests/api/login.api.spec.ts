import { test, expect } from '@playwright/test';
import { StatusCodes } from 'http-status-codes'
import * as endpoints from '@config/endpoints'

const tag = ['@AutoDemo', '@API', '@Login', '@Smoke']

test('Verify API login should return 200', { tag }, async ({ request }) => {

  let response: any
  const baseUrl = process.env.baseUrl
  const endpoint = endpoints.API_END_POINTS.login
  await test.step(`Call API login with valid username and password`, async () => {
    response = await request.post(`${baseUrl}${endpoint}`, {
      data: {
        username: process.env.validUsername,
        password: process.env.validPassword,
      },
    });
  })

  await test.step(`Verify status code is [200]`, async () => {
    expect(response.status()).toBe(StatusCodes.OK);
  })

});


