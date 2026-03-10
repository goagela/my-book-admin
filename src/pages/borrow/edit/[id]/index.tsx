import { Form, Select, Button, message } from "antd"
import styles from './index.module.css'

import { useEffect, useState } from "react"
import { getBookList } from "@/api/book"
import { getUserList } from "@/api/user"
import { useRouter } from "next/router"
import Content from "@/components/Content"
import { borrowEdit } from "@/api/borrow"


export default function BorrowEdit() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [userList, setUserList] = useState([])
  const [bookList, setBookList] = useState([])
  const [stock, setStock] = useState(0)
  async function handleFinish(params: any) {
    await borrowEdit({ ...params }).then(message.success('编辑成功'))
    router.push(`/borrow`)
  }
  function handleBookChange(_: any, options: any) {
    setStock(options.stock)

  }
  useEffect(() => {
    getUserList().then((res) => {
      setUserList(res.data)
    })
    getBookList().then((res) => {
      setBookList(res.data)
    })
  }, [])
  return (
    <Content title='借阅编辑'>
      <Form
        className={styles.form}
        onFinish={handleFinish}
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
      >
        <Form.Item label="书籍名称" name='book' rules={[{ required: true, message: '请选择借阅书籍' }]}>
          <Select
            placeholder='请选择'
            options={bookList.map((item: any) => ({ label: item.name, value: item._id, stock: item.stock }))}
            allowClear
            showSearch
            optionFilterProp="label"
            onChange={handleBookChange}
          />
        </Form.Item>
        <Form.Item label="借阅用户" name='user' rules={[{ required: true, message: '请选择借阅用户' }]}>
          <Select
            placeholder='请选择'
            options={userList.map((item: any) => ({ label: item.nickName, value: item._id }))}
            allowClear
            showSearch
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item label='借阅状态' name='status' rules={[{ required: true, message: '请选择' }]}>
          <Select
            placeholder='请选择'
            options={[
              { label: '借出', value: 'on' },
              { label: '已归还', value: 'off' },
            ]}
          />


        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button className={styles.btn} type='primary' htmlType="submit" >确定</Button>
        </Form.Item>
      </Form>
    </Content>
  )
}