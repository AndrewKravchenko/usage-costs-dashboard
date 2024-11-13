import { FC } from 'react'
import styles from './Header.module.css'

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1>Usage Costs Dashboard</h1>
    </header>
  )
}
