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
