import { APIRequestContext, APIResponse } from '@playwright/test';
import { urls } from '../utils/api-urls';

interface Order {
  id?: number;
  petId: number;
  quantity: number;
  shipDate?: string;
  status: string;
  complete?: boolean;
}

export class StoreService {
  constructor(private request: APIRequestContext) { }

  placeOrder(orderData: Order): Promise<APIResponse> {
    return this.request.post(urls.store.order, {
      headers: { 'Content-Type': 'application/json' },
      data: orderData,
    });
  }

  getOrder(orderId: number): Promise<APIResponse> {
    return this.request.get(urls.store.orderById(orderId));
  }

  deleteOrder(orderId: number): Promise<APIResponse> {
    return this.request.delete(urls.store.orderById(orderId), {
      headers: { api_key: 'special-key' },
    });
  }

  getInventory(): Promise<APIResponse> {
    return this.request.get(urls.store.inventory);
  }
}