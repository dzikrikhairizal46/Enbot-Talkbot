// Import library dan modul yang diperlukan
import React, { useEffect, useState } from 'react';
import { useSpeech } from './hooks/useSpeech';
import { chatService } from './service/chatService';
import './style.css'; // Import file CSS yang akan kita buat

// Komponen ChatGPT sebagai functional component
function ChatGPT({ transcript, listening, resetTranscript, setLoading, message, setMessage }) {
  // Memanggil custom hook useSpeech() untuk mendapatkan fungsi 'speak' dan 'stopVoice'
  const { speak, stopVoice } = useSpeech();

  // Fungsi untuk memanggil service chatService.callGpt() dan mengatur state message dan loading
  const callGpt = async () => {
    setLoading(true); // Set loading menjadi true saat memanggil GPT-3
    const chat = await chatService.callGpt(transcript); // Memanggil service chatService untuk berkomunikasi dengan GPT-3
    setMessage(chat); // Menyimpan hasil chat dari GPT-3 ke dalam state message
    setLoading(false); // Set loading menjadi false setelah chat selesai
  }

  // Fungsi untuk mereset transkrip dan menghentikan ucapan saat tombol 'Reset' diklik
  const reset = () => {
    resetTranscript(); // Memanggil fungsi untuk mereset transkrip
    setMessage(''); // Mengosongkan pesan yang ditampilkan
    stopVoice(); // Menghentikan ucapan (Text-to-Speech) jika sedang berlangsung
  }

  // useEffect untuk memanggil GPT-3 ketika transcript berubah atau saat listening berubah menjadi false
  useEffect(() => {
    if (!listening) callGpt(); // Jika tidak sedang mendengarkan, panggil GPT-3
  }, [transcript, listening]);

  // useEffect untuk menggunakan Text-to-Speech saat ada pesan baru yang diterima dari GPT-3 (message berubah)
  useEffect(() => {
    if (message) speak({ message, pitch: 0 }); // Jika ada pesan baru, gunakan Text-to-Speech untuk mengucapkannya
  }, [message]);

  // Komponen yang akan dirender
  return (
    <div className="chat-container">
      <button className="reset-button" onClick={reset}>Reset</button>
    </div>
  );
}

// Ekspor komponen ChatGPT agar dapat digunakan di komponen lain
export default ChatGPT;
