import MainProfie from "./MainProfile";
import BottomMargin from "@/sharedComponent/Margin/BottomMargin";
import LineBoundary from "@/sharedComponent/Boundary/LineBoundary";
import LeftDescription from "@/sharedComponent/Description/LeftDescription";
import MainCapability from "./MainCapability";
import CenterDescription from "../../sharedComponent/Description/CenterDescription";
import MainProject from "./MainProject";

import styles from '@/styles/Main/MainBody.module.css';

interface LeftDescriptionContent {
    title: string;
    body: string;
}

interface CenterDescriptionContent {
    title: string;
    body: string;
}

function MainBody() {

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