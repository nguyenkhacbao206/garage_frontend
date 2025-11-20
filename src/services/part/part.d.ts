declare module MPart {
  interface IRecord {
    id: string,
    name: string,
    unit: string,
    price: number,
    stock: number,
    description: string,
    supplierId: string
  }
}