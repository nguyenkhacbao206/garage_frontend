declare namespace MTechnician {
  interface IRecord {
    id: string
    name: string
    techCode: string
    phone: string
    baseSalary: number 
    position?: string
    userId?: string
    active?: boolean
  }
    interface IRequest {
    name: string
    phone: string
    baseSalary: number
    position?: string
    userId?: string
  }
}