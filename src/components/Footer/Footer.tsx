import { FC } from 'react'
import styles from './Footer.module.css'

export const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; 2024 Usage Costs Dashboard. All rights reserved.</p>
    </footer>
  )
}
