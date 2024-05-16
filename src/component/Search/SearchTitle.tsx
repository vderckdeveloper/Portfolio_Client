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

    // sort by blog_category and then by blog_title
    blogData.sort((a, b) => {
        // Sort by blog_category first
        const categoryALatin = /^[A-Za-z]/.test(a.blog_category);
        const categoryBLatin = /^[A-Za-z]/.test(b.blog_category);

        if (categoryALatin && !categoryBLatin) return -1;
        if (!categoryALatin && categoryBLatin) return 1;

        // If both categories are same language, use localeCompare
        const categoryCompare = a.blog_category.localeCompare(b.blog_category, categoryALatin ? 'en' : 'ko');
        if (categoryCompare !== 0) return categoryCompare;

        // If categories are identical, sort by blog_title
        const titleALatin = /^[A-Za-z]/.test(a.blog_title);
        const titleBLatin = /^[A-Za-z]/.test(b.blog_title);

        if (titleALatin && !titleBLatin) return -1;
        if (!titleALatin && titleBLatin) return 1;

        // If both titles are same language, use localeCompare
        return a.blog_title.localeCompare(b.blog_title, titleALatin ? 'en' : 'ko');
    });

    return (
        <section className={styles.wrapper}>
            <Sidebar blogData={blogData} />
            <SearchTitleBody blogData={blogData} blogSearchTitleData={blogSearchTitleData}/>
        </section>
    );
}

export default SearchTitle;