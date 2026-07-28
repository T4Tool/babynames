/**
 * Pronounces a baby name using Web Speech Synthesis API
 */
export function pronounceName(name: string, gender: string = 'Boy'): Promise<boolean> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      resolve(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(name);
    utterance.rate = 0.85; // Slightly slower, clear cadence
    utterance.volume = 1.0;

    if (gender === 'Girl') {
      utterance.pitch = 1.25; // Higher pitch for female cadence
    } else if (gender === 'Boy') {
      utterance.pitch = 0.9;  // Deeper pitch for male cadence
    } else {
      utterance.pitch = 1.0;
    }

    // Try finding an English or natural voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel')));
    
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => resolve(true);
    utterance.onerror = () => resolve(false);

    window.speechSynthesis.speak(utterance);
  });
}
