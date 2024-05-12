// component
import Head from 'next/head';
import Custom404 from '@/component/404/Custom404';

export default function Custom404Page() {
    return (
        <>
            <Head>
                <title>서울 유 에듀</title>
                <meta name="description" content="페이지를 찾을수 없습니다!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="robots" content="noindex, nofollow" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Custom404 />
        </>
    );

}
