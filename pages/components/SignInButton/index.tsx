import { useSession, signIn, signOut } from "next-auth/react"
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import styles from './styles.module.scss';

export function SignInButton() {

    const { data: session } = useSession();

    return session ? (
        <button
            type="button"
            className={styles.signInButton}
            onClick={() => signOut() }>
            <img src={session.user?.image} alt="Foto do usuário" />
            Olá {session.user?.name}
            <FiX color="#080808" className={styles.closedIcon} />
        </button>
    ) : (
        <button
            type="button"
            className={styles.signInButton}
            onClick={() => signIn() }>
            <FaGithub color="#FFB800" />
            Entrar com Github
        </button>
    )
}