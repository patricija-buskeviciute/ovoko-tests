export const urls = {
  base: 'https://petstore.swagger.io/v2/',
  pet: {
    create: './pet',
    update: './pet',
    get: (id: number) => `./pet/${id}`,
    delete: (id: number) => `./pet/${id}`,
    findByStatus: './pet/findByStatus'
  },
  store: {
    order: './store/order',
    orderById: (id: number) => `./store/order/${id}`,
    inventory: './store/inventory'
  }
};