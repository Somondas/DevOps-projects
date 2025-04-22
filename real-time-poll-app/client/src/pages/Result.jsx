import React, { useEffect, useState } from "react";
import socket from "../socket";

const Result = () => {
  const [votes, setVotes] = useState({
    Yes: 0,
    No: 0,
    "I never worked with Web Sockets": 0,
  });

  useEffect(() => {
    // Listen to vote updates from server
    socket.on("currentVotes", (data) => {
      setVotes(data);
    });

    // Request the current vote data when result page loads
    socket.emit("getVotes");

    // Clean up the listener when this component unmounts
    return () => {
      socket.off("currentVotes");
    };
  }, [votes]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Live Poll Results
      </h2>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-4">
        {Object.entries(votes).map(([option, count]) => (
          <div key={option} className="flex justify-between items-center">
            <span className="font-medium text-gray-700">{option}</span>
            <span className="text-xl font-bold text-blue-600">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
