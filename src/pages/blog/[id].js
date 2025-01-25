import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function BlogDetails({ blog }) {
  const router = useRouter();
  const [editedBlog, setEditedBlog] = useState(blog || {});
  const [isEditing, setIsEditing] = useState(false);

  // Handle cases where the page is in fallback mode
  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  // Handle cases where no blog data is available
  if (!blog) {
    return <p>Blog not found!</p>;
  }

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Blog:", editedBlog); // Simulated save action
  };

  return (
    <div>
      <h1>Blog Details</h1>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedBlog.title}
            onChange={(e) => setEditedBlog({ ...editedBlog, title: e.target.value })}
          />
          <textarea
            value={editedBlog.body}
            onChange={(e) => setEditedBlog({ ...editedBlog, body: e.target.value })}
          ></textarea>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h2>{editedBlog.title}</h2>
          <p>{editedBlog.body}</p>
          <button className="bg-green-300 mr-4 px-4 py-2" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      )}
      <button onClick={() => router.push("/")}>Go Back</button>
    </div>
  );
}

export async function getStaticPaths() {
  const API_URL =
  process.env.NEXT_PUBLIC_BLOG_API_URL || (process.env.NODE_ENV === "development" && "http://localhost:3000/api");

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch blogs");
    const blogs = await response.json();

    const paths = blogs.slice(0, 10).map((blog) => ({
      params: { id: blog.id.toString() },
    }));

    return { paths, fallback: true }; // Support fallback mode
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    return { paths: [], fallback: true }; // Return empty paths to avoid build failure
  }
}

export async function getStaticProps({ params }) {
  const API_URL =
  process.env.NEXT_PUBLIC_BLOG_API_URL || (process.env.NODE_ENV === "development" && "http://localhost:3000/api");

  try {
    const response = await fetch(`API_URL/${params.id}`);
    if (!response.ok) throw new Error("Failed to fetch blog details");
    const blog = await response.json();

    return {
      props: { blog },
      revalidate: 10, // Optional: Incremental Static Regeneration (ISR)
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      notFound: true, // Return a 404 page if the blog is not found
    };
  }
}
