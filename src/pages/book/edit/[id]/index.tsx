import { getBookDetail } from "@/api/book";
import BookForm from "@/components/BookForm";
import Content from "@/components/Content";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const id = router.query.id
  const [data, setData] = useState({})
  useEffect(() => {
    const fetch = async () => {
      if (id) {
        await getBookDetail(id as string).then(res => {
          setData(res.data)
        })
      }
    }
    fetch()
  }, [id])
  return (
    <Content title='图书编辑'>
      <BookForm editData={data}></BookForm>
    </Content>
  )
}