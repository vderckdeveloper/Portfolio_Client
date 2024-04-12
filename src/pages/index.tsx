import Head from "next/head";

// components
import Main from "@/component/Main/Main";

// type
import { GetServerSidePropsContext } from 'next';

export default function Home() {
  return (
    <>
      <Head>
        <title>이승민 블로그</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const cookie = context.req.headers.cookie || '';

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_ON_SERVER_SIDE_PROPS}/getMainPage`, {
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

    console.log(data);

    const checkLoginStatus = data.checkLoginStatus;

    return { props: { } };

  } catch (err) {

    // fall back data 
    const fallBackData = {
      userId: '',
      lectureData: [],
      mainLectureReviewData: [],
    };

    const userId = fallBackData.userId;
    const lectureData = fallBackData.lectureData;
    const mainLectureReviewData = fallBackData.mainLectureReviewData;

    // log error
    console.log(err);

    const error = err as Error;
    const errorMessage = error.message;

    return { props: { userId: userId, lectureData: lectureData, mainLectureReviewData: mainLectureReviewData, error: errorMessage } };
  }

}
