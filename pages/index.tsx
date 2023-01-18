import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Tweet } from '@prisma/client'
import CardGrid from '../components/CardGrid'
import {prisma} from '../lib/prisma'
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps = async () => {
  const tweets = await prisma.tweet.findMany()
  return { props:  {
    tweets: JSON.parse(JSON.stringify(tweets))
  }  
}
}

interface HomeProps {
  tweets: Tweet[]
}

export default function Home(Props: HomeProps) {

  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  return (
    <>
      <Head>
        <title>Midwit Meme</title>
        <meta name="description" content="Collection of Midwit Memes on Twitter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className={styles.main}>
        <CardGrid tweets={Props.tweets}/>     
      </main>
      <Footer/>
    </>
  )
}
