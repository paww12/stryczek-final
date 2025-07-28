import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/adminSite'
        },
        sitemap: `${process.env.URL || 'https://slodkapetelka.pl'}/sitemap.xml`
    }
}