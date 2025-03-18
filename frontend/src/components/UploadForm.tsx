import { useState } from "react";
import axios from "axios";

function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("http://localhost:8000/upload/", formData);
    setSummary(response.data.summary);
    setAudioUrl(`http://localhost:8000/${response.data.audio_summary}`);
  };

  return (
    <div className="p-4 border rounded">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button className="bg-blue-500 text-white p-2 mt-2" onClick={handleUpload}>Upload</button>
      {summary && <p className="mt-4">{summary}</p>}
      {audioUrl && <audio controls src={audioUrl}></audio>}
    </div>
  );
}

export default UploadForm;
