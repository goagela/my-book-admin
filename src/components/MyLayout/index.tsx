import React from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Dropdown, Space } from 'antd';
import styles from './index.module.css'
import Image from 'next/image';
import { log } from 'console';
import { useRouter } from 'next/router';

const { Header, Content, Sider } = Layout;



// const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
//   (icon, index) => {
//     const key = String(index + 1);

//     return {
//       key: `sub${key}`,
//       icon: React.createElement(icon),
//       label: `subnav ${key}`,
//       children: Array.from({ length: 4 }).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//           key: subKey,
//           label: `option${subKey}`,
//         };
//       }),
//     };
//   },
// );

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
    label: '用户中心',
    key: '1',
  },
  {
    label: '登出',
    key: '2',
  }
];


export default function MyLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const handleMenuClick = function ({ key }: any) {
    router.push(key)

  }

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