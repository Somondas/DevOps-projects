import React, { useEffect, useState } from "react";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [voted, setVoted] = useState(false);
  const [know, setKnow] = useState(false);

  const handleVote = (option) => {
    if (!voted) {
      socket.emit("vote", option); // Send vote to server
      setVoted(true);
      //   navigate("/result", { history: false }); // Go to result page
    }
  };
  const handleKnow = (option) => {
    if (!know) {
      socket.emit("socketio", option);
      setKnow(true);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Do you find Web Sockets difficult?
        </h2>
        {voted && <p>Thanks for the answer</p>}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            disabled={voted}
            onClick={() => handleVote("Yes")}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
          >
            Yes
          </button>
          <button
            disabled={voted}
            onClick={() => handleVote("No")}
            className="px-6 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
          >
            No
          </button>
          <button
            disabled={voted}
            onClick={() => handleVote("I never worked with Web Sockets")}
            className="px-6 py-3 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition"
          >
            I never worked with Web Sockets
          </button>
        </div>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Do you use Socket.io ?
        </h2>
        {know && <p>Thanks for the answer</p>}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            disabled={know}
            onClick={() => handleKnow("Yes")}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600 transition"
          >
            Yes
          </button>
          <button
            disabled={know}
            onClick={() => handleKnow("No")}
            className="px-6 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
          >
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
