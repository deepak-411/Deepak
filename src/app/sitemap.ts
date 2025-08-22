import { MetadataRoute } from 'next'
 
const baseUrl = '';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl || '/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
     {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
