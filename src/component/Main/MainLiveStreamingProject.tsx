import Image from "next/image";
import styles from '@/styles/Main/MainLiveStreamingProject.module.css';

// image
import mainLiveStreamingImageOne from '../../../public/image/main/mainProject/mainLiveStreamingProject/240922_mainLiveStreaming_slideImage(1)_Ver1.0.png';
import mainLiveStreamingImageTwo from '../../../public/image/main/mainProject/mainLiveStreamingProject/240922_mainLiveStreaming_slideImage(2)_Ver1.0.png';
import mainLiveStreamingImageThree from '../../../public/image/main/mainProject/mainLiveStreamingProject/240922_mainLiveStreaming_slideImage(3)_Ver1.0.png';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

interface MainLiveStreamingProjectProps {
    onCloseLiveStreamingProject: () => void;
}

function MainLiveStreamingProject(props: MainLiveStreamingProjectProps) {

    const onCloseLiveStreamingProject = props.onCloseLiveStreamingProject;

    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.topSection}>
                    {/* close button */}
                    <div onClick={onCloseLiveStreamingProject}>
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
                                    <Image src={mainLiveStreamingImageOne} width={800} height={600} alt='개인 블로그 및 포트폴리오 슬라이드 첫번째 이미지' quality={100} />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.cardview}>
                                    <Image src={mainLiveStreamingImageTwo} width={800} height={600} alt='개인 블로그 및 포트폴리오 슬라이드 두번째 이미지' quality={100} />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.cardview}>
                                    <Image src={mainLiveStreamingImageThree} width={800} height={600} alt='개인 블로그 및 포트폴리오 슬라이드 세번째 이미지' quality={100} />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className={styles.bodyRightSection}>
                        <h2> 다자간 화상회의 프로젝트</h2>
                        <h1> N:M 화상회의를 위한 프로젝트로, 1인 개발자인 본인이 기획, 디자인, 프론트엔드, 백엔드, DB 설계등을 포함 전부 개발한 서비스입니다.</h1>
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
                                    1M (1개월)
                                </span>
                            </div>
                            <div>
                                <span>
                                    서비스
                                </span>
                                <span>
                                    웹 
                                </span>
                            </div>
                            <div>
                                <span>
                                    사용 기술
                                </span>
                                <span>
                                    Next JS, Nest JS, Redis, Nginx, Docker, Jenkins, Amazon Web Services
                                </span>
                            </div>
                        </section>
                        <a href='https://liveedumeet.com'>
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
                    <p>2024년 7월에서 2024년 8월까지, 로그인이 필요없는 WebRTC 기반의 N:M 화상회의 프로젝트를 개발하였습니다.</p>
                    <p>반응형 플랫폼으로 PC, 태블릿, 모바일에서 전부 이용가능합니다. Stun 서버를 통한 Mesh 방식으로 연결되며, Peer To Peer 커넥션이 제대로 되지 않을시는 Turn 서버를 이용해 라이브 스트리밍을 연결합니다.</p>
                    <figure className={styles.imageBox}>
                        <Image src={mainLiveStreamingImageOne} width={800} height={600} alt='서울 유 에듀 프로젝트 슬라이드 첫번째 이미지' quality={100} />
                        <figcaption>설계 사진</figcaption>
                    </figure>
                    <p>프로젝트의 메인페이지입니다.
                    </p>
                    <figure className={styles.imageBox}>
                        <Image src={mainLiveStreamingImageTwo} width={800} height={600} alt='서울 유 에듀 프로젝트 슬라이드 두번째 이미지' quality={100} />
                        <figcaption>프로젝트 사진</figcaption>
                    </figure>
                    <p>프로젝트의 사진입니다. PC, 태블릿, 모바일에서 자유로운 구동이 가능합니다.</p>
                </div>
            </div>
        </section>
    );
}

export default MainLiveStreamingProject;