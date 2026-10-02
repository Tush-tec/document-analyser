import { getDocuments } from "@/api/api";
import { requestHandler } from "@/utils/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DocumentList = () => {
  const router = useRouter();
  const activeId = router.query.id;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await requestHandler(
      async () => getDocuments(),
      setIsLoading,
      (res) => {
        setData(res.data);
      },
      (err) => {
        setError(err);
      },
    );
  };

  if (isLoading) return <p>Loader..................</p>;

  if (data.length === 0) {
    return (
      <div className="text-xs text-muted px-3 py-6 text-center">
        No documents yet.
        <br />
        Upload one to get started.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-1">
      {data.map((doc) => {
        const active = activeId === doc.id;
        return (
          <li key={doc.id}>
            <Link
              href={`/dashboard/${doc.id}`}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition group ${
                active
                  ? "bg-ocean-500/12 text-ocean-900 font-medium"
                  : "text-ink hover:bg-ocean-500/6"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={
                  active
                    ? "text-ocean-500"
                    : "text-muted group-hover:text-ocean-500"
                }
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
              <span className="truncate flex-1">{doc.original_name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DocumentList;
