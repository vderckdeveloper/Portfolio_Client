import Head from "next/head";

// components
import Blog from "@/component/Blog/Blog";

// type
import { GetServerSidePropsContext } from 'next';

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

interface BlogProps {
  adminId: string;
  checkLoginStatus: boolean;
  blogData: BlogData[];
  blogContentData: BlogData,
  error?: string;
}

export default function BlogPage({ adminId, checkLoginStatus, blogData, blogContentData, error }: BlogProps) {
  return (
    <>
      <Head>
        <title>이승민 블로그</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="이승민" />
        <meta name="keywords" content="HTML, CSS, 자바스크립트, 타입스크립트, 리액트, NEXT JS, NGINX, PHP, NODE JS, EXPRESS, NEST JS, MYSQL, MARIA DB, DATABASE" />
        <meta name="description" content="개발자 이승민의 블로그입니다. 컴퓨터 공학 지식과 각종 지식을 한눈에 익혀보아요~! Space, where The Future Begins" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Blog blogData={blogData} blogContentData={blogContentData} error={error} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const cookie = context.req.headers.cookie || '';
  const blogIndex = context.query.index;

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_ON_SERVER_SIDE_PROPS}/getBlogPage?index=${blogIndex}`, {
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
    const blogContentData = data.blogContentData;

    return { props: { adminId: adminId, checkLoginStatus: checkLoginStatus, blogContentData: blogContentData, blogData: blogData } };

  } catch (err) {

    // fall back data 
    const fallBackData = {
      adminId: '',
      checkLoginStatus: false,
      blogData: [],
      blogContentData: undefined,
    };

    const adminId = fallBackData.adminId;
    const checkLoginStatus = fallBackData.checkLoginStatus;
    const blogData = fallBackData.blogData;
    const blogContentData = fallBackData.blogContentData;

    // log error
    console.log(err);

    const error = err as Error;
    const errorMessage = error.message;

    return { props: { adminId: adminId, checkLoginStatus: checkLoginStatus, blogData: blogData, blogContentData: blogContentData, error: errorMessage } };
  }

}
