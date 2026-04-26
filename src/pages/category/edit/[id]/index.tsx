
import { getCategoryDetail } from "@/api/category";
import CategoryForm from "@/components/CategoryForm";
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
        await getCategoryDetail(id as string).then(res => {
          setData(res.data)
        })
      }
    }
    fetch()
  }, [id])
  return (
    <Content title='分类编辑'>
      <CategoryForm editData={data}></CategoryForm>
    </Content>
  )
}