// Import Library
import { Configuration, OpenAIApi } from 'openai';

// Konfigurasi API dengan menggunakan API Key dari environment variable
const configuration = new Configuration({
    apiKey: process.env.REACT_APP_CHAT_API_KEY,
});

// Inisialisasi OpenAI API dengan konfigurasi yang telah dibuat
const openai = new OpenAIApi(configuration);

// Ekspor chatService yang berisi fungsi callGpt
export const chatService = {
    // Fungsi callGpt akan melakukan percakapan dengan model GPT-3.5 Turbo berdasarkan input 'transcript'
    callGpt: async (transcript) => {
        // Mengirim permintaan ke server OpenAI untuk melakukan chat dengan model GPT-3.5 Turbo
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo", // Model yang digunakan adalah GPT-3.5 Turbo
            messages: [{ role: "user", content: transcript || "Beri sapaan untuk belajar TOEFL dalam 5 kata saja, dalam bahasa inggris" }]
            // Daftar pesan yang akan dikirimkan ke model GPT-3.5 Turbo, di sini hanya terdapat satu pesan dari pengguna (role: "user")
            // Jika 'transcript' tidak ada (atau bernilai null/undefined), maka pesan default akan digunakan sebagai input chat
        }); 

        // Mengembalikan hasil dari percakapan berupa konten pesan yang diberikan oleh model GPT-3.5 Turbo
        return response.data.choices[0].message.content;
    }
};
