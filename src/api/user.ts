import { CategoryCreateType, CategoryQueryType } from "@/type"
import request from "@/utils/request"
//request就是request.ts中返回的instance
import axios from "axios"

export async function getUserList(params?: CategoryQueryType) {
  const res: any = await request.get(
    '/api/users', { params }
  )
  return res
}

export async function userAdd(params: CategoryCreateType) {
  const res: any = await request.post('/api/users', params)
  return res
}
export async function userDelete(id: string) {
  const res: any = await request.delete(`/api/users/${id}`)
  return res
}
export async function userUpdate(params: any) {
  const res: any = await request.put(`/api/users`, null, { params })
  return res
}
