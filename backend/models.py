from sqlalchemy import Column, String, Text
from .db import Base

class VideoSummary(Base):
    __tablename__ = "video_summaries"

    id = Column(String, primary_key=True, index=True)
    video_url = Column(String, nullable=False)
    summary = Column(Text, nullable=False)
    user_id = Column(String, nullable=False)
