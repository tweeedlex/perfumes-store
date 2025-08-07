export interface ICatalogParams {
  search: string
  minPrice: number
  maxPrice: number
  page: number
  limit: number
  [filterName: string]: string | number
}

export interface IFilter {
  _id: string
  name: string
  slug: string
}

export interface IFilterValue {
  _id: string
  value: string | number
  filter: IFilter
}

export interface IProduct {
  _id: string
  name: string
  price: number
  discountPrice?: number
  label?: string
  stock: number
  description?: string
  filters?: IFilterValue[]
}

export interface ICatalogResponse {
  products: IProduct[]
  filters: [{ name: string, value: string, slug: string, chosen: boolean }]
  search: string
  minPrice: number
  maxPrice: number
  page: number
  limit: number
  total: number
}