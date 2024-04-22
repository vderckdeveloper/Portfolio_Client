import { useState } from "react";

// style
import styles from '@/styles/Admin/Dashboard/AdminDashboard.module.css';

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

interface AdminDashboardProps {
    blogData: BlogData[];
    error?: string;
}

function AdminDashboard(props: AdminDashboardProps) {

    const MenuItems = {
        DASHBOARD: 'DASHBOARD',
        LECTURE_ADD: 'LECTURE_ADD',
        LECTURE_SETTING: 'LECTURE_SETTING',
        LECTURE_OUTLINE_SETTING: 'LECTURE_OUTLINE_SETTING',
        LECTURE_REVIEW_SETTING: 'LECTURE_REVIEW_SETTING',
        LECTURE_SUGGESTION: 'LECTURE_SUGGESTION',
        LECTURE_PROMOTION_SETTING: 'LECTURE_PROMOTION_SETTING',
        COUPON_ADD: 'COUPON_ADD',
        COUPON_SETTING: 'COUPON_SETTING',
        USER_PROFILE: 'USER_PROFILE',
        CREATOR_PROFILE: 'CREATOR_PROFILE',
        PAYOUT: 'PAYOUT',
        SALES_REVENUE: 'SALES_REVENUE',
        NGINX_LOG: 'NGINX_LOG'
    };

    const [menu, setMenu] = useState(MenuItems.DASHBOARD);
    const [renderClassSubMenu, setRenderClassSubMenu] = useState(false);
    const [renderPromotionSubMenu, setRenderPromotionSubMenu] = useState(false);
    const [renderCouponSubMenu, setRenderCouponSubMenu] = useState(false);
    const [renderSalesSubMenu, setRenderSalesSubMenu] = useState(false);
    const [renderMonitorSubMenu, setRenderMonitorSubMenu] = useState(false);

    const onRenderClassSubMenu = () => {
        setRenderClassSubMenu(prevState => !prevState);
    }

    const onRenderPromotionSubMenu = () => {
        setRenderPromotionSubMenu(prevState => !prevState);
    }

    const onRenderCouponSubMenu = () => {
        setRenderCouponSubMenu(prevState => !prevState);
    }

    const onRenderSalesSubMenu = () => {
        setRenderSalesSubMenu(prevState => !prevState);
    }

    const onRenderMonitorSubMenu = () => {
        setRenderMonitorSubMenu(prevState => !prevState);
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
                        <p>강의</p>
                    </li>
                    {
                        renderClassSubMenu
                        &&
                        <section className={styles.subMenu}>
                            <div
                                className={menu === MenuItems.LECTURE_ADD ? styles.clicked : ''}
                                onClick={() => setMenu(MenuItems.LECTURE_ADD)}>강의 추가
                            </div>
                            <div
                                className={menu === MenuItems.LECTURE_SETTING ? styles.clicked : ''}
                                onClick={() => setMenu(MenuItems.LECTURE_SETTING)}>강의 설정
                            </div>
                            <div
                                className={menu === MenuItems.LECTURE_OUTLINE_SETTING ? styles.clicked : ''}
                                onClick={() => setMenu(MenuItems.LECTURE_OUTLINE_SETTING)}>강의 아웃라인 설정
                            </div>
                            <div
                                className={menu === MenuItems.LECTURE_SUGGESTION ? styles.clicked : ''}
                                onClick={() => setMenu(MenuItems.LECTURE_SUGGESTION)}>강의 제안
                            </div>
                        </section>
                    }
                    <li onClick={onRenderPromotionSubMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2 7C2 5.34315 3.34315 4 5 4H19C20.6569 4 22 5.34315 22 7V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V7ZM10 14V15C10 15.5523 10.4477 16 11 16C11.5523 16 12 15.5523 12 15V11C12 9.34315 10.6569 8 9 8C7.34315 8 6 9.34315 6 11V15C6 15.5523 6.44772 16 7 16C7.55228 16 8 15.5523 8 15V14H10ZM18 9C18 8.44772 17.5523 8 17 8C16.4477 8 16 8.44772 16 9V11H15.5C14.7287 11 14.0767 11.2992 13.6276 11.8044C13.1949 12.2912 13 12.9119 13 13.5C13 14.0881 13.1949 14.7088 13.6276 15.1956C14.0766 15.7008 14.7286 16 15.5 16H17C17.5523 16 18 15.5523 18 15V12.0065L18 12L18 11.9935V9Z" fill="#999999" />
                            <path d="M15.5 13H16V14H15.5C15.2714 14 15.1734 13.9242 15.1224 13.8669C15.0551 13.7912 15 13.6619 15 13.5C15 13.3381 15.0551 13.2088 15.1224 13.1331C15.1734 13.0758 15.2714 13 15.5 13Z" fill="#999999" />
                            <path d="M9 10C8.44772 10 8 10.4477 8 11V12H10V11C10 10.4477 9.55228 10 9 10Z" fill="#999999" />
                        </svg>
                        <p>프로모션</p>
                    </li>
                    {
                        renderPromotionSubMenu
                        &&
                        <section className={styles.subMenu}>
                            <div
                                className={menu === MenuItems.LECTURE_PROMOTION_SETTING ? styles.clicked : ''}
                                onClick={() => setMenu(MenuItems.LECTURE_PROMOTION_SETTING)}>강의 프로모션 설정
                            </div>
                        </section>

                    }
                    <li onClick={onRenderCouponSubMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                            <path d="M20,4H14V6.5a1,1,0,0,1-2,0V4H4A2,2,0,0,0,2,6V9a1,1,0,0,0,1,1,2,2,0,0,1,0,4,1,1,0,0,0-1,1v3a2,2,0,0,0,2,2h8V17.5a1,1,0,0,1,2,0V20h6a2,2,0,0,0,2-2V6A2,2,0,0,0,20,4Zm-6,9.83a1,1,0,0,1-2,0V10.17a1,1,0,0,1,2,0Z" fill="#999999" />
                        </svg>
                        <p>쿠폰</p>
                    </li>
                    {
                        renderCouponSubMenu
                        &&
                        <section className={styles.subMenu}>
                            <div className={menu === MenuItems.COUPON_ADD ? styles.clicked : ''} onClick={() => setMenu(MenuItems.COUPON_ADD)}>쿠폰 추가</div>
                            <div className={menu === MenuItems.COUPON_SETTING ? styles.clicked : ''} onClick={() => setMenu(MenuItems.COUPON_SETTING)}>쿠폰 설정</div>
                        </section>
                    }
                    <li className={menu === MenuItems.USER_PROFILE ? styles.clicked : ''} onClick={() => setMenu(MenuItems.USER_PROFILE)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#999999" width="30" height="30" viewBox="0 0 32 32" version="1.1">
                            <path d="M0 26.016q0 0.832 0.576 1.408t1.44 0.576h5.984v-1.984h-0.992q-0.416 0-0.704-0.288t-0.288-0.704 0.288-0.704 0.704-0.32h4q0.384 0 0.704 0.32t0.288 0.704-0.288 0.704-0.704 0.288h-0.992v1.984h12v-1.984h-1.024q-0.384 0-0.704-0.288t-0.288-0.704 0.288-0.704 0.704-0.32h4q0.416 0 0.704 0.32t0.32 0.704-0.32 0.704-0.704 0.288h-0.992v1.984h6.016q0.8 0 1.408-0.576t0.576-1.408v-20q0-0.832-0.576-1.408t-1.408-0.608h-28q-0.832 0-1.44 0.608t-0.576 1.408v20zM4 22.016v-14.016h14.016v14.016h-14.016zM7.040 20h7.936q-1.12-1.472-2.976-1.856v-0.32q0.896-0.352 1.44-1.088t0.576-1.728v-1.984q0-1.248-0.896-2.144t-2.112-0.864-2.144 0.864-0.864 2.144v1.984q0 0.96 0.544 1.728t1.472 1.088v0.32q-1.856 0.384-2.976 1.856zM20 22.016v-2.016h2.016v2.016h-2.016zM20 18.016v-2.016h10.016v2.016h-10.016zM20 14.016v-2.016h4v2.016h-4zM20 10.016v-2.016h6.016v2.016h-6.016zM26.016 14.016v-2.016h4v2.016h-4zM28 10.016v-2.016h2.016v2.016h-2.016z" />
                        </svg>
                        <p>회원</p>
                    </li>
                    <li className={menu === MenuItems.CREATOR_PROFILE ? styles.clicked : ''} onClick={() => setMenu(MenuItems.CREATOR_PROFILE)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#999999" version="1.1" id="Layer_1" width="30" height="30" viewBox="0 0 256 190" enableBackground="new 0 0 256 190">
                            <path d="M48.12,27.903C48.12,13.564,59.592,2,74.023,2c14.339,0,25.903,11.564,25.903,25.903  C99.834,42.335,88.27,53.806,74.023,53.806C59.684,53.806,48.12,42.242,48.12,27.903z M191,139h-47V97c0-20.461-17.881-37-38-37H43  C20.912,60,1.99,79.14,2,98v77c-0.026,8.533,6.001,12.989,12,13c6.014,0.011,12-4.445,12-13v-75h8v88h78v-88h8l0.081,50.37  c-0.053,8.729,5.342,12.446,10.919,12.63h60C207.363,163,207.363,139,191,139z M250.395,99.961  c-5.31,4.914-20.21-8.282-22.548-1.625c-2.576,7.292,12.364,12.205,11.017,19.101c-1.466,7.252-12.007,18.467-43.987,8.718  c-12.919-3.963-41.134-18.665-37.567-44.304c2.021-14.623,15.415-36.061,48.505-29.642c25.996,4.993,43.987,28.255,43.987,28.255  C257.845,91.599,252.178,98.336,250.395,99.961z M173.16,81.93c-3.289-0.832-6.658,1.228-7.45,4.518  c-0.832,3.289,1.228,6.657,4.518,7.45c3.289,0.832,6.657-1.228,7.45-4.518C178.51,86.091,176.449,82.723,173.16,81.93z   M187.545,73.133c0.832-3.289-1.228-6.657-4.518-7.45c-3.289-0.832-6.658,1.228-7.45,4.518c-0.832,3.289,1.228,6.657,4.518,7.45  C183.384,78.482,186.753,76.422,187.545,73.133z M184.811,97.226c-3.289-0.832-6.657,1.228-7.45,4.518  c-0.832,3.289,1.228,6.657,4.518,7.45c3.289,0.832,6.657-1.228,7.45-4.518C190.121,101.387,188.14,98.019,184.811,97.226z   M206.606,70.398c0.832-3.289-1.228-6.657-4.518-7.45c-3.289-0.832-6.657,1.228-7.45,4.518c-0.832,3.289,1.228,6.657,4.518,7.49  C202.445,75.748,205.814,73.727,206.606,70.398z M202.525,106.063c-3.289-0.832-6.657,1.228-7.45,4.518  c-0.832,3.289,1.228,6.657,4.518,7.45c3.289,0.832,6.658-1.228,7.45-4.518C207.835,110.185,205.814,106.856,202.525,106.063z" />
                        </svg>
                        <p>크리에이터</p>
                    </li>
                    <li onClick={onRenderSalesSubMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                            <path d="M20,2H4A2,2,0,0,0,2,4V16a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V4A2,2,0,0,0,20,2ZM11.5,9h1A2.5,2.5,0,0,1,13,14V14a1,1,0,0,1-2,0H10a1,1,0,0,1,0-2h2.5a.5.5,0,0,0,0-1h-1A2.5,2.5,0,0,1,11,6.05V6a1,1,0,0,1,2,0h1a1,1,0,0,1,0,2H11.5a.5.5,0,0,0,0,1ZM18,22H6a1,1,0,0,1,0-2H18a1,1,0,0,1,0,2Z" fill="#999999" />
                        </svg>
                        <p>매출</p>
                    </li>
                    {
                        renderSalesSubMenu
                        &&
                        <section className={styles.subMenu}>
                            <div className={menu === MenuItems.PAYOUT ? styles.clicked : ''} onClick={() => setMenu(MenuItems.PAYOUT)}>정산 내역</div>
                            <div className={menu === MenuItems.SALES_REVENUE ? styles.clicked : ''} onClick={() => setMenu(MenuItems.SALES_REVENUE)}>매출 내역</div>
                        </section>
                    }
                    <li onClick={onRenderMonitorSubMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                <g fill="#999999" fillRule="nonzero">
                                    <path d="M18.748832,2.99956021 C19.9914727,2.99956021 20.998832,4.00691952 20.998832,5.24956021 L20.998832,18.7518356 C20.998832,19.9944763 19.9914727,21.0018356 18.748832,21.0018356 L5.25,21.0018356 C4.00735931,21.0018356 3,19.9944763 3,18.7518356 L3,5.24956021 C3,4.00691952 4.00735931,2.99956021 5.25,2.99956021 L18.748832,2.99956021 Z M9.81174873,7.94888912 L8.25507761,11.4999967 L6.75,11.4999967 C6.33578644,11.4999967 6,11.8357864 6,12.25 C6,12.6642136 6.33578644,12.9999967 6.75,12.9999967 L8.74520225,12.9999967 C9.04297882,12.9999967 9.31255102,12.8238347 9.43210271,12.5511109 L10.4673733,10.1894297 L12.8037476,16.0239803 C13.0441901,16.6244294 13.8810422,16.6593182 14.1706295,16.0809663 L15.7133039,12.9999967 L17.25,12.9999967 C17.6642136,12.9999967 18,12.6642136 18,12.25 C18,11.8357864 17.6642136,11.4999967 17.25,11.4999967 L15.2500731,11.4999967 C14.9661478,11.4999967 14.7065634,11.66033 14.5794436,11.9142083 L13.5761806,13.9178842 L11.1949016,7.97119427 C10.9476691,7.35378892 10.0787603,7.33977663 9.81174873,7.94888912 Z">
                                    </path>
                                </g>
                            </g>
                        </svg>
                        <p>모니터링</p>
                    </li>
                    {
                        renderMonitorSubMenu
                        &&
                        <section className={styles.subMenu}>
                            <div className={menu === MenuItems.NGINX_LOG ? styles.clicked : ''} onClick={() => setMenu(MenuItems.NGINX_LOG)}>NGINX 로그</div>
                        </section>
                    }
                </nav>
                <section className={styles.main}>
                    {/* dashboard overview section */}
                    {
                        menu === MenuItems.DASHBOARD
                        &&
                        <p>예시</p>
                    }
                </section>
            </div>

        </article>
    );
}

export default AdminDashboard;