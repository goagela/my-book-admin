import { Button } from 'antd';
import styles from './index.module.css'
import { useRouter } from 'next/router';


export default function Content({ children, title, btn }: { children: React.ReactNode; title: React.ReactNode, btn?: React.ReactNode }) {
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
              router.push('/book/add')
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
//主内容区组件