import { useState } from "react";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", image: null });
  const [editIndex, setEditIndex] = useState(null);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result }); // Save image as Base64
      };
      reader.readAsDataURL(file);
    }
  };

  // Add or update a blog
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedBlogs = blogs.map((blog, index) =>
        index === editIndex ? form : blog
      );
      setBlogs(updatedBlogs);
      setEditIndex(null);
    } else {
      setBlogs([...blogs, form]);
    }
    setForm({ title: "", description: "", image: null });
  };

  // Delete a blog
  const handleDelete = (index) => {
    const filteredBlogs = blogs.filter((_, i) => i !== index);
    setBlogs(filteredBlogs);
  };

  // Edit a blog
  const handleEdit = (index) => {
    setForm(blogs[index]);
    setEditIndex(index);
  };

  return (
    <div className="mr-auto ml-auto max-w-[600px]">
      <h1>Blogs</h1>
      

      {/* Blog Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "10px", color:"black", width: "100%" }}
        />
        <textarea
          name="description"
          placeholder="Blog Description"
          value={form.description}
          onChange={handleChange}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%", color:"black" }}
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          required={!form.image} // Only required if no image is set
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <button type="submit" style={{ display: "block" }}>
          {editIndex !== null ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      {/* Blog List */}
      <div>
        {blogs.length === 0 ? (
          <p>No blogs available</p>
        ) : (
          blogs.map((blog, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h2>{blog.title}</h2>
              <p>{blog.description}</p>
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                />
              )}
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
