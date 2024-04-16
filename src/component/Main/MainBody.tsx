import MobileToolbar from "../Toolbar/MobileToolbar";
import Toolbar from "../Toolbar/Toolbar";
import MainProfie from "./MainProfile";
import BottomMargin from "@/sharedComponent/Margin/BottomMargin";
import LineBoundary from "@/sharedComponent/Boundary/LineBoundary";
import LeftDescription from "@/sharedComponent/Description/LeftDescription";
import MainCapability from "./MainCapability";
import CenterDescription from "../../sharedComponent/Description/CenterDescription";
import MainProject from "./MainProject";

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

    const LeftDescriptionContent: LeftDescriptionContent = {
        title: '전문 능력',
        body: '갖추고 있는 저의 능력을 소개합니다.'
    }

    const CenterDescriptionContent: CenterDescriptionContent = {
        title: '프로젝트',
        body: '진행했던 프로젝트를 소개합니다.'
    }

    return (
        <section className={styles.wrapper}>
            <MobileToolbar blogData={blogData} />
            <Toolbar />
            <MainProfie />
            <LineBoundary />
            <BottomMargin />
            <LeftDescription content={LeftDescriptionContent}/>
            <MainCapability />
            <CenterDescription content={CenterDescriptionContent}/>
            <MainProject />
        </section>
    );
}

export default MainBody;