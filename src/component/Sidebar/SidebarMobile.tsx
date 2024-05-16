import { useState, useMemo, forwardRef, ForwardedRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import sidebarProfileImage from '../../../public/image/sidebar/240405_sidebarProfile_Image_Ver1.0.png';
import styles from '@/styles/Sidebar/SidebarMobile.module.css';

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

interface CategoryMap {
    [key: string]: BlogData[];
}

interface SidebarMobileProps {
    blogData: BlogData[];
    error?: string;
}

type SidebarMobileRef = ForwardedRef<HTMLElement>;


// eslint-disable-next-line react/display-name
const SidebarMobile = forwardRef((props: SidebarMobileProps, ref: SidebarMobileRef) => {

    // page props
    const blogData = props.blogData;

    // home menu
    const homeMenu = 'HOME';

    // router
    const router = useRouter();

    // blog index
    const blogIndex = router.query.index;
    const blogIndexToNum = typeof blogIndex === 'string' ? parseInt(blogIndex) : null;

    // initial category
    const selectedBlogData = blogData.find(item => item.blog_index === blogIndexToNum);
    const selectedBlogCategory = selectedBlogData?.blog_category;

    // state
    const [menu, setMenu] = useState(blogIndex ? '' : homeMenu);
    const [openCategory, setOpenCategory] = useState<Record<string, boolean>>(selectedBlogCategory ? { [selectedBlogCategory]: true } : {});
    const [activePost, setActivePost] = useState<number | null>(blogIndexToNum ? blogIndexToNum : null);

    // blog category data
    const categoryData = useMemo(() => {
        const categoryMap: CategoryMap = {};
        blogData.forEach(blog => {
            if (!categoryMap[blog.blog_category]) {
                categoryMap[blog.blog_category] = [];
            }
            categoryMap[blog.blog_category].push(blog);
        });
        return categoryMap;
    }, [blogData]);

    // blog menu list
    const menuList = Object.entries(categoryData);

    // toggle category
    const toggleCategory = (category: string) => {
        if (openCategory[category]) {
            setMenu('');
        } else {
            setActivePost(null);
        }

        setOpenCategory(prevState => ({
            ...prevState,
            [category]: !prevState[category]
        }));
    };

    // handle post click
    const handlePostClick = (postIndex: number) => {
        setMenu('');
        setActivePost(postIndex);
    };

    const onSidebarMenuClose = () => {

        // Type assertion to specify ref is a MutableRefObject
        const currentRef = ref as React.MutableRefObject<HTMLElement | null>;

        if (!currentRef.current) {
            return;
        }

        currentRef.current.style.transform = 'translateX(100%)';
    }

    return (
        <section className={styles.container} ref={ref}>
            <div className={styles.wrapper}>
                {/* 사이드바 닫기 */}
                <div className={styles.closeBox}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1024 1024" onClick={onSidebarMenuClose}>
                        <path fill="#ff014f" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z" />
                    </svg>
                </div>
                {/* 이미지 */}
                <div className={styles.imageBox}>
                    <div>
                        <Image src={sidebarProfileImage} width={512} height={512} alt='사이드바 프로필 이미지' />
                    </div>
                </div>
                {/* 메뉴 카테고리 */}
                <nav className={styles.categoryBox}>
                    <ol>
                        {/* home */}
                        <div>
                            <Link className={menu === homeMenu ? styles.active : ''} href={`/`} onClick={() => { setMenu(homeMenu); onSidebarMenuClose(); }}>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4cfde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                    <p>홈</p>
                                </li>
                            </Link>
                        </div>
                        {/* menu list */}
                        {
                            menuList.map((item, index) => {

                                const [category, posts] = item;

                                return (
                                    <div key={index}>
                                        <div className={menu === category ? styles.active : ''} onClick={() => { setMenu(category); toggleCategory(category); }}>
                                            <li>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c4cfde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                                </svg>
                                                <p>{category}</p>
                                            </li>
                                        </div>
                                        {
                                            openCategory[category]
                                            &&
                                            posts.map(post => {
                                                return (
                                                    <Link key={post.blog_index} className={activePost === post.blog_index ? styles.blogPostActive : styles.blogPost} href={`/blog?index=${post.blog_index}`} onClick={() => { handlePostClick(post.blog_index); onSidebarMenuClose(); }}>
                                                        <div >{post.blog_title}</div>
                                                    </Link>
                                                );
                                            })
                                        }
                                    </div>
                                );
                            })
                        }
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
                        <a className={styles.contactCell} href="https://www.youtube.com/@persistenttitan">
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
        </section>
    );
});

export default SidebarMobile;