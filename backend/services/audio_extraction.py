import ffmpeg

def extract_audio(video_path):
    audio_path = video_path.replace(".mp4", ".wav")
    ffmpeg.input(video_path).output(audio_path).run(overwrite_output=True)
    return audio_path
