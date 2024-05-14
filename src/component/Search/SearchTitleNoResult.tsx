import Link from 'next/link';
import styles from '@/styles/Search/SearchTitleNoResult.module.css';

function SearchtitleNoResult() {

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <p className={styles.firstParagraph}>검색결과 없음</p>
                <p className={styles.secondParagraph}>검색결과를 찾을수 없습니다.</p>
                <p className={styles.thirdParagraph}>다른 키워드로 다시 검색해주세요!</p>
                <Link href='/'>홈으로 가기</Link>
            </div>
        </div>
    );
}

export default SearchtitleNoResult;