import { test, expect, request } from '@playwright/test';
import { StoreService } from '../../services/StoreService.ts';
import { PetService } from '../../services/petService.ts';
import { urls } from '../../utils/api-urls.ts';
import { withRetry } from '../../utils/retryHelpers.ts';


test.describe('Full pet order lifecycle', () => {

    let context;
    let petService: PetService;
    let storeService: StoreService;
    const pets = [
        { id: 951753, name: 'Alpha', orderId: 456852 },
        { id: 753951, name: 'Bravo', orderId: 654852 },
        { id: 159357, name: 'Charlie', orderId: 852456 },
        { id: 357159, name: 'Delta', orderId: 258456 },
    ];

    test.beforeAll(async () => {
        context = await request.newContext({
            baseURL: urls.base,
        });
        petService = new PetService(context);
        storeService = new StoreService(context);
    });

    test('should create 4 pets with status "available" and store their IDs', async () => {

        await Promise.all(pets.map(async (pet) => {
            const response = await petService.createPet({ id: pet.id, name: pet.name, status: 'available' });
            expect(response.ok()).toBeTruthy();

            const createdPet = await response.json();
            console.log(`Pet created with ID: ${createdPet.id} and name: ${createdPet.name}`);
        }));

    });

    test('should place orders for each created pet ID', async () => {

        await Promise.all(pets.map(async (pet) => {
            const response = await storeService.placeOrder({ id: pet.orderId, petId: pet.id, quantity: 1, status: 'placed' });
            expect(response.ok()).toBeTruthy();

            const createdOrder = await response.json();
            console.log(`Order placed with ID: ${createdOrder.id} for pet ID: ${pet.id}`);
        }));

    });

    test('should delete all orders and pets created during the test', async () => {

        await Promise.all(pets.map(async (pet) => {

            // Delete pet order
            const orderDeletionResponse = await withRetry(() => storeService.deleteOrder(pet.orderId));
            console.log(`Pet order deletion status: ${pet.name} ${orderDeletionResponse.status()} ${orderDeletionResponse.statusText()}`);
            expect(orderDeletionResponse.ok()).toBeTruthy();
            console.log(`Pet ${pet.name} order deleted.`);

            const orderResource = await storeService.getOrder(pet.orderId);
            expect(orderResource.status()).toBe(404);

            // Delete pet
            const petDeletionResponse = await withRetry(() => petService.deletePet(pet.id));
            console.log(`Pet deletion status: ${pet.name} ${petDeletionResponse.status()} ${petDeletionResponse.statusText()}`);
            expect(petDeletionResponse.ok()).toBeTruthy();
            console.log(`Pet ${pet.name} deleted.`);

            const petResource = await petService.getPet(pet.id);
            expect(petResource.status()).toBe(404);
        }));
    });

});