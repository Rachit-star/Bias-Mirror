import React, { useRef } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import { toast } from "react-toastify";

export default function UploadCard() {
  const ref = useRef();

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    try {
      toast.info("Uploading...");
      const res = await api.post("/upload", fd, { headers: { "Content-Type": "multipart/form-data" }});
      toast.success("Uploaded");
      console.log(res.data);
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  return (
    <motion.div className="upload-card" whileHover={{ scale: 1.01 }}>
      <input ref={ref} type="file" accept=".txt,.md,.docx" style={{ display: "none" }} onChange={onFile} />
      <button className="btn ghost" onClick={() => ref.current && ref.current.click()}>Upload File</button>
      <p className="muted small">Supported: .txt, .md — extracted as plain text for analysis</p>
    </motion.div>
  );
}
