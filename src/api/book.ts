import { BookQueryType } from "@/type"
import request from "@/utils/request"
//request就是request.ts中返回的instance
import axios from "axios"

export async function getBookList(params?: BookQueryType) {
  // const res = await request({
  //   method: 'get',
  //   url: '/api/books',
  //   params
  // })
  const res: any = await request.get(
    '/api/books', { params }
  )
  return res
}  
