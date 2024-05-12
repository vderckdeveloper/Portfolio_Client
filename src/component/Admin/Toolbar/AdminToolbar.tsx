import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// import Logo from '../../../../public/Image/Logo/231019_Seoul_U_edu_Admin_Logo_Ver1.0.png';
import styles from '@/styles/Admin/Toolbar/AdminToolbar.module.css';

interface AdminToolbarProps {
    adminId: string;
    checkLoginStatus: boolean;
}

function AdminToolbar(props: AdminToolbarProps) {

    // page props
    const adminId = props.adminId;
    const checkLoginStatus = props.checkLoginStatus;

    // check login status
    const isLoggedin = checkLoginStatus;

    // ref
    const isReqReady = useRef<boolean>(true);

    // log out
    const onLogout = () => {

        // disable button while sending request
        if (!isReqReady.current) {
            return;
        }

        isReqReady.current = false;

        fetch(`${process.env.NEXT_PUBLIC_URL}/admin/deleteAdminLogout`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    // Throw an error with status and response text
                    throw {
                        status: response.status,
                        statusText: response.statusText,
                        errorMessage: text
                    };
                });
            }
            return;
        })
            .then(() => {
                alert('로그아웃 하셨습니다!');
                window.location.href = '/admin/logout';
            })
            .catch((error) => {
                const statusCode = error.status;
                if (statusCode === 401) {
                    alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
                    return;
                }
                alert('연결에 실패 했습니다.');
            })
            .finally(() => {
                isReqReady.current = true;
            });
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
                </div>
            </nav>
        </>

    );
}

export default AdminToolbar;