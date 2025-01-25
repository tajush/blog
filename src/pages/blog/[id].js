import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function BlogDetails({ blog }) {
  const router = useRouter();
  const [editedBlog, setEditedBlog] = useState(blog);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved Blog:", editedBlog); // Simulated save action
  };

  if (!blog) return <p>Loading...</p>;

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
          <button className="bg-green-300 mr-4 px-4 py-2" onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
      <button onClick={() => router.push("/")}>Go Back</button>
    </div>
  );
}

export async function getStaticPaths() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BLOG_API_URL}`);
  const blogs = await response.json();

  const paths = blogs.slice(0, 10).map((blog) => ({
    params: { id: blog.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BLOG_API_URL}/${params.id}`);
  const blog = await response.json();

  return {
    props: { blog },
  };
}
