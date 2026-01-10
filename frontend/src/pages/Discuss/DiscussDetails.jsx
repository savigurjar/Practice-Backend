import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosClient from "../../utils/axiosClient";

function DiscussDetails() {
  const { id } = useParams();
  const [discuss, setDiscuss] = useState(null);

  useEffect(() => {
    axiosClient.get(`/discuss/${id}`).then((res) => {
      setDiscuss(res.data);
    });
  }, [id]);

  if (!discuss) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50 dark:bg-black text-black dark:text-white">
      <div className="max-w-3xl mx-auto bg-white dark:bg-black/40 p-6 rounded-2xl border border-gray-200 dark:border-white/10">
        <h1 className="text-3xl font-extrabold mb-2">{discuss.title}</h1>
        <p className="text-sm text-gray-500 dark:text-white/60 mb-6">
          By {discuss.author?.firstName} {discuss.author?.lastName}
        </p>

        <div className="whitespace-pre-wrap leading-relaxed">
          {discuss.content}
        </div>
      </div>
    </div>
  );
}

export default DiscussDetails;
