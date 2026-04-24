import { BookCreateType, BookQueryType } from "@/type"
import request from "@/utils/request"
//request就是request.ts中返回的instance
import axios from "axios"

export async function getBookList(params?: BookQueryType) {
  const res: any = await request.get(
    '/api/books', { params }
  )
  return res
}

export async function bookAdd(params: BookCreateType) {
  const res: any = await request.post('/api/books', params)
  return res
}

export async function bookDelete(id: string) {
  const res: any = await request.delete(`/api/books/${id}`)
  return res
}
export async function getBookDetail(id: string) {
  const res: any = await request.get(`/api/books/${id}`)
  return res
}
export async function bookUpdate(id: string, params: BookCreateType) {
  const res: any = await request.put(`/api/books/${id}`, params)
  return res
}