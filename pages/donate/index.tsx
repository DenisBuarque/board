import styles from './styles.module.scss'
import Head from 'next/head'
import { Header } from '../components/Header'
import type { GetServerSideProps } from 'next'
import { getSession } from "next-auth/react"

interface DonateProps {
    user : {
        name: string;
        email: string;
        image: string;
    }
}

export default function Donate ({user}:DonateProps) {
    return (
        <>
        <Head>
            <title>Ajuda a plataforma board ficar on-line</title>
        </Head>

        <Header />

        <main className={styles.container}>
            <img src="/images/rocket.svg" alt="Seja opoiador" />

            <div className={styles.vip}>
                <img src={user?.image} alt="Apoiador do projeto" />
                <span>Parabéns você é um novo apoiador!</span>
            </div>
            <h1>Seja um apoiador desse projeto</h1>
            <h3>Contribua com apenas <span>R$ 1,00</span> real.</h3>
            <strong>Apareça na nossa home, tenha funcionalidades exclusivas.</strong>
        </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {

    const session = await getSession({ req });

    if (!session?.user?.email) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const user = {
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image
    }

    return {
        props: {
            user
        }
    }
}