import styles from '@/styles/Sidebar/Sidebar.module.css';

function Sidebar() {

    return(
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div>
                    
                </div>
                <nav>
                    <ol>
                        <li>홈</li>
                        <li>자료구조</li>
                        <li>알고리즘</li>
                    </ol>
                </nav>
            </div>
        </section>
    )
}

export default Sidebar;