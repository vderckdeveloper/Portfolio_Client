import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import sidebarProfileImage from '../../../public/image/sidebar/240405_sidebarProfile_Image_Ver1.0.png';
import styles from '@/styles/Sidebar/Sidebar.module.css';

function Sidebar() {

    const MenuItems = {
        HOME: 'HOME',
        DATA_STRUCTURE: 'DATA_STRUCTURE',
        ALGORITHM: 'ALGORITHM',
        JAVASCRIPT: 'JAVASCRIPT',
        TYPESCRIPT: 'TYPESCRIPT',
        REACT: 'REACT',
        NEXTJS: 'NEXTJS'
    };

    const [menu, setMenu] = useState(MenuItems.HOME);


    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                {/* 이미지 */}
                <div className={styles.imageBox}>
                    <div>
                        <Image src={sidebarProfileImage} width={512} height={512} alt='사이드바 프로필 이미지' />
                    </div>
                </div>
                {/* 메뉴 카테고리 */}
                <nav className={styles.categoryBox}>
                    <ol>
                        {/* 홈 메뉴 */}
                        <Link className={menu === MenuItems.HOME ? styles.active : ''} href={'/'} onClick={() => setMenu(MenuItems.HOME)}>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4cfde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <p>홈</p>
                            </li>
                        </Link>
                        {/* 자료구조 메뉴 */}
                        <Link className={menu === MenuItems.DATA_STRUCTURE ? styles.active : ''} href={'/'} onClick={() => setMenu(MenuItems.DATA_STRUCTURE)}>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4cfde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <p>자료구조</p>
                            </li>
                        </Link>
                        {/* 알고리즘 메뉴 */}
                        <Link className={menu === MenuItems.ALGORITHM ? styles.active : ''} href={'/'} onClick={() => setMenu(MenuItems.ALGORITHM)}>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4cfde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <p>알고리즘</p>
                            </li>
                        </Link>
                        {/* 자바스크립트 메뉴 */}
                        <Link className={menu === MenuItems.JAVASCRIPT ? styles.active : ''} href={'/'} onClick={() => setMenu(MenuItems.JAVASCRIPT)}>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4cfde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <p>자바스크립트</p>
                            </li>
                        </Link>
                        {/* 타입스크립트 메뉴 */}
                        <Link className={menu === MenuItems.TYPESCRIPT ? styles.active : ''} href={'/'} onClick={() => setMenu(MenuItems.TYPESCRIPT)}>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4cfde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <p>타입스크립트</p>
                            </li>
                        </Link>
                        {/* 리액트 메뉴 */}
                        <Link className={menu === MenuItems.REACT ? styles.active : ''} href={'/'} onClick={() => setMenu(MenuItems.REACT)}>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4cfde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <p>리액트</p>
                            </li>
                        </Link>
                        {/* Next JS 메뉴 */}
                        <Link className={menu === MenuItems.NEXTJS ? styles.active : ''} href={'/'} onClick={() => setMenu(MenuItems.NEXTJS)}>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4cfde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <p>Next JS</p>
                            </li>
                        </Link>
                    </ol>
                </nav>
                {/* contact box */}
                <div className={styles.contactBox}>
                    <h2>링크</h2>
                    <div>
                        <a className={styles.contactCell} href="mailto:vderckdeveloper@gmail.com?Subject=연락하고%20싶어요!" target="_top">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="3" y="5" width="18" height="14" rx="2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </a>
                        <a className={styles.contactCell} href="https://github.com/vderckdeveloper" target="_blank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" stroke="none">
                                <g strokeWidth="0" />
                                <g strokeLinecap="round" strokeLinejoin="round" />
                                <g>
                                    <rect width="24" height="24" fill="none" />
                                    <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z" />
                                </g>
                            </svg>
                        </a>
                        <a className={styles.contactCell} href="https://www.youtube.com/@itestablishmentmundol">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" version="1.1" id="Icons" viewBox="0 0 32 32" fill="#ffffff" stroke="#ffffff">
                                <g strokeWidth="0" />
                                <g strokeLinecap="round" strokeLinejoin="round" />
                                <g>
                                    <path d="M31.4,8.6c-0.2-1.6-1.6-3-3.3-3.1c-9.8-0.7-14.6-0.7-24.3,0C2.2,5.6,0.8,7,0.6,8.6c-0.8,5.9-0.8,8.9,0,14.8 c0.2,1.6,1.7,3,3.3,3.1C8.7,26.8,12.4,27,16,27s7.3-0.2,12.2-0.5c1.6-0.1,3-1.5,3.3-3.1C32.2,17.5,32.2,14.5,31.4,8.6z M21.1,17.7 l-6,4C14.8,21.9,14.4,22,14,22c-0.3,0-0.7-0.1-0.9-0.2c-0.7-0.4-1.1-1-1.1-1.8V12c0-0.8,0.4-1.4,1.1-1.8c0.7-0.4,1.4-0.3,2.1,0.1 l6,4c0.6,0.4,0.9,1,0.9,1.7S21.7,17.3,21.1,17.7z" />
                                </g>
                            </svg>
                        </a>
                    </div>

                </div>
            </div>
        </section >
    )
}

export default Sidebar;