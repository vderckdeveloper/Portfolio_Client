import { getServerSideSitemapLegacy } from 'next-sitemap';

export const getServerSideProps = async (context) => {

    // custom blog site map -- needs to be updated when adding blog post later
    const blogIndexList = [1,2,3,4,5];
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
const Sitemap = () => {};
export default Sitemap;