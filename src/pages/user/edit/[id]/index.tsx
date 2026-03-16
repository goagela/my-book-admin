
import { getUserDetail } from "@/api/user";
import CategoryForm from "@/components/CategoryForm";
import Content from "@/components/Content";
import UserForm from "@/components/UserForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter()
  const id = router.query.id
  const [data, setData] = useState({})
  useEffect(() => {
    if (id) {
      getUserDetail(id as string).then(res => {
        setData(res.data)
      })
    }
  }, [id])
  return (
    <Content title='用户编辑'>
      <UserForm editData={data}></UserForm>
    </Content>
  )
}