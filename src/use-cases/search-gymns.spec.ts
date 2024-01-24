import { InMemoryGymnsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { SearchGymsUseCase } from './search-gymns';


let gymsRepository: InMemoryGymnsRepository;
let sut: SearchGymsUseCase;


describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymnsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -27.649089,
      longitude: -52.2621026
    })

    await gymsRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: -27.649089,
      longitude: -52.2621026
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1
    })

    expect(gyms).toHaveLength(1)
  })

  it('should be able to fetch paginated paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.649089,
        longitude: -52.2621026
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' })
    ])

  })
})
