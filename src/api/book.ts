import { BookQueryType } from "@/type"
import axios from "axios"

// 使用命名导出，避免默认导入兼容问题
export async function getBookList(params?: BookQueryType) {
  const res = await axios({
    method: 'get',
    url: 'https://mock.apifox.cn/m1/2398938-0-default/api/books',
    params
  })
  return res.data
}  
