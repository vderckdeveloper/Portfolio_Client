import { useState } from "react";

// style
import styles from '@/styles/Admin/Dashboard/AdminDashboard.module.css';

// component
import AdminBlogCreate from "./Blog/AdminBlogCreate";
import AdminBlogSetting from "./Blog/AdminBlogSetting";

interface BlogData {
    blog_index: number;
    blog_uniqueNum: number;
    admin_identification: string;
    blog_category: string;
    blog_title: string;
    blog_content: string;
    register_date: Date;
    edit_date: string;
    delete_date: string;
    register_ip: string;
    edit_ip: string;
    delete_ip: string;
    blog_is_deleted: boolean;
    blog_is_approved: boolean;
}

interface AdminDashboardProps {
    blogData: BlogData[];
    error?: string;
}

function AdminDashboard(props: AdminDashboardProps) {

    // page props
    const blogData = props.blogData;

    const MenuItems = {
        DASHBOARD: 'DASHBOARD',
        BLOG_CREATE: 'BLOG_CREATE',
        BLOG_UPDATE: 'BLOG_UPDATE',
        BLOG_DELETE: 'BLOG_DELETE',
    };

    const [menu, setMenu] = useState(MenuItems.DASHBOARD);
    const [renderClassSubMenu, setRenderClassSubMenu] = useState(false);

    const onRenderClassSubMenu = () => {
        setRenderClassSubMenu(prevState => !prevState);
    }


    return (
        <article className={styles.container}>
            <div className={styles.wrapper}>
                <nav className={styles.sidebar}>
                    <li className={menu === MenuItems.DASHBOARD ? styles.clicked : ''} onClick={() => setMenu(MenuItems.DASHBOARD)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#999999" width="30" height="30" viewBox="-4.5 0 32 32" version="1.1">
                            <path d="M19.469 12.594l3.625 3.313c0.438 0.406 0.313 0.719-0.281 0.719h-2.719v8.656c0 0.594-0.5 1.125-1.094 1.125h-4.719v-6.063c0-0.594-0.531-1.125-1.125-1.125h-2.969c-0.594 0-1.125 0.531-1.125 1.125v6.063h-4.719c-0.594 0-1.125-0.531-1.125-1.125v-8.656h-2.688c-0.594 0-0.719-0.313-0.281-0.719l10.594-9.625c0.438-0.406 1.188-0.406 1.656 0l2.406 2.156v-1.719c0-0.594 0.531-1.125 1.125-1.125h2.344c0.594 0 1.094 0.531 1.094 1.125v5.875z" />
                        </svg>
                        <p>대쉬보드</p>
                    </li>
                    <li onClick={onRenderClassSubMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#999999" version="1.1" width="30" height="30" viewBox="0 0 31.666 31.666">
                            <g>
                                <g>
                                    <path d="M30.073,17.717c0-0.881-0.715-1.595-1.596-1.595H3.188c-0.881,0-1.595,0.714-1.595,1.595v1.014h1.968V29.3    c0,1.308,1.06,2.366,2.365,2.366h19.862c1.308,0,2.365-1.061,2.365-2.366V18.73h1.92V17.717L30.073,17.717z" />
                                    <path d="M21.858,11.793h1.436c1.054,0,1.91-0.866,1.91-1.919V1.54c0-0.85-0.697-1.54-1.549-1.54s-1.551,0.69-1.551,1.54v7.154    h-1.357c-0.373-0.246-0.817-0.393-1.297-0.393h-7.216c-1.335,0-2.428,1.102-2.428,2.437v3.81h12.052V11.793z" />
                                    <circle cx="15.844" cy="3.463" r="3.462" />
                                </g>
                            </g>
                        </svg>
                        <p>블로그</p>
                    </li>
                    {
                        renderClassSubMenu
                        &&
                        <section className={styles.subMenu}>
                            <div
                                className={menu === MenuItems.BLOG_CREATE ? styles.clicked : ''}
                                onClick={() => setMenu(MenuItems.BLOG_CREATE)}>블로그 작성
                            </div>
                            <div
                                className={menu === MenuItems.BLOG_UPDATE ? styles.clicked : ''}
                                onClick={() => setMenu(MenuItems.BLOG_UPDATE)}>블로그 수정
                            </div>
                            <div
                                className={menu === MenuItems.BLOG_DELETE ? styles.clicked : ''}
                                onClick={() => setMenu(MenuItems.BLOG_DELETE)}>블로그 삭제
                            </div>
                        </section>
                    }
                </nav>
                <section className={styles.main}>
                    {/* dashboard overview section */}
                    {
                        menu === MenuItems.DASHBOARD
                        &&
                        <p>대쉬보드 홈 화면</p>
                    }
                    {/* blog add section */}
                    {
                        menu === MenuItems.BLOG_CREATE
                        &&
                        <AdminBlogCreate />
                    }
                    {/* blog setting section */}
                    {
                        menu === MenuItems.BLOG_UPDATE
                        &&
                        <AdminBlogSetting blogData={blogData}/>
                    }
                </section>
            </div>

        </article>
    );
}

export default AdminDashboard;