import React, { useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  message,
  Radio
} from 'antd';
import { UserCreateType } from '@/type';
import { useRouter } from 'next/router';
import styles from './index.module.css'
import { getCategoryList } from '@/api/category';
import { userAdd } from '@/api/user';
import { log } from 'console';


export default function UserForm({ editData }: { editData?: UserCreateType }) {
  const [form] = Form.useForm()

  const router = useRouter()

  const handleFinish = async (params: UserCreateType) => {
    await userAdd(params)
    message.success('创建成功')
    router.push('/user')
  }
  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData)
    }
  }, [editData])

  return (
    <>
      <Form
        className={styles.form}
        onFinish={handleFinish}
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
        initialValues={{ gender: 'male', status: 'on' }}
      >
        <Form.Item label="账号" name='name' rules={[{ required: true, message: '请输入名称' }]}>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item label="名称" name='nickName' rules={[{ required: true, message: '请输入作者' }]}>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item label="性别" name='gender' rules={[{ required: true, message: '请选择分类' }]}>
          <Radio.Group>
            <Radio value='male'>男</Radio>
            <Radio value='female'>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="密码" name='password'>
          <Input.Password placeholder='请输入密码' />
        </Form.Item>
        <Form.Item label="状态" name='status' rules={[{ required: true, message: '请选择分类' }]}>
          <Radio.Group>
            <Radio value='on'>启用</Radio>
            <Radio value='off'>禁用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="角色" name='role' rules={[{ required: true, message: '请选择分类' }]}>
          <Radio.Group>
            <Radio value='user'>用户</Radio>
            <Radio value='admin'>管理员</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button className={styles.btn} type='primary' htmlType="submit">创建</Button>
        </Form.Item>
      </Form>
    </>
  );
}

//图书添加页面模板

