import Content from "@/components/Content";
import { Button, Form, Input, Select, Space } from "antd";
import { log } from "console";
import Head from "next/head";
import Image from "next/image";



export default function BorrowPage() {
  const [form] = Form.useForm()
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const handleFinish = () => {

  }
  const handleChange = () => {

  }
  return (
    <Content title='借阅列表' >
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={handleFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="note" label="Note" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            allowClear
            placeholder="Select a option and change input text above"
            onChange={handleChange}
            options={[
              { label: 'male', value: 'male' },
              { label: 'female', value: 'female' },
              { label: 'other', value: 'other' },
            ]}
          />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
        >
          {({ getFieldValue }) =>
            getFieldValue('gender') === 'other' ? (
              <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            ) : null
          }
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" >
              Reset
            </Button>
            <Button type="link" htmlType="button">
              Fill form
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Content>
  );
}
