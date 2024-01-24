import request from "supertest";
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate";


describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })


  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '1199999',
        latitude: -27.649089,
        longitude: -52.2621026
      })


    expect(response.statusCode).toEqual(201)

  })
})