import React, { useEffect, useState } from 'react';
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
import { BookCreateType, CategoryQueryType } from '@/type';
import { bookAdd, bookUpdate } from '@/api/book';
import { useRouter } from 'next/router';
import styles from './index.module.css'
import dayjs from 'dayjs';
import { getCategoryList } from '@/api/category';

const { TextArea } = Input;

export default function BookForm({ editData }: { editData?: any }) {
  const [form] = Form.useForm()
  const [preImage, setPreImage] = useState('')
  const router = useRouter()
  const [categoryList, setCategoryList] = useState<CategoryQueryType[]>()
  const handleFinish = async (params: BookCreateType) => {
    if (params.publishedAt) {
      params.publishedAt = dayjs(params.publishedAt).valueOf()
    }//将提交的时间格式变为时间戳
    if (editData) {
      await bookUpdate(editData._id, params)
      message.success('更新成功', 1.5)
    } else {
      await bookAdd(params)
      message.success('添加成功', 1.5)
    }
    router.push('/book')
  }
  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        ...editData,
        publishedAt: editData.publishedAt ? dayjs(editData.publishedAt) : undefined,
      })
    }
    getCategoryList().then((res: any) => {
      setCategoryList(res.data.map((item: any) => ({ label: item.name, value: item._id })))
    })
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

      >
        <Form.Item label="名称" name='name' rules={[{ required: true, message: '请输入名称' }]}>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item label="作者" name='author' rules={[{ required: true, message: '请输入作者' }]}>
          <Input placeholder='请输入' />
        </Form.Item>
        {/* <Form.Item label="分类" name='category' rules={[{ required: true, message: '请选择分类' }]}>
          <Select placeholder='请选择' options={categoryList} />
        </Form.Item> */}
        <Form.Item label="封面" name='cover'>
          <Space.Compact style={{ marginBottom: 10 }}>
            <Input placeholder='请输入图片url' onChange={(e) => {
              form.setFieldValue('cover', e.target.value)
            }} />
            <Button
              onClick={() => {
                setPreImage(form.getFieldValue('cover'))
              }}>预览</Button>
          </Space.Compact>
          {preImage && <Image src={preImage} style={{ width: 150, height: 200 }} />}
        </Form.Item>
        <Form.Item label="出版日期" name='publishedAt'>
          <DatePicker placeholder='请选择' />
        </Form.Item>

        <Form.Item label="库存" name='stock'>
          <InputNumber placeholder='请输入' />
        </Form.Item>
        <Form.Item label="描述" name='description'>
          <TextArea placeholder='请输入' rows={4} />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button className={styles.btn} type='primary' htmlType="submit">{editData ? '更新' : "创建"}</Button>
        </Form.Item>
      </Form>
    </>
  );
}

//图书添加页面模板

