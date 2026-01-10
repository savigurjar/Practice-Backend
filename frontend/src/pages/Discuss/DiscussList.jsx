import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { Link } from "react-router";

function DiscussList() {
  const [discusses, setDiscusses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/discuss")
      .then((res) => setDiscusses(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading discussions...</p>;
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-black text-black dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-emerald-500">
          📢 Discussions & Blogs
        </h1>

        <div className="space-y-5">
          {discusses.map((item) => (
            <Link
              key={item._id}
              to={`/discuss/${item._id}`}
              className="block p-5 bg-white dark:bg-black/40 border border-gray-200 dark:border-white/10 rounded-xl hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold mb-1">{item.title}</h2>
              <p className="text-sm text-gray-500 dark:text-white/60">
                By {item.author?.firstName} {item.author?.lastName} •{" "}
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiscussList;
