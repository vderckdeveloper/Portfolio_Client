import MobileToolbar from "../Toolbar/MobileToolbar";
import Toolbar from "../Toolbar/Toolbar";
import Footer from "../Footer/Footer";
import SearchTitleResult from "./SearchTitleResult";
import SearchtitleNoResult from "./SearchTitleNoResult";
import styles from '@/styles/Search/SearchTitleBody.module.css';

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

interface SearchTitleBodyProps {
    blogData: BlogData[];
    blogSearchTitleData: BlogData[];
    error?: string;
}

function SearchTitleBody(props: SearchTitleBodyProps) {

    // page props
    const blogData = props.blogData;
    const blogSearchTitleData = props.blogSearchTitleData;

    return (
        <section className={styles.wrapper}>
            <MobileToolbar blogData={blogData} />
            <Toolbar />
            {
                blogSearchTitleData.length > 0
                ?
                <SearchTitleResult blogSearchTitleData={blogSearchTitleData} />
                :
                <SearchtitleNoResult />
            }
            <Footer />
        </section>
    );
}

export default SearchTitleBody;