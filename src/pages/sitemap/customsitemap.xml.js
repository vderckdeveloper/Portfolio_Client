import { getServerSideSitemapLegacy } from 'next-sitemap';

export const getServerSideProps = async (context: any) => {

    // custom blog site map -- needs to be updated when adding blog post later
    const blogIndexList: number[] = [5,6,7,10,11,12,23,24,25,28,29,34,35,57,58,59,60];
    const sitemapFields: any = blogIndexList.map((blogIndex) => {
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