import React, { useState, useRef, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import BuyCreditsButton from "./BuyCreditsButton";
import { useRouter } from 'next/navigation';

const VoiceRecorder: React.FC = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [credits, setCredits] = useState<number>(0);
  const [estaGrabando, setEstaGrabando] = useState<boolean>(false);
  const [urlAudio, setUrlAudio] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [emailSubject, setEmailSubject] = useState<string>("");
  const [cargando, setCargando] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestAnimationFrameRef = useRef<number | null>(null);

  const openHowItWorksVideo = () => {
    // Replace 'VIDEO_ID' with the actual YouTube video ID
    window.open('https://www.youtube.com/watch?v=VIDEO_ID', '_blank');
  };

  useEffect(() => {
    if (isSignedIn && user) {
      const storedCredits = localStorage.getItem(`credits_${user.id}`);
      setCredits(storedCredits ? parseInt(storedCredits) : 10);
    }
  }, [isSignedIn, user]);

  const goToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/');
  };

  const deductCredit = () => {
    if (credits > 0) {
      const newCredits = credits - 1;
      setCredits(newCredits);
      localStorage.setItem(`credits_${user.id}`, newCredits.toString());
      return true;
    }
    return false;
  };

  const addCredits = (amount: number) => {
    const newCredits = credits + amount;
    setCredits(newCredits);
    localStorage.setItem(`credits_${user.id}`, newCredits.toString());
  };

  const iniciarGrabacion = async () => {
    if (credits <= 0) {
      alert("You're out of credits. Please purchase more to continue.");
      return;
    }

    if (deductCredit()) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // @ts-ignore
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      source.connect(analyser);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setUrlAudio(url);
        audioChunksRef.current = [];
      };

      mediaRecorder.start();
      setEstaGrabando(true);

      dibujarFormaDeOnda();
    } else {
      alert("Failed to deduct credit. Please try again.");
    }
  };

  const detenerGrabacion = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setEstaGrabando(false);
    cancelAnimationFrame(requestAnimationFrameRef.current!);
  };

  const dibujarFormaDeOnda = () => {
    const analyser = analyserRef.current;
    const canvas = canvasRef.current;
    if (!analyser || !canvas) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const ctx = canvas.getContext("2d");

    const draw = () => {
      requestAnimationFrameRef.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      ctx!.clearRect(0, 0, canvas.width, canvas.height);

      ctx!.lineWidth = 2;
      ctx!.strokeStyle = "rgb(255, 0, 0)";

      ctx!.beginPath();
      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx!.moveTo(x, y);
        } else {
          ctx!.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx!.lineTo(canvas.width, canvas.height / 2);
      ctx!.stroke();
    };

    draw();
  };

  const enviarAlWebhook = async (audioBlob: Blob, webhookUrl: string) => {
    const formData = new FormData();
    formData.append('file', audioBlob, `${email}.wav`);
    formData.append('email', email);
    formData.append('subject', emailSubject);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Error al enviar el archivo al webhook.');
      }
    } catch (error) {
      console.error('Error al enviar archivo al webhook:', error);
    }
  };

  const manejarMeeting = async () => {
    if (urlAudio) {
      setCargando(true);
      const response = await fetch(urlAudio);
      const audioBlob = await response.blob();
      await enviarAlWebhook(audioBlob, 'https://hook.us2.make.com/yeee5n2th6mxjj0twi1uneujraqf1kud');
      setCargando(false);
      window.location.reload();
    }
  };

  const FuturisticSpinner = () => (
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 border-2 border-blue-500 rounded-full animate-ping"></div>
      <div className="absolute inset-0 border-2 border-blue-300 rounded-full animate-pulse"></div>
      <div className="absolute inset-2 border-2 border-white rounded-full animate-spin"></div>
    </div>
  );

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col justify-center items-center h-screen p-8 text-center">
      <div className="bg-white bg-opacity-20 backdrop-blur-sm p-10 rounded-3xl shadow-2xl max-w-lg w-full transform hover:scale-105 transition-all duration-300">
        <h1 className="text-4xl font-extrabold text-indigo-600 mb-6">Class Notes AI</h1>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Transform your lectures into smart, organized notes with the power of AI
        </p>
        <div className="flex space-x-4">
      <button 
        onClick={() => window.location.href = "/sign-in"}
        className="px-8 py-3 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-xl hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300"
      >
        Get Started
      </button>
      <button 
        onClick={openHowItWorksVideo}
        className="px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded-full shadow-xl hover:bg-green-600 transform hover:scale-105 transition-all duration-300"
      >
        How It Works
      </button>
    </div>
      </div>
    </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full"
      
    >
      <div className="p-4 max-w-md w-full bg-white bg-opacity-25 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-4 text-black">
          🎙️ Class Notes AI
        </h1>
      
        
        {/* Credits Card */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-yellow-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p className="text-sm font-medium text-gray-500">My Credits</p>
              <p className="text-2xl font-bold text-gray-700">{credits}</p>
            </div>
          </div>
          <BuyCreditsButton />
        </div>
        
        <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded-full shadow-lg mt-4 mb-4 w-full">
          Sign Out
        </button>
        
        <canvas ref={canvasRef} width={300} height={80} className="w-full mb-4" />
        <div className="mb-6 flex flex-col space-y-4 items-center">
          <i className="fas fa-microphone-alt text-6xl mb-2" style={{ color: "black" }}></i>
          <button
            onClick={iniciarGrabacion}
            disabled={estaGrabando}
            className="px-4 py-2 bg-green-500 text-white rounded-full shadow-lg disabled:bg-gray-400 w-full sm:w-auto transform transition-transform duration-200 active:scale-95"
          >
            Start Recording
          </button>
          <button
            onClick={detenerGrabacion}
            disabled={!estaGrabando}
            className="px-4 py-2 bg-red-500 text-white rounded-full shadow-lg disabled:bg-gray-400 w-full sm:w-auto transform transition-transform duration-200 active:scale-95"
          >
            Stop Recording
          </button>
          {urlAudio && (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-2 py-1 border border-gray-300 rounded text-black w-full"
                required
              />
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Class"
                className="px-2 py-1 border border-gray-300 rounded text-black w-full"
                required
              />
              {cargando ? (
                <div className="mt-4 flex justify-center">
                  <FuturisticSpinner />
                </div>
              ) : (
                <button
                  onClick={manejarMeeting}
                  className="mt-4 inline-block px-4 py-2 bg-indigo-500 text-white rounded-full shadow-lg w-full text-center sm:w-auto transform transition-transform duration-200 active:scale-95"
                >
                  Process Meeting
                </button>
              )}
            </>
          )}
          
        
        </div>
        {urlAudio && (
          <div className="mt-6">
            <audio src={urlAudio} controls className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;