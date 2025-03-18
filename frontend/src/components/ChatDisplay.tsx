import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatInterface() {
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState([{ text: "Upload a video to summarize!", sender: "bot" }]);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("http://localhost:8000/upload/", formData);
    setMessages([...messages, { text: "Processing...", sender: "bot" }, { text: response.data.summary, sender: "bot" }]);
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-4 rounded-lg shadow-lg text-white">
      <div className="overflow-y-auto h-64 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded-lg ${msg.sender === "bot" ? "bg-gray-700 text-white" : "bg-blue-600"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <Input type="file" className="flex-1" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <Button onClick={handleUpload} className="ml-2 bg-blue-600">Upload</Button>
      </div>
    </div>
  );
}
