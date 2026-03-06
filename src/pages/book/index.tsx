import { bookDelete, getBookList } from "@/api/book";
import Content from "@/components/Content";
import { BookQueryType, CategoryQueryType } from "@/type";
import { Button, Col, Form, Input, Row, Select, Space, Table, Image, Modal, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { log } from "node:console";
import { useEffect, useState } from "react";





export default function BookPage() {
  const [form] = Form.useForm()
  const router = useRouter()

  const handleSearchFinish = (searchParams: CategoryQueryType) => {
    getBookList({ ...searchParams, current: 1, pageSize: pagination.pageSize }).then(
      (res) => {
        setBookDataSource(res.data)
        setPagination({ ...pagination, total: res.total, current: 1 })
      }
    )
  }
  const handleSearchReset = () => {
    form.resetFields()
    getBookList({
      current: 1,
      pageSize: pagination.pageSize
    }).then((res) => {
      setBookDataSource(res.data)
    })
  }
  const handleBookEdit = () => {
    router.push('/book/edit/id')
  }
  const handleTableChange = (newPagination: any) => {
    setPagination(newPagination)
    const query = form.getFieldsValue()
    getBookList({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
      ...query
    })
  }

  const options =
    [
      { value: 'jack', label: 'Jack' },
      { value: 'lucy', label: 'Lucy' },
      { value: 'Yiminghe', label: 'yiminghe' },
      { value: 'disabled', label: 'Disabled', disabled: true },
    ]
  const handleBookDelete = (row: any) => {
    Modal.confirm({
      title: `确认删除书籍《${row.name}》吗？`,
      okText: '确定',
      cancelText: '取消',
      async onOk() {
        await bookDelete(row._id)
        message.success('删除成功')
        fetchData(form.getFieldsValue())
      }
    })
  }

  async function fetchData(values?: BookQueryType) {
    const res = await getBookList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...values
    })
    setBookDataSource(res.data)
    setPagination({ ...pagination, total: res.total })
  }
  useEffect(() => {
    fetchData()
  }, [])

  const [dataSource, setDataSource] = useState<any>([])
  const setBookDataSource = (data: any[]) => {
    const processedData = data.map((item: any) => (
      { ...item, key: item._id }
    ))
    setDataSource(processedData)
  }

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,      // 固定宽度
      minWidth: 100,    // 最小宽度
    },
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      width: 150,
      minWidth: 100,
      render: (text: string) => {
        return <Image width={70} height={80} src={text} />
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      width: 150,
      minWidth: 100,
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      minWidth: 100,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 400,
      minWidth: 300,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      width: 150,
      minWidth: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      minWidth: 100,
      render: (ts: any) => (
        dayjs(ts).format('YYYY-MM-DD')
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      minwidth: 100,
      render: (_: any, row: any) => (
        <Space size="middle">
          <Button onClick={handleBookEdit} color="primary" variant='link'>编辑</Button>
          <Button color="danger" variant='link' onClick={() => {
            handleBookDelete(row)
          }}>删除</Button>
        </Space>
      )
    },
  ]
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    total: 0,
  })

  return (
    <Content title='图书列表' btn='添加' route="/book/add">
      <Form
        form={form}
        name="customized_form_controls"
        layout="horizontal"
        onFinish={handleSearchFinish}
        initialValues={{
          name: '', author: '', category: ''
        }}
      >
        <Row gutter={20}>
          <Col span={4}>
            <Form.Item name="name" label="名称" >
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="author" label="作者" >
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="category" label="分类" >
              <Select showSearch placeholder="请选择" options={options} allowClear />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button onClick={handleSearchReset}>
                  清空
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div style={{ height: 'calc(100% - 76px)' }}>
        <Table
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: 1250, y: 'calc(100vh - 350px)' }}
          pagination={{ ...pagination, showTotal: () => `共${pagination.total}条` }}
          onChange={handleTableChange}
        />
      </div>
    </Content>
  );
}

