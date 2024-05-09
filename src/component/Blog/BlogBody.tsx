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
    error?: string;
}

function BlogBody(props: BlogBodyProps) {

    // page props
    const blogData = props.blogData;

    // fix the code below later, only the specific blog data should be retrived from database
    const blogSubdata = blogData.find(item => item.blog_index === 31);

    return (
        <section className={styles.wrapper}>
            <MobileToolbar blogData={blogData} />
            <Toolbar />
            {
                blogSubdata
                &&
                <BlogBodyContent blogSubData={blogSubdata}/>
            }
            <Footer />
        </section>
    );
}

export default BlogBody;