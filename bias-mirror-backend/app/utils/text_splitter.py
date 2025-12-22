import re

def split_into_sentences(text: str):
    """
    Splits text into sentences while preserving PRECISE character offsets.
    Returns: List[(sentence, start_idx, end_idx)]
    """
    spans = []
    
    
    pattern = re.compile(r'[^.!?]+[.!?]*')

    for match in pattern.finditer(text):
        full_match_text = match.group()
        
        # 1. Clean the text for analysis
        sentence = full_match_text.strip()
        
        # Skip empty matches (e.g. just spaces)
        if not sentence:
            continue

        # 2. FIX OFFSETS: Calculate where the *stripped* sentence actually starts
        # Find how many spaces were at the beginning
        leading_spaces = full_match_text.find(sentence)
        
        # Adjust the start index
        real_start = match.start() + leading_spaces
        real_end = real_start + len(sentence)

        spans.append((sentence, real_start, real_end))

    # Fallback for empty/failed parsing
    if not spans and text.strip():
        spans.append((text.strip(), 0, len(text)))

    return spans