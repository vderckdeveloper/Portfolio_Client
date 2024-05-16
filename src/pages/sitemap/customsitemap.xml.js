import { getServerSideSitemapLegacy } from 'next-sitemap';

export const getServerSideProps = async (context) => {

    // custom blog site map -- needs to be updated when adding blog post later
    const blogIndexList = [32, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64];
    const sitemapFields = blogIndexList.map((blogIndex) => {
        return {
            loc: `${process.env.NEXT_SITE_MAP_URL}/blog?index=${blogIndex}`,
            lastmod: new Date().toISOString(),
            changefreq: 'daily',
            priority: 1,
        }
    });

    // add more dynamic site map here below

    return getServerSideSitemapLegacy(context, sitemapFields);
}

// prevent build error
const Sitemap = () => { };
export default Sitemap;