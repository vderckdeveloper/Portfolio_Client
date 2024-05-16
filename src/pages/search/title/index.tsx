import Head from "next/head";

// components
import SearchTitle from "@/component/Search/SearchTitle";

// type
import { GetServerSidePropsContext } from 'next';

interface SearchTitleProps {
  adminId: string;
  checkLoginStatus: boolean;
  blogData: [];
  blogSearchTitleData: [];
  error?: string;
}

export default function Home({ adminId, checkLoginStatus, blogData, blogSearchTitleData, error }: SearchTitleProps) {
  return (
    <>
      <Head>
        <title>이승민 블로그</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="이승민" />
        <meta name="keywords" content="HTML, CSS, 자바스크립트, 타입스크립트, 리액트, NEXT JS, NGINX, PHP, NODE JS, EXPRESS, NEST JS, MYSQL, MARIA DB, DATABASE" />
        <meta name="description" content="개발자 이승민의 블로그입니다. 컴퓨터 공학 지식과 각종 지식을 한눈에 익혀보아요~! Space, where The Future Begins" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchTitle blogData={blogData} blogSearchTitleData={blogSearchTitleData} error={error} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const cookie = context.req.headers.cookie || '';
  const title = context.query.title;

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_ON_SERVER_SIDE_PROPS}/getSearchTitlePage?title=${title}`, {
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
    const blogSearchTitleData = data.blogSearchTitleData;

    return { props: { adminId: adminId, checkLoginStatus: checkLoginStatus, blogData: blogData, blogSearchTitleData: blogSearchTitleData } };

  } catch (err) {

    // fall back data 
    const fallBackData = {
      adminId: '',
      checkLoginStatus: false,
      blogData: [],
      blogSearchTitleData: [],
    };

    const adminId = fallBackData.adminId;
    const checkLoginStatus = fallBackData.checkLoginStatus;
    const blogData = fallBackData.blogData;
    const blogSearchTitleData = fallBackData.blogSearchTitleData;

    // log error
    console.log(err);

    const error = err as Error;
    const errorMessage = error.message;

    return { props: { adminId: adminId, checkLoginStatus: checkLoginStatus, blogData: blogData, blogSearchTitleData: blogSearchTitleData, error: errorMessage } };
  }

}
