import MobileToolbar from "../Toolbar/MobileToolbar";
import Toolbar from "../Toolbar/Toolbar";
import MainBlog from "./MainBlog";
import MainProfie from "./MainProfile";
import BottomMargin from "@/sharedComponent/Margin/BottomMargin";
import LineBoundary from "@/sharedComponent/Boundary/LineBoundary";
import LeftDescription from "@/sharedComponent/Description/LeftDescription";
import MainCapability from "./MainCapability";
import CenterDescription from "../../sharedComponent/Description/CenterDescription";
import MainProject from "./MainProject";
import Footer from "../Footer/Footer";

import styles from '@/styles/Main/MainBody.module.css';

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

interface MainBodyProps {
    blogData: BlogData[];
    blogMainData: BlogData[];
    error?: string;
}

interface LeftDescriptionContent {
    title: string;
    body: string;
}

interface CenterDescriptionContent {
    title: string;
    body: string;
}

function MainBody(props: MainBodyProps) {

    // page props
    const blogData = props.blogData;
    const blogMainData = props.blogMainData;

    const CenterDescriptionContentOne: LeftDescriptionContent = {
        title: '프로필',
        body: '개발자 프로필'
    }

    const CenterDescriptionContentTwo: CenterDescriptionContent = {
        title: '프로젝트',
        body: '진행했던 프로젝트를 소개합니다.'
    }

    const LeftDescriptionContentOne: LeftDescriptionContent = {
        title: '최신글',
        body: '최신 글 목록'
    }

    const LeftDescriptionContentTwo: LeftDescriptionContent = {
        title: '전문 능력',
        body: '갖추고 있는 저의 능력을 소개합니다.'
    }

    return (
        <section className={styles.wrapper}>
            <MobileToolbar blogData={blogData} />
            <Toolbar />
            <LeftDescription content={LeftDescriptionContentOne}/>
            <MainBlog blogMainData={blogMainData} />
            <CenterDescription content={CenterDescriptionContentOne}/>
            <MainProfie />
            <LineBoundary />
            <BottomMargin />
            <LeftDescription content={LeftDescriptionContentTwo}/>
            <MainCapability />
            <CenterDescription content={CenterDescriptionContentTwo}/>
            <MainProject />
            <Footer />
        </section>
    );
}

export default MainBody;