import Link from 'next/link';
import styles from '@/styles/404/Custom404.module.css';

function Custom404() {

    return(
        <div className={styles.container}>
            <div className={styles.wrapper }>
                <p className={styles.firstParagraph}>404</p>
                <p className={styles.secondParagraph}>요청하신 페이지를 찾을수 없습니다.</p>
                <p className={styles.thirdParagraph}>입력하신주소가 정확한지 다시한번 확인해주세요.</p>
                <Link href='/'>홈으로 가기</Link>
            </div>
        </div>
    );
}

export default Custom404;