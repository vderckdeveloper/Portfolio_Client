import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import Logo from '../../../../public/Image/Logo/231019_Seoul_U_edu_Admin_Logo_Ver1.0.png';
import styles from '@/styles/Admin/Toolbar/AdminToolbar.module.css';

function AdminToolbar() {

    // page props
    const adminId = 'testid';

    // redux status
    const isLoggedin = true;

    // path name
    const pathName = usePathname();

    const onLogout = async () => {
        alert('로그아웃!');
        // axios.delete(`${process.env.NEXT_PUBLIC_URL}/admin/deleteAdminLogout`, {
        // })
        //     .then(() => {
        //         // if admin is in login page
        //         if (pathName === '/admin/login') {
        //             setAdminLogOut();
        //             alert('로그아웃 하셨습니다.');
        //             window.location.reload();
        //             return;
        //         }

        //         setAdminLogOut();
        //         alert('로그아웃 하셨습니다.');
        //         window.location.href = '/admin/login';
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
        //     })
    }

    return (
        <>
            <nav className={styles.toolbar}>
                <div>
                    <div className={styles.toolbar_Logo}>
                        <Link href="/admin/dashboard">
                            {/* <Image src={Logo} alt='Logo' style={{ height: 'auto' }} priority={true} /> */}
                        </Link>
                    </div>
                    <div className={styles.toolbar_account}>
                        {
                            isLoggedin
                                ?
                                <>
                                    <Link href="/admin/dashboard"><div>대쉬보드</div></Link>
                                    <div onClick={onLogout}>로그아웃</div>
                                </>
                                :
                                <>
                                    <Link href="/admin/login"><div>로그인</div></Link>
                                </>
                        }
                    </div>
                    <div className={styles.toolbar_mobile}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#ababab">
                            <path d="M3.5,7 C3.22385763,7 3,6.77614237 3,6.5 C3,6.22385763 3.22385763,6 3.5,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L3.5,7 Z M3.5,12 C3.22385763,12 3,11.7761424 3,11.5 C3,11.2238576 3.22385763,11 3.5,11 L20.5,11 C20.7761424,11 21,11.2238576 21,11.5 C21,11.7761424 20.7761424,12 20.5,12 L3.5,12 Z M3.5,17 C3.22385763,17 3,16.7761424 3,16.5 C3,16.2238576 3.22385763,16 3.5,16 L20.5,16 C20.7761424,16 21,16.2238576 21,16.5 C21,16.7761424 20.7761424,17 20.5,17 L3.5,17 Z" />
                        </svg>
                    </div>
                </div>
            </nav>
            {/* {
                //admin side bar mobile screen
                <AdminSidebarMobile adminId={adminId} ref={sidebarMobileRef}/>
            } */}
        </>

    );
}

export default AdminToolbar;