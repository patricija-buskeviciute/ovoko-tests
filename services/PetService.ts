import { APIRequestContext, APIResponse } from '@playwright/test';
import { urls } from '../utils/api-urls';

interface Pet {
  id: number;
  name: string;
  status: string;
}

export class PetService {
  constructor(private request: APIRequestContext) { }

  createPet(petData: Pet): Promise<APIResponse> {
    return this.request.post(urls.pet.create, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: petData,
    });
  }

  getPet(petId: number): Promise<APIResponse> {
    return this.request.get(urls.pet.get(petId));
  }

  deletePet(petId: number): Promise<APIResponse> {
    return this.request.delete(urls.pet.delete(petId), {
      headers: { api_key: 'special-key' },
    });
  }

  findPetsByStatus(status: string): Promise<APIResponse> {
    return this.request.get(urls.pet.findByStatus, {
      params: { status },
    });
  }
}