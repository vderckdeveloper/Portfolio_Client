import Sidebar from "../Sidebar/Sidebar";
import BlogBody from "./BlogBody";
import styles from '@/styles/Blog/Blog.module.css';

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

interface BlogProps {
    blogData: BlogData[];
    error?: string;
}

function Blog(props: BlogProps) {

    // page props
    const blogData = props.blogData;

    return (
        <section className={styles.wrapper}>
            <Sidebar blogData={blogData} />
            <BlogBody blogData={blogData} />
        </section>
    );
}

export default Blog;