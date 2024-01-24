import request from "supertest";
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate";
import { prisma } from "@/lib/prisma";


describe('Create Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })


  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Gym",
        description: 'Some description',
        phone: '1199999',
        latitude: -27.649089,
        longitude: -52.2621026
      }
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
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