import Link from 'next/link';
import styles from './styles.module.scss';
import { SignInButton } from '../SignInButton'

export function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/">
                    <img src="/images/logo.svg" alt="Logo meu board" />
                </Link>
                <nav>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                    <Link href="/board">
                        <a>Meu Board</a>
                    </Link>
                    <Link href="/dsonate">
                        <a>Donate</a>
                    </Link>
                </nav>

                <SignInButton />

            </div>
        </div>
    )
}