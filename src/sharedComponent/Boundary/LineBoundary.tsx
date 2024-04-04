import styles from '@/sharedComponentStyle/Boundary/LineBoundary.module.css';

function LineBoundary() {

    return(
        <article className={styles.container}>
            <div className={styles.wrapper}>
                <span className={styles.line}></span>
            </div>
        </article>
    )
}

export default LineBoundary;