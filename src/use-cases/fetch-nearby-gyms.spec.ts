import { InMemoryGymnsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';


let gymsRepository: InMemoryGymnsRepository;
let sut: FetchNearbyGymsUseCase;


describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymnsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -27.649089,
      longitude: -52.2621026
    })

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -27.6331727,
      longitude: - 52.3783197
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.649089,
      userLongitude: -52.2621026
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })])
  })
})
