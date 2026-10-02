import { useState } from "react";
import UploadDocument from "@/components/Document/UploadDocument";
import Chat from "@/components/Document/Chat";

export default function DashboardHome() {
  const [activeDoc, setActiveDoc] = useState(null);

  return activeDoc ? (
    <Chat documentId={activeDoc.id} />
  ) : (
    <UploadDocument onUploaded={(res) => setActiveDoc(res)} />
  );
}
