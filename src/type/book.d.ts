export interface BookQueryType {
  name?: string,
  author?: string,
  category?: number
  current?: number
  pageSize?: number
}
export interface BookCreateType {
  name: string,
  author: string,
  category: string,
  cover: string,
  publishedAt: number,
  stock: number,
  description: string
}