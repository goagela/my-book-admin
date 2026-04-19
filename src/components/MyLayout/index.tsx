import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Dropdown, Space, message } from 'antd';
import styles from './index.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { log } from 'console';
import { useRouter } from 'next/router';
import { spawn } from 'child_process';
import { logout } from '@/api/user';

const { Header, Content, Sider } = Layout;


export default function MyLayout({ children }: { children: React.ReactNode }) {
  const myItem = [
    {
      key: 'book',
      label: '图书管理',
      children: [
        { key: '/book', label: '图书列表' },
        { key: '/book/add', label: '图书添加' },
      ]
    },
    {
      key: 'borrow',
      label: '借阅管理',
      children: [
        { key: '/borrow', label: '借阅列表' },
        { key: '/borrow/add', label: '借阅添加' },
      ]
    },
    {
      key: 'category',
      label: '分类管理',
      children: [
        { key: '/category', label: '分类列表' },
        { key: '/category/add', label: '分类添加' },
      ]
    },
    {
      key: 'user',
      label: '用户管理',
      children: [
        { key: '/user', label: '用户列表' },
        { key: '/user/add', label: '用户添加' },
      ]
    }
  ]

  const userItems: MenuProps['items'] = [
    {
      label: (<Link href='/user/edit/id'>用户中心</Link>),
      key: '1',
    },
    {
      label: (<span onClick={async () => {
        message.success('登出成功')
        router.push('/login')
      }}>
        登出
      </span>),
      key: '2',

    }
  ];
  const router = useRouter()
  const handleMenuClick = function ({ key }: any) {
    router.replace(key)
  }
  const activeMenu = router.pathname
  return (
    <Layout>
      <Header className={styles.header}>
        <Image className={styles.logo} src='/logo.svg' width={35} height={35} alt='logo' />
        阅华图书管理系统
        <span className={styles.user}>
          <Dropdown menu={{ items: userItems }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                我的用户名
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </span>
      </Header>
      <Layout className={styles.sectionInner}>
        <Sider width={200} >
          <Menu
            mode="inline"
            defaultSelectedKeys={['/book']}
            defaultOpenKeys={['book']}
            selectedKeys={[activeMenu]}
            style={{ height: '100%', borderInlineEnd: 0 }}
            items={myItem}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout className={styles.sectionContent}>

          <Content className={styles.content}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );

}