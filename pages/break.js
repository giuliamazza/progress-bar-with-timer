import Head from 'next/head'
import styles from '../styles/Home.module.css'

import TwitchProgressBar from '../components/TwitchProgressBar'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>BREAK</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TwitchProgressBar duration={7} max={10} color="#D2D3E8" scene="break" />
    </div>
  )
}
