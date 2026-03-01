import { Button, Form, Input, Select, Space } from "antd";





export default function BookPage() {
  const [form] = Form.useForm()
  const handleSearchFinish = (a) => {
    console.log(a);

  }
  const handleSearchReset = () => {
    form.resetFields()
  }
  const options =
    [
      { value: 'jack', label: 'Jack' },
      { value: 'lucy', label: 'Lucy' },
      { value: 'Yiminghe', label: 'yiminghe' },
      { value: 'disabled', label: 'Disabled', disabled: true },
    ]
  return (
    <>
      <Form
        form={form}
        name="customized_form_controls"
        layout="inline"
        onFinish={handleSearchFinish}
        initialValues={{
          name: '', author: '', category: ''
        }}
      >
        <Form.Item name="name" label="名称" >
          <Input placeholder="请输入" allowClear />
        </Form.Item>
        <Form.Item name="author" label="作者" >
          <Input placeholder="请输入" allowClear />
        </Form.Item>
        <Form.Item name="category" label="分类" >
          <Select showSearch style={{ width: 100 }} placeholder="请选择" options={options} allowClear />
        </Form.Item>
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
      </Form>
    </>
  );
}
