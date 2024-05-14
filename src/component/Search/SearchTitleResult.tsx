import Link from 'next/link';
import styles from '@/styles/Search/SearchTitleResult.module.css';

// utils
import { truncateString } from '../../../utils/utils';

interface BlogData {
    blog_index: number;
    blog_uniqueNum: number;
    admin_identification: string;
    blog_category: string;
    blog_title: string;
    blog_content: string;
    register_date: string;
    edit_date: string;
    delete_date: string;
    register_ip: string;
    edit_ip: string;
    delete_ip: string;
    blog_is_deleted: boolean;
    blog_is_approved: boolean;
}

interface SearchTitleResultProps {
    blogSearchTitleData: BlogData[];
    error?: string;
}

interface SearchTitleResultContentProps {
    index: number;
    title: string;
    category: string;
    content: string;
}

const extractKoreanText = (jsonText: string) => {
    const data = JSON.parse(jsonText);
    const blocks = data.blocks;
    let koreanText = '';

    for (const block of blocks) {
        // Extracting and concatenating Korean characters and preserving spaces within the text
        const matches = block.text.match(/[ㄱ-ㅎ가-힣\s]+/g);
        if (matches) {
            koreanText += matches.join('') + ' '; // Add space after each block's text
        }
        // Stop if we have 100 or more characters, taking care not to slice in the middle of a word
        if (koreanText.length >= 100) {
            koreanText = koreanText.slice(0, 100).trim();
            break;
        }
    }

    return koreanText.trim();
};

function SearchTitleResultContent(props: SearchTitleResultContentProps) {

    const index = props.index;
    const title = props.title;
    const category = props.category;
    const contentJson = props.content;
    const content = extractKoreanText(contentJson);

    const titleFormatted = truncateString(title, 20);
    const contentFormatted = truncateString(content, 100);

    return (
        <Link className={styles.cardview} href={`/blog?index=${index}`} >
            <div className={styles.cardviewTop}>
                <h2>{titleFormatted}</h2>
                <div>
                    {category}
                </div>
            </div>
            <div className={styles.cardviewBottom}>
                {contentFormatted}
            </div>
        </Link>
    );
}

function SearchTitleResult(props: SearchTitleResultProps) {

    // page props
    const blogSearchTitleData = props.blogSearchTitleData;

    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                {
                    blogSearchTitleData.map((item) => {

                        return (
                            <SearchTitleResultContent
                                key={item.blog_index}
                                index={item.blog_index}
                                title={item.blog_title}
                                category={item.blog_category}
                                content={item.blog_content}
                            />
                        );
                    })
                }

            </div>
        </section>
    )
}

export default SearchTitleResult;