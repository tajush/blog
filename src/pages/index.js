import Link from "next/link";
import { useState } from "react";

export default function Home({ blogs }) {
  const [blogList, setBlogList] = useState(blogs);

  const deleteBlog = (id) => {
    // Filter out the blog with the given ID
    setBlogList(blogList.filter((blog) => blog.id !== id));
  };

  return (
    <div>
      <h1>Blog Site</h1>
      {/* Link to create a new blog */}
      <Link href="/blog/create">
        <button className="bg-blue-500 text-white px-4 py-2 mb-4">Create New Blog</button>
      </Link>
      {/* List of blogs */}
      <ul>
        {blogList.map((blog) => (
          <li key={blog.id} className="border-b-2 pb-4 mb-4">
            <h2 className="text-lg font-bold">{blog.title}</h2>
            <p>{blog.body}</p>
            <div className="mt-2">
              {/* Link to edit the blog */}
              <Link href={`/blog/${blog.id}`}>
                <button className="bg-green-300 mr-4 px-4 py-2">Edit</button>
              </Link>
              {/* Delete button */}
              <button
                className="bg-red-700 text-white px-4 py-2"
                onClick={() => deleteBlog(blog.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const API_URL =
    process.env.NEXT_PUBLIC_BLOG_API_URL 

  if (!API_URL) {
    console.error("NEXT_PUBLIC_BLOG_API_URL is not defined.");
    return {
      props: { blogs: [] },
    };
  }

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      console.error("Failed to fetch blogs. Status:", response.status);
      return {
        props: { blogs: [] },
      };
    }

    const blogs = await response.json();

    return {
      props: { blogs: blogs.slice(0, 10) }, // Fetch only the first 10 blogs
    };
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    return {
      props: { blogs: [] },
    };
  }
}
