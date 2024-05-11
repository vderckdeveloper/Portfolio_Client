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
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminToolbar />
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
