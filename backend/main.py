from fastapi import FastAPI, File, UploadFile
from services.audio_extraction import extract_audio
from services.speech_to_text import speech_to_text
from services.summarize import summarize_text
from services.text_to_speech import text_to_speech
import shutil
import os

app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/upload/")
async def upload_video(file: UploadFile = File(...)):
    file_path = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    audio_path = extract_audio(file_path)
    transcript = speech_to_text(audio_path)
    summary = summarize_text(transcript)
    audio_summary_path = text_to_speech(summary)

    return {"summary": summary, "audio_summary": audio_summary_path}
