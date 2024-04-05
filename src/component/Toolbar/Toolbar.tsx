import styles from '@/styles/Toolbar/Toolbar.module.css';

function Toolbar() {
    
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <p>검색창</p>
            </div>
        </section>
    );
}

export default Toolbar;