
import request from "@/utils/request"
//request就是request.ts中返回的instance
import axios from "axios"

export async function getBorrowList(params?: any) {
  const res: any = await request.get(
    '/api/borrows', { params }
  )
  return res
}

export async function borrowAdd() {
  const res: any = await request.post('/api/borrows')
  return res
}

export async function borrowDelete(id: string) {
  const res: any = await request.delete(`/api/borrows/${id}`)
  return res
}