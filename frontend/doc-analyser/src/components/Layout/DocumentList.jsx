import Link from "next/link";
import { useRouter } from "next/router";

// TODO: fetch from /api/v1/documents
const MOCK_DOCS = [
  { id: "1", name: "Employment Contract.pdf" },
  { id: "2", name: "NDA - Acme Corp.pdf" },
  { id: "3", name: "Service Agreement.docx" },
];

export default function DocumentList() {
  const router = useRouter();
  const activeId = router.query.id;

  if (MOCK_DOCS.length === 0) {
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
      {MOCK_DOCS.map((doc) => {
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
              <span className="truncate flex-1">{doc.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
