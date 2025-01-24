import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateBlog() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleCreate = () => {
    console.log("New Blog Created:", { title, body }); // Simulated create action
    router.push("/");
  };

  return (
    <div>
      {/* <h1>Create New Blog</h1> */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <button onClick={handleCreate}>Create</button>
      <button onClick={() => router.push("/")}>Cancel</button>
    </div>
  );
}
