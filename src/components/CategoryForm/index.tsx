import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Image,
  message
} from 'antd';
import { CategoryCreateType } from '@/type';
import { bookAdd } from '@/api/book';
import { log } from 'console';
import { useRouter } from 'next/router';
import styles from './index.module.css'
import dayjs from 'dayjs';
import { categoryAdd, getCategoryList } from '@/api/category';

const { TextArea } = Input;

export default function BookPage() {
  const [form] = Form.useForm()
  const [preImage, setPreImage] = useState('')
  const [level, setLevel] = useState()
  const [levelOneList, setLevelOneList] = useState([])
  const router = useRouter()
  const handleFinish = async (params: CategoryCreateType) => {
    await categoryAdd(params)
    message.success('添加成功', 1.5)
    router.push('/category')
  }
  useEffect(() => {
    const fetchData = async () => {
      const res = await getCategoryList({ level: 1 })
      setLevelOneList(res.data)
    }
    fetchData()
  }, [])
  const levelOneOption = useMemo(() => {
    return levelOneList.map((item: any) => (
      { label: item.name, value: item.parent._id }
    ))
  }, [levelOneList])
  return (
    <>
      <Form
        className={styles.form}
        onFinish={handleFinish}
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 20 }}
        layout="horizontal"
      >
        <Form.Item label="名称" name='name' rules={[{ required: true, message: '请输入名称' }]}>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item label="级别" name='level' rules={[{ required: true, message: '请选择级别' }]}>
          <Select
            placeholder='请选择'
            options={[{ label: '级别1', value: '1' }, { label: '级别2', value: '2' }]}
            onChange={(value) => { setLevel(value) }} />
        </Form.Item>
        {level == 2 && <Form.Item label="所属级别" name='parent' rules={[{ required: true, message: '请选择级别' }]}>
          <Select
            placeholder='请选择'
            options={levelOneOption} />
        </Form.Item>}
        <Form.Item label=" " colon={false}>
          <Button className={styles.btn} type='primary' htmlType="submit">创建</Button>
        </Form.Item>
      </Form>
    </>
  );
}

//图书添加页面模板

