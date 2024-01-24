import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number,
  userLongitude: number,
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymnsRepository: GymsRepository) { }

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymnsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    })

    return {
      gyms,
    }
  }
}
