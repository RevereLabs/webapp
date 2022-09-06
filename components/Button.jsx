import React from 'react'
import styles from '../styles/Button.module.scss'
import Link from 'next/link';
function Button({Content, onClick, link='',Color}) {
    console.log({Content, onClick, link,Color});
    if (link) {
        return (

            <Link href={link}>
                <a className={styles.button}
                    style={{backgroundColor: Color}}>
                    {Content}
                </a>
            </Link>
        )
    }
    else {
        return (
            <button className={styles.button}
                onClick={onClick}
                style={{backgroundColor: Color}}>
                {Content}
            </button>
        )
    }
}

export default Button;
