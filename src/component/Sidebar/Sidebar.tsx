import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import sidebarProfileImage from '../../../public/image/sidebar/240405_sidebarProfile_Image_Ver1.0.png';
import styles from '@/styles/Sidebar/Sidebar.module.css';

function Sidebar() {

    const MenuItems = {
        HOME: 'HOME',
        DATA_STRUCTURE: 'DATA_STRUCTURE',
    };

    const [menu,setMenu] = useState(MenuItems.HOME);


    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.imageBox}>
                    <div>
                        <Image src={sidebarProfileImage} width={512} height={512} alt='사이드바 프로필 이미지'/>
                    </div>
                </div>
                <nav className={styles.categoryBox}>
                    <ol>
                        <Link className={ menu === MenuItems.HOME ? styles.active : ''} href={'/'} onClick={() => setMenu(MenuItems.HOME)}>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4cfde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <p>홈</p>
                            </li>
                        </Link>
                        <Link className={ menu === MenuItems.DATA_STRUCTURE ? styles.active : ''} href={'/'} onClick={() => setMenu(MenuItems.DATA_STRUCTURE)}>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4cfde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <p>자료구조</p>
                            </li>
                        </Link>
                        <Link href={'/'}>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4cfde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <p>알고리즘</p>
                            </li>
                        </Link>
                        <Link href={'/'}>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4cfde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <p>자바스크립트</p>
                            </li>
                        </Link>
                        <Link href={'/'}>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4cfde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <p>타입스크립트</p>
                            </li>
                        </Link>
                        <Link href={'/'}>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4cfde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                                <p>리액트</p>
                            </li>
                        </Link>
                        <Link href={'/'}>
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
    )
}

export default Sidebar;