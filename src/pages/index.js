// import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";
// import Blog from "@/components/Blog";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function Home() {
//   return (
//     <div><Blog/></div>
//   );
// }


import Link from "next/link";
import { useState } from "react";

export default function Home({ blogs }) {
  const [blogList, setBlogList] = useState(blogs);

  const deleteBlog = (id) => {
    setBlogList(blogList.filter((blog) => blog.id !== id));
  };

  return (
    <div>
      <h1>Blog Site</h1>
      {/* <Link href="/blog/create">
        <button>Create New Blog</button>
      </Link> */}
      <ul>
        {blogList.map((blog) => (
          <li key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.body}</p>
            <Link href={`/blog/${blog.id}`}>
              <button className="bg-green-300 mr-4 px-4 py-2">Edit</button>
            </Link>
            <button className="bg-red-700  px-4 py-2" onClick={() => deleteBlog(blog.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BLOG_API_URL}`);
  const blogs = await response.json();

  return {
    props: { blogs: blogs.slice(0, 10) }, // Fetch only the first 10 blogs
  };
}
