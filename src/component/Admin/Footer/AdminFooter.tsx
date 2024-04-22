import styles from '@/styles/Admin/Footer/AdminFooter.module.css';

function AdminFooter() {

    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <section>
                    <div>
                        <span>
                            개발자
                        </span>
                        <span>
                            이승민
                        </span>
                    </div>
                    <div>
                        <span>
                            이메일
                        </span>
                        <span>
                            vderckdeveloper@gmail.com
                        </span>
                    </div>
                </section>
                <p>Copyright © 2024 - Seungmin Lee. All right reserved.</p>
            </div>
        </section>
    )
}

export default AdminFooter;