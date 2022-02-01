import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import { format } from 'date-fns'

import { firestore } from '../services/firebaseConnection' //instancia de conexão com o banco
import { getDoc, doc } from "@firebase/firestore"

import styles from './board.module.scss'
import Head from 'next/head'
import { Header } from '../components/Header'
import { FiCalendar } from 'react-icons/fi'

type Task = {
    id: string;
    dateFormated?: string;
    tarefa: string;
}

interface PropsData {
    data: String;
}

function Detail({ data }:PropsData ) {

    const docTask = JSON.stringify(data); // converte o valor string(data) para obejto JSON
    const task = JSON.parse(docTask) as Task; // converte para um objet javascript
    
    return (
        <>
            <Head>
                <title>Detalhas da tarefa</title>
            </Head>

            <Header />

            <article className={styles.container}>
                <div className={styles.actions}>
                    <div>
                        <FiCalendar size={30} color="#FFF" />
                        <span>Tarefa criada:</span>
                        <time>{task.dateFormated}</time>
                    </div>
                </div>
                <p>{task.tarefa}</p>
            </article>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    // pega o parametro
    const id  = params;
    // pega a sessão
    const session = await getSession({ req });
    // se o user não estiver logado
    if (!session?.user?.email) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const docRef = doc(firestore, "tarefas", String(id));
    const docSnap = await getDoc(docRef);
    const data = {
        id: docSnap.id,
        dateFormated: format(new Date(), 'dd MMMM yyyy'),
        tarefa: docSnap.data()?.tarefa,
    }

    const user = {
        name: session?.user.name,
        email: session?.user.email
    }

    return {
        props: {
            user,
            data
        }
    }
}

export default Detail;