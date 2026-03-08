import { categoryDelete, getCategoryList } from "@/api/category";
import Content from "@/components/Content";
import { BookQueryType, CategoryQueryType } from "@/type";
import { Button, Col, Form, Input, Row, Select, Space, Table, Image, Tag, Modal, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { log } from "node:console";
import { useEffect, useState } from "react";





export default function CategoryPage() {
  const [form] = Form.useForm()
  const router = useRouter()

  const handleSearchFinish = (searchParams: BookQueryType) => {
    getCategoryList({ ...searchParams, current: 1, pageSize: pagination.pageSize }).then(
      (res) => {
        setCategoryDataSource(res.data)
        setPagination({ ...pagination, total: res.total, current: 1 })
      }
    )
  }
  const handleSearchReset = () => {
    form.resetFields()
    getCategoryList({
      current: 1,
      pageSize: pagination.pageSize
    }).then((res) => {
      setCategoryDataSource(res.data)
    })
  }
  const handleCategoryEdit = (id: string) => {
    router.push(`/category/edit/${id}`)
  }
  const handleTableChange = (newPagination: any) => {
    setPagination(newPagination)
    const query = form.getFieldsValue()
    getCategoryList({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
      ...query
    })
  }
  const handleCategoryDelete = (row: any) => {
    Modal.confirm({
      title: `确认删除书籍《${row.name}》吗？`,
      okText: '确定',
      cancelText: '取消',
      async onOk() {
        await categoryDelete(row._id)
        message.success('删除成功')
        fetchData(form.getFieldsValue())
      }
    })
  }
  const LEVEL = {
    ONE: 1,
    TWO: 2
  }
  const options =
    [
      { value: LEVEL.ONE, label: '级别1' },
      { value: LEVEL.TWO, label: '级别2' },
    ]

  async function fetchData(values?: CategoryQueryType) {
    const res = await getCategoryList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...values
    })
    setCategoryDataSource(res.data)
    setPagination({ ...pagination, total: res.total })
  }
  useEffect(() => {
    fetchData()
  }, [])

  const [dataSource, setDataSource] = useState<any>([])
  const setCategoryDataSource = (data: any[]) => {
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
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      width: 150,
      minWidth: 100,
      render: (level: number) => {
        return <Tag color={level == 1 ? 'green' : 'cyan'}>{`级别${level}`}</Tag>
      }
    },
    {
      title: '所属分类',
      dataIndex: 'parent',
      key: 'parent',
      width: 150,
      minWidth: 100,
      render: (text: { name: string }) => {
        return text?.name ?? '-'
      }
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
          <Button color="primary" variant='link' onClick={() => {
            handleCategoryEdit(row._id)
          }}>编辑</Button>
          <Button color="danger" variant='link' onClick={() => {
            handleCategoryDelete(row)
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
    <Content title='分类列表' btn='添加' route='/category/add'>
      <Form
        form={form}
        name="customized_form_controls"
        layout="horizontal"
        onFinish={handleSearchFinish}
        initialValues={{
          name: '', level: ''
        }}
      >
        <Row gutter={20}>
          <Col span={4}>
            <Form.Item name="name" label="名称" >
              <Input placeholder="请输入" allowClear />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="level" label="级别" >
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

