import Sidebar from "../Sidebar/Sidebar";
import MainBody from "./MainBody";
import styles from '@/styles/Main/Main.module.css';

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

interface MainProps {
    blogData: BlogData[];
    blogMainData: BlogData[];
    error?: string;
}

function Main(props: MainProps) {

    // page props
    const blogData = props.blogData;
    const blogMainData = props.blogMainData;

    return (
        <section className={styles.wrapper}>
            <Sidebar blogData={blogData} />
            <MainBody blogData={blogData} blogMainData={blogMainData} />
        </section>
    );
}

export default Main;