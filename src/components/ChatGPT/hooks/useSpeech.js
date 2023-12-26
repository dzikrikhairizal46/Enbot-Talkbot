// Buat custom hook 'useSpeech'
export const useSpeech =  () => {

    // Fungsi 'speak' untuk mengucapkan pesan menggunakan Text-to-Speech
    const speak = ({ message, pitch = 1}) => { 
        // Mengambil objek speechSynthesis dari window, yang merupakan API untuk Text-to-Speech
        const speech = window.speechSynthesis;
        // Mengambil daftar suara (voices) yang tersedia dari objek speechSynthesis
        let voices = speech.getVoices();
        // Membuat objek SpeechSynthesisUtterance yang akan diucapkan
        const utterThis = new SpeechSynthesisUtterance(message);
        // Mengatur suara (voice) yang akan digunakan untuk mengucapkan pesan
        utterThis.voice = voices[0]; // Menggunakan suara pertama dari daftar suara (default)
        // Mengatur tinggi nadanya (pitch) untuk mengontrol tinggi rendahnya suara yang diucapkan
        utterThis.pitch = pitch; // Default pitch = 1 (normal)
        // Memulai mengucapkan pesan menggunakan API Text-to-Speech
        speech.speak(utterThis); 
    }

    // Fungsi 'stopVoice' untuk menghentikan ucapan (Text-to-Speech)
    const stopVoice = () => {
        // Mengambil objek speechSynthesis dari window
        const speech = window.speechSynthesis;
        // Membatalkan ucapan yang sedang berlangsung
        speech.cancel()
    }

    // Mengembalikan objek dengan dua fungsi 'speak' dan 'stopVoice' yang dapat digunakan di komponen lain
    return {
        speak,
        stopVoice
    };
}
