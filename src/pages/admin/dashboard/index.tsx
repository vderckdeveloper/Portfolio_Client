import Head from "next/head";

// components
import AdminToolbar from "@/component/Admin/Toolbar/AdminToolbar";
import AdminDashboard from "@/component/Admin/Dashboard/AdminDashboard";
import AdminFooter from "@/component/Admin/Footer/AdminFooter";

// type
import { GetServerSidePropsContext } from 'next';

interface AdminDashboardProps {
  adminId: string;
  checkLoginStatus: boolean;
  blogData: [];
  error?: string;
}

export default function AdminDashboardPage({ adminId, checkLoginStatus, blogData, error }: AdminDashboardProps) {
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
      <AdminDashboard blogData={blogData} error={error} />
      <AdminFooter />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const cookie = context.req.headers.cookie || '';

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_ON_SERVER_SIDE_PROPS}/getAdminDashboardPage`, {
      method: 'GET',
      headers: {
        Cookie: cookie
      },
      cache: 'no-store'
    });

    // redirect if admin is not logged-in
    if (response.status === 401) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }

    // throw error if response is not 200
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const adminId = data.adminId;
    const checkLoginStatus = data.checkLoginStatus;
    const blogData = data.blogData;

    // redirect an admin to the login page. 
    if (!checkLoginStatus) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }

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

    // redirect an admin to the login page. 
    const isCookiedIncluded = cookie && cookie.includes('login_session');
    if (!isCookiedIncluded) {
      return {
        redirect: {
          destination: '/admin/login',
          permanent: false,
        },
      };
    }

    // log error
    console.log(err);

    const error = err as Error;
    const errorMessage = error.message;

    return { props: { adminId: adminId, checkLoginStatus: checkLoginStatus, blogData: blogData, error: errorMessage } };
  }

}
