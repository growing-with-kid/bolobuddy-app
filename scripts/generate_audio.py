"""
Generate bedtime story audio via Sarvam AI TTS with:
- Slower delivery: pace = 0.82 (~18% slower than default)
- Warmer tone (bulbul:v2 only): pitch = -0.06 (~8% lower)
- Pauses: 800ms after each sentence, 1500ms after each paragraph

Requires: SARVAM_API_KEY or SARVAM_API_SUBSCRIPTION_KEY in env.
"""
import os
import re
import json
import hashlib
import tempfile
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Optional, Tuple
from pydub import AudioSegment
from sarvamai import SarvamAI
from sarvamai.play import save
import textwrap

OUTPUT_DIR = "outputs"
Path(OUTPUT_DIR).mkdir(exist_ok=True)

# TTS delivery: ~15–20% slower, warmer/lower register when pitch is supported
SPEAKING_PACE = 0.82   # ~18% slower than default 1.0 (Sarvam uses "pace")
PITCH_LOWER = -0.06    # ~8% lower/warmer (bulbul:v2 only; range -0.75 to 0.75)

# Pauses for the child to absorb each "image" before the next
SILENCE_AFTER_SENTENCE_MS = 800
SILENCE_AFTER_PARAGRAPH_MS = 1500


def split_into_segments(text: str) -> List[Tuple[str, int]]:
    """
    Split text into (segment, silence_after_ms) pairs.
    - Sentence-ending period / ! / ? → 800ms silence.
    - Paragraph break (\\n\\n) → 1500ms silence after the last sentence of that paragraph.
    """
    segments = []
    paragraphs = re.split(r"\n\s*\n", text.strip())

    for p_idx, para in enumerate(paragraphs):
        para = para.strip()
        if not para:
            continue
        # Split on sentence boundaries (keep the delimiter by using a lookahead if needed)
        sentences = re.split(r"(?<=[.!?])\s+", para)
        sentences = [s.strip() for s in sentences if s.strip()]

        for s_idx, sentence in enumerate(sentences):
            is_last_in_paragraph = s_idx == len(sentences) - 1
            silence_ms = SILENCE_AFTER_PARAGRAPH_MS if is_last_in_paragraph else SILENCE_AFTER_SENTENCE_MS
            segments.append((sentence, silence_ms))

    return segments


def create_silence(duration_ms: int) -> AudioSegment:
    """Create a silent segment of given length (mono, 16k sample rate to match typical TTS)."""
    return AudioSegment.silent(duration=duration_ms, frame_rate=16000)


def synthesize_with_pauses(
    client: SarvamAI,
    text: str,
    *,
    model: str = "bulbul:v3",
    target_language_code: str = "en-IN",
    speaker: Optional[str] = None,
    use_pitch: bool = False,
    output_path: Optional[Path] = None,
) -> AudioSegment:
    """
    Synthesize text with Sarvam TTS using slower pace and (for v2) lower pitch,
    then insert 800ms after each sentence and 1500ms after each paragraph.
    """
    segments = split_into_segments(text)
    if not segments:
        return AudioSegment.silent(duration=0)

    combined = AudioSegment.empty()
    kwargs: Dict = {
        "model": model,
        "target_language_code": target_language_code,
        "pace": SPEAKING_PACE,
    }
    if speaker:
        kwargs["speaker"] = speaker
    if use_pitch and "v2" in model:
        kwargs["pitch"] = PITCH_LOWER

    with tempfile.TemporaryDirectory() as tmpdir:
        for i, (segment_text, silence_ms) in enumerate(segments):
            audio = client.text_to_speech.convert(text=segment_text, **kwargs)
            tmp_file = Path(tmpdir) / f"seg_{i}.wav"
            save(audio, str(tmp_file))
            seg_audio = AudioSegment.from_wav(str(tmp_file))
            combined += seg_audio
            combined += create_silence(silence_ms)

    if output_path:
        combined.export(str(output_path), format=output_path.suffix.lstrip(".") or "mp3")

    return combined


def generate_story_audio(
    text: str,
    *,
    model: str = "bulbul:v3",
    target_language_code: str = "en-IN",
    speaker: Optional[str] = None,
    use_pitch: bool = False,
    out_name: Optional[str] = None,
) -> Path:
    """
    Generate a single story audio file with pace/pitch and sentence/paragraph pauses.
    """
    api_key = os.environ.get("SARVAM_API_KEY") or os.environ.get("SARVAM_API_SUBSCRIPTION_KEY")
    if not api_key:
        raise RuntimeError("Set SARVAM_API_KEY or SARVAM_API_SUBSCRIPTION_KEY")

    client = SarvamAI(api_subscription_key=api_key)
    out_name = out_name or f"story_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    output_path = Path(OUTPUT_DIR) / f"{out_name}.mp3"
    synthesize_with_pauses(
        client,
        text,
        model=model,
        target_language_code=target_language_code,
        speaker=speaker,
        use_pitch=use_pitch and "v2" in model,
        output_path=output_path,
    )
    return output_path
