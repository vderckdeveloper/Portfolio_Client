import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import sidebarProfileImage from '../../../public/image/sidebar/240405_sidebarProfile_Image_Ver1.0.png';
import styles from '@/styles/Sidebar/Sidebar.module.css';

function SidebarMobile() {

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

    // const onSidebarMenuClose = () => {
    //     ref.current.style.transform = 'translateX(100%)';
    // }

    return(
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
        </div>
    </section>
    );
}

export default SidebarMobile;