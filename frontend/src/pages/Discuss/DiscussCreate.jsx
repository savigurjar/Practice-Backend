import { useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { useNavigate } from "react-router";

function DiscussCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosClient.post("/discuss/create", { title, content });
      navigate("/discuss");
    } catch (err) {
      alert("Only admin can create discussions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-black text-black dark:text-white">
      <div className="max-w-3xl mx-auto bg-white dark:bg-black/40 p-6 rounded-2xl border border-gray-200 dark:border-white/10">
        <h1 className="text-2xl font-extrabold mb-6 text-emerald-500">
          ✍️ Create Discussion
        </h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-black/20"
          />

          <textarea
            placeholder="Write content..."
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-black/20 resize-none"
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DiscussCreate;
