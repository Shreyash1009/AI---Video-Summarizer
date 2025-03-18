from fastapi import APIRouter, File, UploadFile, Depends
from ..services.audio_extraction import extract_audio
from ..services.speech_to_text import speech_to_text
from ..services.summarize import summarize_text
from ..services.text_to_speech import text_to_speech
from ..models import VideoSummary
from ..db import SessionLocal
from ..auth import get_current_user
import shutil
import uuid

router = APIRouter()

@router.post("/upload/")
async def upload_video(file: UploadFile = File(...), user=Depends(get_current_user)):
    video_id = str(uuid.uuid4())
    file_path = f"uploads/{video_id}.mp4"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    audio_path = extract_audio(file_path)
    transcript = speech_to_text(audio_path)
    summary = summarize_text(transcript)
    audio_summary_path = text_to_speech(summary)

    db = SessionLocal()
    db_summary = VideoSummary(id=video_id, video_url=file_path, summary=summary, user_id=user["id"])
    db.add(db_summary)
    db.commit()
    
    return {"summary": summary, "audio_summary": audio_summary_path}
