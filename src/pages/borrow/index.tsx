import { getBookList } from "@/api/book";
import { borrowDelete, getBorrowList } from "@/api/borrow";
import Content from "@/components/Content";
import { Button, Form, Input, message, Modal, Select, Space, Table, Tag } from "antd";
import { log } from "console";
import dayjs from "dayjs";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";



export default function BorrowPage() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [borrowList, setBorrowList] = useState([])
  const dataSource = borrowList.map((item: any) => (
    {
      key: item.book._id,
      bookId: item.book._id,
      name: item.book.name,
      status: item.user.status,
      author: item.book.author,
      borrowUser: item.user.nickName,
      borrowAt: dayjs(item.borrowAt).format('YYYY-MM-DD'),
      backAt: '暂定',
    }
  ))
  const columns = [
    {
      title: '书籍名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,      // 固定宽度
      minWidth: 100,    // 最小宽度

    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      minWidth: 100,
      render: (status: string) => {
        return status == 'on' ? <Tag color='green'>已归还</Tag> : <Tag color='cyan'>借出</Tag>
      }
    },
    {
      title: '书籍作者',
      dataIndex: 'author',
      key: 'author',
      width: 150,
      minWidth: 100,
    },
    {
      title: '借阅人',
      dataIndex: 'borrowUser',
      key: 'borrowUser',
      width: 150,
      minWidth: 100,
    },
    {
      title: '借阅时间',
      dataIndex: 'borrowAt',
      key: 'borrowAt',
      width: 150,
      minWidth: 100,
    },
    {
      title: '归还时间',
      dataIndex: 'backAt',
      key: 'backAt',
      width: 150,
      minWidth: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      minwidth: 100,
      render: (_: any, row: any) => (
        <Space size="middle">
          <Button color="primary" variant='link' onClick={() => {
            handleBorrowEdit(row.bookId)
          }}>编辑</Button>
          <Button color="danger" variant='link' onClick={() => {
            handleBorrowDelete(row)
          }}>删除</Button>
        </Space>
      )
    },
  ];
  const bookOptions = borrowList.map((item: any) => (
    { label: item.book.name, value: item.book._id }
  ))
  const userBorrowOptions = borrowList.map((item: any) => (
    { label: item.user.nickName, value: item.user.name }
  ))
  const statusOptions = [
    { label: '借出', value: 'on' },
    { label: '归还', value: 'off' },
  ]

  const fetchData = (params?: any) => {
    getBorrowList(params).then(res => {
      setBorrowList(res.data)
    })
  }
  useEffect(() => {
    fetchData()
    console.log(userBorrowOptions);
  }, [])
  const handleSearchFinish = (searchParams: any) => {
    getBorrowList({ ...searchParams }).then(
      (res) => {
        setBorrowList(res.data)
      }
    )
  }
  const handleSearchReset = () => {
    form.resetFields()
    getBorrowList().then((res) => {
      setBorrowList(res.data)
    })
  }
  const handleBorrowEdit = (id: string) => {
    router.push(`/borrow/edit/${id}`)
  }
  const handleBorrowDelete = (row: any) => {
    Modal.confirm({
      title: `确定删除《${row.name}》的借阅信息吗？`,
      okText: '确定',
      cancelText: '取消',
      async onOk() {
        await borrowDelete(row.key)
        message.success('删除成功')
        fetchData(form.getFieldsValue())
      }
    })
  }

  return (
    <Content title='借阅列表' >
      <Form
        style={{ minWidth: 1100, marginBottom: 20 }}
        layout="inline"
        form={form}
        name="control-hooks"
        onFinish={handleSearchFinish}
      >
        <Form.Item name="name" label="书籍名称" >
          <Select
            style={{ minWidth: 100, width: 200 }}
            allowClear
            showSearch
            optionFilterProp="label"
            placeholder="请选择"
            options={bookOptions}
          />
        </Form.Item>
        <Form.Item name="status" label="状态" >
          <Select
            style={{ minWidth: 100, width: 200 }}
            allowClear
            placeholder="请选择"
            options={statusOptions}
          />
        </Form.Item>
        <Form.Item name="user" label="借阅人">
          <Select
            style={{ minWidth: 100, width: 200 }}
            allowClear
            showSearch
            optionFilterProp="label"
            placeholder="请选择"
            options={userBorrowOptions}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button htmlType="button" onClick={handleSearchReset}>
              清空
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div style={{ height: 'calc(100% - 76px)' }}>
        <Table

          dataSource={dataSource}
          columns={columns}
          scroll={{ x: 1250, y: 'calc(100vh - 350px)' }}
          pagination={{
            showSizeChanger: true,
            defaultPageSize: 20,
            showTotal: () => `共${dataSource.length}条`,
          }}
        />
      </div>
    </Content>
  )
}
