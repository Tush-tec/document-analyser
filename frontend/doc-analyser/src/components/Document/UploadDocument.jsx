import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import AppLayout from "@/components/Layout/AppLayout";
import { useAuth } from "@/utils/Context/AuthContext";
import { requestHandler } from "@/utils/app";
import { uploadDocuments } from "@/api/api";

const UploadDocument = () => {
  const router = useRouter();
  const [dragging, setDragging] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await requestHandler(
      async () => uploadDocuments(formData),
      setIsLoading,
      (res) => {
        console.log("res == 27", res);
        toast.success(res.message);
        setIsChatOpen(true);
      },
      (err) => {
        toast.error(err);
      },
    );
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  if (isLoading) return <p>Loading............................</p>;

  return (
    <div className="h-full flex items-center justify-center p-10">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-ocean-900 tracking-tight">
          Analyse your documents
        </h1>
        <p className="text-muted mt-2 mb-8">
          Upload a contract, ask questions, get answers with citations.
        </p>

        {/* Dropzone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          className={`cursor-pointer rounded-3xl p-14 border-2 border-dashed transition backdrop-blur-md ${
            dragging
              ? "border-ocean-500 bg-ocean-500/10"
              : "border-ocean-500/25 bg-white/60 hover:border-ocean-500/50 hover:bg-white/80"
          }`}
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-ocean-500 to-ocean-700 grid place-items-center shadow-[0_12px_28px_-10px_rgba(30,111,217,0.7)]">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path
                d="M12 16V4M12 4l-4 4M12 4l4 4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="text-ocean-900 font-semibold text-lg">
            {dragging ? "Drop it here" : "Drop a file or click to browse"}
          </p>
          <p className="text-muted text-sm mt-1">
            PDF, DOCX, TXT — up to 20 MB
          </p>

          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>

        <p className="text-xs text-muted mt-6">
          Or pick a document from the sidebar to continue a conversation.
        </p>
      </div>
    </div>
  );
};

export default UploadDocument;
