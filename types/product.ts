export interface Product {
  _id: string
  name: string
  price: number
  description: string
  images: string[]
  category: string
  sizes: string[]
  stock: number
  featured: boolean
  rating: number
  discount: number
  discountedPrice?: number
  createdAt?: string
  updatedAt?: string
}

export interface ProductsListResponse {
  success: boolean
  count: number
  total: number
  page: number
  pages: number
  data: Product[]
}

export interface ProductResponse {
  success: boolean
  data: Product
}

export interface ProductQueryParams {
  page?: number
  limit?: number
  sort?: string
  category?: string
  featured?: boolean
  search?: string
}
