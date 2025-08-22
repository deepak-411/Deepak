import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://deepakpersonalprofile.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
     {
      url: 'https://deepakpersonalprofile.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}