import { beforeEach, describe, expect, it, test } from 'vitest'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymnsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';


let gymnsRepository: InMemoryGymnsRepository;
let sut: CreateGymUseCase;


describe('Register Use Case', () => {
  beforeEach(() => {
    gymnsRepository = new InMemoryGymnsRepository()
    sut = new CreateGymUseCase(gymnsRepository)
  });

  it('should hash user password open registration', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -27.649089,
      longitude: -52.2621026

    })
    expect(gym.id).toEqual(expect.any(String))
  })

})
