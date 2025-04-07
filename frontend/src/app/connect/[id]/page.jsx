"use client";

import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Loader2, Link, Copy, CheckCircle } from 'lucide-react';

export default function MeetingRoom({ params }) {
  const { id } = params;
  const videoContainerRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user data", err);
        setError("Failed to load user data. Please try logging in again.");
      }
    } else {
      setError("User data not found. Please log in first.");
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!userData?._id || !videoContainerRef.current) return;

    try {
      const appID = parseInt(process.env.NEXT_PUBLIC_ID, 10);
      const serverSecret = process.env.NEXT_PUBLIC_SERVER;

      if (!appID || !serverSecret) {
        setError("Missing configuration. Please check environment variables.");
        return;
      }

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        id,
        userData?._id,
        userData?.name || "Guest"
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: videoContainerRef.current,
        sharedLinks: [
          {
            name: "Meeting Link",
            url: window.location.href,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    } catch (err) {
      console.error("Failed to initialize meeting", err);
      setError("Failed to initialize the meeting. Please try again later.");
    }
  }, [id, userData]);

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="mt-4 text-lg text-gray-700">Initializing meeting...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
     
      <div 
        ref={videoContainerRef}
        className="flex-1 w-full"
      />
    </div>
  );
}