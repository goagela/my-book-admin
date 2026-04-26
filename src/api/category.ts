import { CategoryCreateType, CategoryQueryType } from "@/type"
import request from "@/utils/request"
//request就是request.ts中返回的instance
import axios from "axios"

export async function getCategoryList(params?: CategoryQueryType) {
  const res: any = await request.get(
    '/api/categories', { params }
  )
  return res
}

export async function categoryAdd(params: CategoryCreateType) {
  const res: any = await request.post('/api/categories', params)
  return res
}
export async function categoryDelete(id: string) {
  const res: any = await request.delete(`/api/categories/${id}`)
  return res
}

export async function getCategoryDetail(id: string) {
  const res: any = await request.get(`/api/categories/${id}`)
  return res
}
export async function categoryUpdate(id: string, params: CategoryCreateType) {
  const res: any = await request.put(`/api/categories/${id}`, params)
  return res
}