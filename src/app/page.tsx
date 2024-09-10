"use client";

import VoiceRecorder from "../../components/VoiceRecorder";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
        
          <div >
            <VoiceRecorder />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}