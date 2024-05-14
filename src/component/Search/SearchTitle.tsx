import Sidebar from "../Sidebar/Sidebar";
import SearchTitleBody from "./SearchTitleBody";
import styles from '@/styles/Search/SearchTitle.module.css';

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

interface SearchTitleProps {
    blogData: BlogData[];
    blogSearchTitleData: BlogData[];
    error?: string;
}

function SearchTitle(props: SearchTitleProps) {

    // page props
    const blogData = props.blogData;
    const blogSearchTitleData = props.blogSearchTitleData;

    return (
        <section className={styles.wrapper}>
            <Sidebar blogData={blogData} />
            <SearchTitleBody blogData={blogData} blogSearchTitleData={blogSearchTitleData}/>
        </section>
    );
}

export default SearchTitle;