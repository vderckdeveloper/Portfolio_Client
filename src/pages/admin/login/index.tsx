import Head from "next/head";

// components
import AdminToolbar from "@/component/Admin/Toolbar/AdminToolbar";
import AdminLogin from "@/component/Admin/Login/AdminLogin";
import AdminFooter from "@/component/Admin/Footer/AdminFooter";

// type
import { GetServerSidePropsContext } from 'next';

interface AdminLoginProps {
  adminId: string;
  checkLoginStatus: boolean;
  blogData: [];
  error?: string;
}

export default function AdminLoginPage({ adminId, checkLoginStatus, blogData, error }: AdminLoginProps) {
  return (
    <>
      <Head>
        <title>이승민 블로그</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="이승민" />
        <meta name="description" content="이승민 블로그의 관리자 화면" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminToolbar adminId={adminId} checkLoginStatus={checkLoginStatus} />
      <AdminLogin />
      <AdminFooter />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const cookie = context.req.headers.cookie || '';

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_ON_SERVER_SIDE_PROPS}/getAdminLoginPage`, {
      method: 'GET',
      headers: {
        Cookie: cookie
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // const data = await response.json();
    const data = await response.json();

    const adminId = data.adminId;
    const checkLoginStatus = data.checkLoginStatus;
    const blogData = data.blogData;

    return { props: { adminId: adminId, checkLoginStatus: checkLoginStatus, blogData: blogData } };

  } catch (err) {

    // fall back data 
    const fallBackData = {
      adminId: '',
      checkLoginStatus: false,
      blogData: [],
    };

    const adminId = fallBackData.adminId;
    const checkLoginStatus = fallBackData.checkLoginStatus;
    const blogData = fallBackData.blogData;

    // log error
    console.log(err);

    const error = err as Error;
    const errorMessage = error.message;

    return { props: { adminId: adminId, checkLoginStatus: checkLoginStatus, blogData: blogData, error: errorMessage } };
  }

}
