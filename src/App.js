// Import library dan modul yang diperlukan
import { FiberManualRecord, Stop } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Sidebar from './components/sidebar/Sidebar';
import './App.css';
import ChatGPT from './components/ChatGPT';

// Komponen utama App sebagai functional component
function App() {
  // State untuk mengontrol loading dan pesan yang diterima dari GPT-3
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Menggunakan custom hook useSpeechRecognition() untuk mendapatkan data dari speech recognition
  const {
    transcript,                // Pesan yang diucapkan oleh pengguna yang dikenali oleh speech recognition
    listening,                 // Boolean, true jika sedang dalam mode mendengarkan
    resetTranscript,           // Fungsi untuk mereset transkrip
    browserSupportsSpeechRecognition // Boolean, true jika browser mendukung speech recognition
  } = useSpeechRecognition();

  // Jika browser tidak mendukung speech recognition, tampilkan pesan error
  if (!browserSupportsSpeechRecognition) {
    return <span className="error">Browser doesn't support speech recognition.</span>;
  }

  // Komponen yang akan dirender
  return (
    <div className="container">
      {/* Komponen Sidebar */}
      <Sidebar/>

      {/* Judul Aplikasi */}
      <h1 className="title">TalkBot - Improve your Listening and Speaking Skills</h1>

      {/* Tombol untuk memulai dan menghentikan speech recognition */}
      <div className="buttons-container">
        <button
          className={`mic-button ${listening ? 'active' : ''}`}
          onClick={SpeechRecognition.startListening} // Memulai mendengarkan ucapan pengguna
        >
          <FiberManualRecord className="mic-icon" />
        </button>
        <button className="mic-button" onClick={SpeechRecognition.stopListening}>
          <Stop className="mic-icon" />
        </button>
      </div>

      {/* Komponen ChatGPT */}
      <ChatGPT
        transcript={transcript}
        listening={listening}
        resetTranscript={resetTranscript}
        setLoading={setLoading}
        message={message}
        setMessage={setMessage}
      />

      {/* Tampilkan loader jika loading bernilai true */}
      {loading && <CircularProgress className="loader" />}

      {/* Tampilkan pesan yang diterima dari GPT-3 */}
      <span className="message">{message}</span>
    </div>
  );
}

// Ekspor komponen App agar dapat digunakan di komponen lain
export default App;
