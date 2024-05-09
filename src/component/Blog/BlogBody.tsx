import MobileToolbar from "../Toolbar/MobileToolbar";
import Toolbar from "../Toolbar/Toolbar";
import BlogBodyContent from "./BlogBodyContent";
import Footer from "../Footer/Footer";

import styles from '@/styles/Blog/BlogBody.module.css';

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

interface BlogBodyProps {
    blogData: BlogData[];
    blogContentData: BlogData,
    error?: string;
}

function BlogBody(props: BlogBodyProps) {

    // page props
    const blogData = props.blogData;
    const blogContentData = props.blogContentData;

    return (
        <section className={styles.wrapper}>
            <MobileToolbar blogData={blogData} />
            <Toolbar />
            {
                blogContentData
                &&
                <BlogBodyContent blogContentData={blogContentData} />
            }
            <Footer />
        </section>
    );
}

export default BlogBody;