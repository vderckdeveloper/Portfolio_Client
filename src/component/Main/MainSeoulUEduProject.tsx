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
                                    <Image src={mainSeoulUEduProjectSlideImageOne} width={800} height={600} alt='서울 유 에듀 프로젝트 슬라이드 첫번째 이미지' quality={100} />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.cardview}>
                                    <Image src={mainSeoulUEduProjectSlideImageTwo} width={800} height={600} alt='서울 유 에듀 프로젝트 슬라이드 두번째 이미지' quality={100} />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.cardview}>
                                    <Image src={mainSeoulUEduProjectSlideImageThree} width={800} height={600} alt='서울 유 에듀 프로젝트 슬라이드 세번째 이미지' quality={100} />
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
                                    Next JS, Express, Maria DB, Redis, Nginx, Google Cloud Platform
                                </span>
                            </div>
                        </section>
                        <a href='https://seouluedu.com'>
                            <p>프로젝트 보기</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#c4cfde" width="18" height="18" version="1.1" viewBox="0 0 492.004 492.004">
                                <g>
                                    <g>
                                        <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12    c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028    c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265    c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z">
                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.bottomSection}>
                    <p>2022년 8월에서 2023년 2월까지 서울 유 에듀의 공식 프로젝트를 개발하였습니다. 기존 워드프레스를 이용하여 개발하였던 사이트를 리뉴얼하여, 성공적으로 플랫폼을 이전하였습니다.</p>
                    <p>반응형 플랫폼으로 PC, 태블릿, 모바일에서 전부 이용가능합니다. Next js를 이용하여, 페이지 사이의 이동이 자유로움과 동시에 SEO 최적화가 가능한 비즈니스 플랫폼을 구상하여 설계하였습니다.</p>
                    <p>2024년 4월 현재, Google Lighthouse 기준으로 SEO 점수는 100점입니다.</p>
                    <p>chat gpt4 api를 삽입하여, 학습자가 실시간으로 질문 / 답변을 할수있도록 만들었고, 서비스에 방문한 모든 유저가 최대 20개의 질문이 가능하도록 하여 접근성을 높였습니다. 유료 유저는 최대 100개까지 질문이 가능합니다.</p>
                    <p>유저가 물건을 담고 결제 이동시까지의 경로를 최적화(로그인후 상품을담고 장바구니에서 결제화면이 열리기까지 5초 이내)하여 편의성을 높였고 토스,이니시스,카카오 결제 모듈을 도입하였습니다.</p>
                    <p>구글 로그인 ,카카오 로그인을 삽입하였습니다.</p>
                    <p>유저 시스템, 크리에이터 시스템, 관리자 시스템등 총 3개의 경로를 지정하여 플랫폼을 개발하였습니다.</p>
                    <p>DB 설계의 경우, aqueytool을 이용하여 직접 ERD를 그렸고, 이를 바탕으로 설계를 진행하였습니다.</p>
                    <figure className={styles.imageBox}>
                        <Image src={mainSeoulUEduProjectSlideImageOne} width={800} height={600} alt='서울 유 에듀 프로젝트 슬라이드 첫번째 이미지' quality={100} />
                        <figcaption>설계 사진</figcaption>
                    </figure>
                    <p>프로젝트의 설계 구조입니다. 프론트엔드의 폴더 구조 및 백엔드의 폴더 구조를 도식화하여 나타내었고, DB ERD 구조 또한 도식화하여 총 33개의 테이블 관계를 간략히 표현하였습니다.
                        프론트엔드 프로젝트의 경우, SPA 와 MPA의 장점을 혼합한 Next js를 차용하여 구성하였습니다. 
                        백엔드 프로젝트의 경우, 설계 변경이 자유로운 express를 통해 controller, router, middleware 구조로 구성하였습니다.
                        DB의 경우 mysql 보다 성능이 뛰어난 maria db를 차용하여 schema를 구성하였습니다.
                    </p>
                    <figure className={styles.imageBox}>
                        <Image src={mainSeoulUEduProjectSlideImageTwo} width={800} height={600} alt='서울 유 에듀 프로젝트 슬라이드 두번째 이미지' quality={100} />
                        <figcaption>프로젝트 사진</figcaption>
                    </figure>
                    <p>프로젝트의 사진입니다. PC, 태블릿, 모바일에서 자유로운 구동이 가능하며, PWA(Progressive Web Application)기술을 차용하여 모바일 앱으로 이용가능합니다.</p>
                </div>
            </div>
        </section>
    );
}

export default MainSeoulUEduProject;