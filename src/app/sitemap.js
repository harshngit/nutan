import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase.config";
import { getBlogPosts } from "./firebasefunctions";

const fetchBlogs = async () => {
  const data = []


}


export default async function sitemap() {
  const blogPosts = await getBlogPosts()

  const blogEntries = blogPosts.map((post) => ({
    url: `https://unionliving.in/blog/${post?.url}`, // Use the slug or ID for the URL
    lastModified: new Date(), // Use updatedAt or createdAt
    changeFrequency: 'weekly', // Adjust as needed
    priority: 0.8, // Adjust as needed
  }));

  return [
    {
      url: 'https://unionliving.in',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://unionliving.in/properties/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://unionliving.in/blogs/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://unionliving.in/ourstory/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://unionliving.in/property/southside-coliving-mahalaxmi/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://unionliving.in/property/terra-coliving-juhu/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://unionliving.in/property/varsity-coliving-juhu-santacruz/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://unionliving.in/property/housemate-coliving-kharadi-pune/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://unionliving.in/property/casa-coliving-andheri-east-mumbai/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://unionliving.in/property/hamlet-coliving-baner-pune/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://unionliving.in/property/bayside-coliving-seawoods-navi-mumbai/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://unionliving.in/property/abode-coliving-dhankawadi-pune/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://unionliving.in/property/chapter1-coliving-cbd-belapur/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://unionliving.in/community/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://unionliving.in/onboardingpolicy/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3,
    },
    {
      url: 'https://unionliving.in/termsandcondition/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3,
    },
    {
      url: 'https://unionliving.in/privacy-policy/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3,
    },
    ...blogEntries
  ]
}