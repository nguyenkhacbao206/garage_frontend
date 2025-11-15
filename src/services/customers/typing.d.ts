declare module MCustomer {
  interface IRecord {
    id: string,
    customerCode: string,
    name: string,
    phone: string,
    email: string,
    address: string,
    note: string,
    cars: any[],
  }
}