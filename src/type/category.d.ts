export interface CategoryQueryType {
  name?: string,
  level?: number,
  current?: number,
  pageSize?: number
}
export interface CategoryCreateType {
  name: string,
  level: number,
  parent?: string
}