/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
    siteUrl: process.env.NEXT_SITE_MAP_URL || 'https://seungmindev.com',
    generateRobotsTxt: true,
    changefreq: 'daily',
    generateIndexSitemap: false,
    sitemapSize: 7000,
    priority: 1,
    exclude: [
        '/admin',
        '/admin/*',
        '/search/title',
        '/test',
    ],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin',
                    '/admin/*',
                    '/search/title',
                    '/test',
                ]
            },
        ],
        additionalSitemaps: [
            `${process.env.NEXT_SITE_MAP_URL}/sitemap/customsitemap.xml`,
        ],
    }
}

module.exports = sitemapConfig;