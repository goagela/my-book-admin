import { getUserList, userDelete, userUpdate } from "@/api/user";
import Content from "@/components/Content";
import { UserQueryType } from "@/type";
import { Button, Col, Form, Input, Row, Select, Space, Table, Image, Tag, Modal, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { log } from "node:console";
import { useEffect, useState } from "react";





export default function UserPage() {
  const [form] = Form.useForm()
  const router = useRouter()

  const handleSearchFinish = (searchParams: UserQueryType) => {
    getUserList({ ...searchParams, current: 1, pageSize: pagination.pageSize }).then(
      (res) => {
        setUserDataSource(res.data)
        setPagination({ ...pagination, total: res.total, current: 1 })
      }
    )
  }
  const handleSearchReset = () => {
    form.resetFields()
    getUserList({
      current: 1,
      pageSize: pagination.pageSize
    }).then((res) => {
      setUserDataSource(res.data)
    })
  }
  const handleUserEdit = (id: string) => {
    router.push(`/user/edit/${id}`)
  }
  const handleTableChange = (newPagination: any) => {

    setPagination(newPagination)
    const query = form.getFieldsValue()
    getUserList({
      current: newPagination.current,
      pageSize: newPagination.pageSize,
      ...query
    }).then((res) => {
      setUserDataSource(res.data)
    })
  }
  const handleUserDelete = (row: any) => {
    Modal.confirm({
      title: `确认删除书籍《${row.name}》吗？`,
      okText: '确定',
      cancelText: '取消',
      async onOk() {
        await userDelete(row._id)
        message.success('删除成功')
        fetchData(form.getFieldsValue())
      }
    })
  }
  const handleStatusChange = async (row: any) => {
    const status = row.status === 'on' ? 'off' : 'on'
    await userUpdate({ status: status })
    fetchData(form.getFieldsValue())
    message.success('修改成功')
  }
  const UserOptions =
    [
      { value: 'on', label: '正常' },
      { value: 'off', label: '禁用' },
    ]

  async function fetchData(values?: UserQueryType) {
    const res = await getUserList({
      current: pagination.current,
      pageSize: pagination.pageSize,
      ...values
    })
    setUserDataSource(res.data)
    setPagination({ ...pagination, total: res.total })
  }
  useEffect(() => {
    fetchData()
  }, [])

  const [dataSource, setDataSource] = useState<any>([])
  const setUserDataSource = (data: any[]) => {
    const processedData = data.map((item: any, index: number) => (
      { ...item, key: index }
    ))
    setDataSource(processedData)
  }
  const columns = [
    {
      title: '账号',
      dataIndex: '_id',
      key: 'id',
      width: 150,      // 固定宽度
      minWidth: 100,    // 最小宽度
    },
    {
      title: '用户名',
      dataIndex: 'nickName',
      key: 'nickName',
      width: 150,
      minWidth: 100,

    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      minWidth: 100,
      render: (text: string) => {
        return text == 'on' ? <Tag color='green'>正常</Tag> : <Tag color='red'>禁用</Tag>
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      minwidth: 100,
      render: (_: any, row: any) => (
        <Space size="middle">
          <Button color="primary"
            variant='link'
            onClick={() => {
              handleUserEdit(row._id)
            }}>编辑</Button>
          <Button color="danger"
            variant='link'
            onClick={() => {
              handleUserDelete(row)
            }}>删除</Button>
          <Button
            color={row.status === 'on' ? 'danger' : 'primary'}
            variant='link'
            onClick={() => {
              handleStatusChange(row)
            }}>{row.status === 'on' ? '禁用' : '启用'}</Button>
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
    <Content title='用户列表' btn='添加' route='/user/add'>
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
            <Form.Item name="status" label="状态" >
              <Select showSearch placeholder="请选择" options={UserOptions} allowClear />
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

