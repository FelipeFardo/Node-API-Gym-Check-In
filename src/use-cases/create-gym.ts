import { UserAlreadyExistsError } from '@/use-cases/errors/use-already-exists-error'
import { hash } from 'bcryptjs'
import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymUseCaseRequest {
  title: string,
  description?: string | null
  phone: string | null,
  latitude: number,
  longitude: number,
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymnsRepository: GymsRepository) { }

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymnsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude
    })

    return {
      gym,
    }
  }
}
