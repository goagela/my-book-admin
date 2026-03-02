import { Button, Col, Form, Input, Row, Select, Space, Table } from "antd";
import { useRouter } from "next/router";
import { log } from "node:console";
import { useEffect, useState } from "react";





export default function BookPage() {
  const [form] = Form.useForm()
  const router = useRouter()
  const handleSearchFinish = (a: any) => {
    console.log(a);

  }
  const handleSearchReset = () => {
    form.resetFields()
  }
  const handleBookEdit = () => {
    router.push('/book/edit/id')
  }
  const handleTableChange = (e: any) => {
    setPagination(e)
  }

  const options =
    [
      { value: 'jack', label: 'Jack' },
      { value: 'lucy', label: 'Lucy' },
      { value: 'Yiminghe', label: 'yiminghe' },
      { value: 'disabled', label: 'Disabled', disabled: true },
    ]
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '3',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '4',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '5',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '6',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '7',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '8',
      name: 'aaa',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '9',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '10',
      name: 'aaa',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '11',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '12',
      name: 'aaa',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '13',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '封面',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '分类',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '描述',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '库存',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '创建时间',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button onClick={handleBookEdit} color="primary" variant='link'>编辑</Button>
          <Button color="danger" variant='link'>删除</Button>
        </Space>
      )
    },

  ];
  const [pagination, setPagination] = useState({
    pageSize: 20,
    showSizeChanger: true,
    total: dataSource.length,
  })

  return (
    <>
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
      <div style={{ height: 'calc(100% - 76px)', overflow: 'auto' }}>
        <Table
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: 1000 }}
          pagination={{ ...pagination, showTotal: () => `共${pagination.total}条` }}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
}
function axios(method: any, arg1: string, url: any, arg3: string) {
  throw new Error("Function not implemented.");
}

