import Image from "next/image";
import styles from '@/styles/Main/MainSeoulUeduProject.module.css';

// image
import mainSeoulUEduProjectSlideImageOne from '../../../public/image/main/mainProject/mainSeoulUEduProject/240417_mainSeoulUEdu_slideImage(1)_Ver1.0.jpg';
import mainSeoulUEduProjectSlideImageTwo from '../../../public/image/main/mainProject/mainSeoulUEduProject/240417_mainSeoulUEdu_slideImage(2)_Ver1.0.jpg';
import mainSeoulUEduProjectSlideImageThree from '../../../public/image/main/mainProject/mainSeoulUEduProject/240417_mainSeoulUEdu_slideImage(3)_Ver1.0.jpg';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

interface MainSeoulUEduProjectProps {
    onCloseSeoulUEduProject: () => void;
}

function MainSeoulUEduProject(props: MainSeoulUEduProjectProps) {

    const onCloseSeoulUEduProject = props.onCloseSeoulUEduProject;

    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.topSection}>
                    {/* close button */}
                    <div onClick={onCloseSeoulUEduProject}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 1024 1024">
                            <path fill="#ff014f" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path>
                        </svg>
                    </div>
                </div>
                <div className={styles.bodySection}>
                    <div className={styles.bodyLeftSection}>
                        <Swiper
                            slidesPerView={1}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                640: {
                                    slidesPerView: 1,
                                },
                                1024: {
                                    slidesPerView: 1,
                                },
                            }}
                            pagination={{ clickable: true }}
                            modules={[Autoplay, Pagination]}
                            className="mainProjectCardBox"
                        >
                            <SwiperSlide>
                                <div className={styles.cardview}>
                                    <Image src={mainSeoulUEduProjectSlideImageOne} width={800} height={600} alt='서울 유 에듀 프로젝트 슬라이드 첫번째 이미지' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.cardview}>
                                    <Image src={mainSeoulUEduProjectSlideImageTwo} width={800} height={600} alt='서울 유 에듀 프로젝트 슬라이드 두번째 이미지' />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.cardview}>
                                    <Image src={mainSeoulUEduProjectSlideImageThree} width={800} height={600} alt='서울 유 에듀 프로젝트 슬라이드 세번째 이미지' />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className={styles.bodyRightSection}>
                        <h2> 서울 유 에듀 공식 프로젝트</h2>
                        <h1> 서울 유 에듀의 공식 개발 프로젝트로, 1인 개발자인 본인이 기획, 디자인, 프론트엔드, 백엔드, DB 설계등을 포함 전부 개발한 서비스입니다.</h1>
                        <section>
                            <div>
                                <span>
                                    개발자
                                </span>
                                <span>
                                이승민
                                </span>
                            </div>
                            <div>
                                <span>
                                    개발 기간
                                </span>
                                <span>
                                18M (1년 6개월)
                                </span>
                            </div>
                            <div>
                                <span>
                                    서비스
                                </span>
                                <span>
                                    웹 / 웹앱
                                </span>
                            </div>
                            <div>
                                <span>
                                    사용 기술
                                </span>
                                <span>
                                    Next JS, Express, Maria DB, REDIS, NGINX, GOOGLE CLOUD PLATFORM
                                </span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MainSeoulUEduProject;