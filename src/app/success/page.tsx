"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [message, setMessage] = useState("Processing your payment...");
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (isLoaded && isSignedIn && user && sessionId) {
      fetch("/api/verify-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Add credits to the user's account
            const currentCredits = localStorage.getItem(`credits_${user.id}`);
            const newCredits = (parseInt(currentCredits || "0") + 3).toString();
            localStorage.setItem(`credits_${user.id}`, newCredits);
            setMessage("Payment successful! 20 credits have been added to your account.");
            // Redirect to home page after 3 seconds
            setTimeout(() => router.push("/"), 3000);
          } else {
            setMessage("There was an issue verifying your purchase. Please contact support.");
          }
        })
        .catch((error) => {
          console.error("Error verifying session:", error);
          setMessage("There was an error processing your payment. Please try again or contact support.");
        });
    }
  }, [isLoaded, isSignedIn, user, sessionId, router]);

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Payment Status</h1>
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default SuccessPage;