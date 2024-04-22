import { useState, useEffect } from 'react';
import Image from 'next/image';
import seoulUeduProjectCoverImage from '../../../public/image/main/mainProject/240404_seoulUEdu_projectCover_image.png';
import portfolioProjectCoverImage from '../../../public/image/main/mainProject/240404_portfolio_projectCover_image.png';
import rebelProjectCoverImage from '../../../public/image/main/mainProject/240404_rebel_projectCover_image.png';
import styles from '@/styles/Main/MainProject.module.css';

// component
import MainSeoulUEduProject from './MainSeoulUEduProject';
import MainPortfolioProject from './MainPortfolioProject';
import LineNotification from '../Notification/LineNotification';

function MainProject() {

    // render project
    const [renderSeoulUEduProject, setRenderSeoulUeduProject] = useState(false);
    const [renderPortfolioProject, setRenderPortfolioProject] = useState(false);

    // render line notification
    const [renderLineNotification, setRenderLineNotification] = useState(false);

    // line notification
    const [lineNotificationText, setLineNotifcationText] = useState('');

    const onOpenSeoulUEduProject = () => {
        setRenderSeoulUeduProject(true);
    }

    const onCloseSeoulUEduProject = () => {
        setRenderSeoulUeduProject(false);
    }

    const onOpenPortfolioProject = () => {
        setRenderPortfolioProject(true);
    }

    const onClosePortfolioProject = () => {
        setRenderPortfolioProject(false);
    }

    const onOpenTheRebelProject = () => {
        // render line notifcation
        setLineNotifcationText('인터네셔널 커뮤니티 The Rebel은 아직 개발 착수전입니다. 조금만 기다려주세요.');
        setRenderLineNotification(true);
    }

    // hide line notification
    useEffect(() => {
        if (renderLineNotification === true) {
            const timeOut = setTimeout(() => setRenderLineNotification(false), 1500);
            return () => {
                clearTimeout(timeOut);
            }
        }
    }, [renderLineNotification]);

    return (
        <>
            <section className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.cardviewBox}>
                        <div className={styles.cardview} onClick={onOpenSeoulUEduProject}>
                            <div className={styles.imageBox}>
                                <Image src={seoulUeduProjectCoverImage} width={400} height={295} alt='서울 유 에듀 프로젝트 커버 이미지' quality={100} />
                            </div>
                            <div className={styles.categoryBox}>
                                <p>Gallery</p>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <g strokeWidth="0" />
                                        <g strokeLinecap="round" strokeLinejoin="round" />
                                        <g>
                                            <path d="M12 9.66003V12.45L13.4 13.85" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M5.5 12C5.5 8.41 8.41 5.5 12 5.5C15.59 5.5 18.5 8.41 18.5 12C18.5 14.08 17.52 15.94 16 17.13H15.99C14.89 17.99 13.51 18.5 12 18.5C10.51 18.5 9.14 18 8.04 17.15H8.03C6.49 15.96 5.5 14.1 5.5 12Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.03003 17.15H8.04003C9.14003 18 10.51 18.5 12 18.5C13.51 18.5 14.89 17.99 15.99 17.13H16L15.49 19.6C15 21.5 13.9 22 12.55 22H11.46C10.11 22 9.00003 21.5 8.52003 19.59L8.03003 17.15Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.03003 6.85H8.04003C9.14003 6 10.51 5.5 12 5.5C13.51 5.5 14.89 6.01 15.99 6.87H16L15.49 4.4C15 2.5 13.9 2 12.55 2H11.46C10.11 2 9.00003 2.5 8.52003 4.41L8.03003 6.85Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg>
                                    <span>18M</span>
                                </div>
                            </div>
                            <div className={styles.textBox}>
                                <p>서울 유 에듀 공식 프로젝트 - 온라인 디지털 컨텐츠 플랫폼</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
                                    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#ff014f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className={styles.cardview} onClick={onOpenPortfolioProject}>
                            <div className={styles.imageBox}>
                                <Image src={portfolioProjectCoverImage} width={400} height={295} alt='서울 유 에듀 프로젝트 커버 이미지' quality={100} />
                            </div>
                            <div className={styles.categoryBox}>
                                <p>Gallery</p>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <g strokeWidth="0" />
                                        <g strokeLinecap="round" strokeLinejoin="round" />
                                        <g>
                                            <path d="M12 9.66003V12.45L13.4 13.85" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M5.5 12C5.5 8.41 8.41 5.5 12 5.5C15.59 5.5 18.5 8.41 18.5 12C18.5 14.08 17.52 15.94 16 17.13H15.99C14.89 17.99 13.51 18.5 12 18.5C10.51 18.5 9.14 18 8.04 17.15H8.03C6.49 15.96 5.5 14.1 5.5 12Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.03003 17.15H8.04003C9.14003 18 10.51 18.5 12 18.5C13.51 18.5 14.89 17.99 15.99 17.13H16L15.49 19.6C15 21.5 13.9 22 12.55 22H11.46C10.11 22 9.00003 21.5 8.52003 19.59L8.03003 17.15Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.03003 6.85H8.04003C9.14003 6 10.51 5.5 12 5.5C13.51 5.5 14.89 6.01 15.99 6.87H16L15.49 4.4C15 2.5 13.9 2 12.55 2H11.46C10.11 2 9.00003 2.5 8.52003 4.41L8.03003 6.85Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg>
                                    <span>3M</span>
                                </div>
                            </div>
                            <div className={styles.textBox}>
                                <p>개인 프로젝트 - 포트폴리오 및 블로그</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
                                    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#ff014f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className={styles.cardview} onClick={onOpenTheRebelProject}>
                            <div className={styles.imageBox}>
                                <Image src={rebelProjectCoverImage} width={400} height={295} alt='서울 유 에듀 프로젝트 커버 이미지' quality={100} />
                            </div>
                            <div className={styles.categoryBox}>
                                <p>Gallery</p>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <g strokeWidth="0" />
                                        <g strokeLinecap="round" strokeLinejoin="round" />
                                        <g>
                                            <path d="M12 9.66003V12.45L13.4 13.85" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M5.5 12C5.5 8.41 8.41 5.5 12 5.5C15.59 5.5 18.5 8.41 18.5 12C18.5 14.08 17.52 15.94 16 17.13H15.99C14.89 17.99 13.51 18.5 12 18.5C10.51 18.5 9.14 18 8.04 17.15H8.03C6.49 15.96 5.5 14.1 5.5 12Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.03003 17.15H8.04003C9.14003 18 10.51 18.5 12 18.5C13.51 18.5 14.89 17.99 15.99 17.13H16L15.49 19.6C15 21.5 13.9 22 12.55 22H11.46C10.11 22 9.00003 21.5 8.52003 19.59L8.03003 17.15Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.03003 6.85H8.04003C9.14003 6 10.51 5.5 12 5.5C13.51 5.5 14.89 6.01 15.99 6.87H16L15.49 4.4C15 2.5 13.9 2 12.55 2H11.46C10.11 2 9.00003 2.5 8.52003 4.41L8.03003 6.85Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg>
                                    <span>6M</span>
                                </div>
                            </div>
                            <div className={styles.textBox}>
                                <p>REBEL 공식 프로젝트 - 인터네셔널 커뮤니티 플랫폼</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
                                    <path d="M7 17L17 7M17 7H8M17 7V16" stroke="#ff014f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {
                renderSeoulUEduProject
                &&
                <MainSeoulUEduProject onCloseSeoulUEduProject={onCloseSeoulUEduProject} />
            }
            {
                renderPortfolioProject
                &&
                <MainPortfolioProject onClosePortfolioProject={onClosePortfolioProject} />
            }
            {
                renderLineNotification
                &&
                <LineNotification lineNotificationText={lineNotificationText}/>
            }
        </>
    )
}

export default MainProject;