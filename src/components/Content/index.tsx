import { Button } from 'antd';
import styles from './index.module.css'
import { useRouter } from 'next/router';


export default function Content({ children, title, btn, route }: { children: React.ReactNode; title: React.ReactNode, btn?: React.ReactNode, route?: string }) {
  const router = useRouter()
  return (
    <>
      <div className={styles.title}>
        {title}
        {btn &&
          <Button
            type='primary'
            className={styles.button}
            onClick={() => {
              if (route) { router.push(route) }
            }}>
            {btn}
          </Button>}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </>
  )
}
//主内容区(灰色背景区内）组件