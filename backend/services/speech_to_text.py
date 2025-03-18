from google.cloud import speech

def speech_to_text(audio_path):
    client = speech.SpeechClient()
    with open(audio_path, "rb") as audio_file:
        audio = speech.RecognitionAudio(content=audio_file.read())
        config = speech.RecognitionConfig(encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16, language_code="en-US")

    response = client.recognize(config=config, audio=audio)
    return " ".join(result.alternatives[0].transcript for result in response.results)
