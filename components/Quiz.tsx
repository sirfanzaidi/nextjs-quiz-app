"use client"; // Mark this as a Client Component

import { useState, useEffect } from "react";
import { questions } from "../data/questions";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0); // Track questions answered in the current session
  const [shuffledQuestions, setShuffledQuestions] = useState(questions); // Store shuffled questions
  const [incorrectAnswers, setIncorrectAnswers] = useState<
    { question: string; userAnswer: string; correctAnswer: string }[]
  >([]); // Store incorrect answers

  // Shuffle questions at the start of each session
  useEffect(() => {
    shuffleQuestions();
  }, []);

  // Function to shuffle questions
  const shuffleQuestions = () => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  };

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    const currentQ = shuffledQuestions[currentQuestion];

    if (answer === currentQ.answer) {
      setScore(score + 1);
    } else {
      // Store incorrect answer details
      setIncorrectAnswers((prev) => [
        ...prev,
        {
          question: currentQ.question,
          userAnswer: answer,
          correctAnswer: currentQ.answer,
        },
      ]);
    }

    setTimeout(() => {
      if (questionsAnswered + 1 < 5) {
        // If less than 5 questions answered in the session
        setCurrentQuestion((prev) => (prev + 1) % shuffledQuestions.length); // Move to the next question
        setQuestionsAnswered(questionsAnswered + 1); // Increment questions answered
      } else {
        // If 5 questions answered, end the session
        setShowScore(true);
      }
      setSelectedAnswer(null); // Reset selected answer
    }, 500);
  };

  const resetSession = () => {
    setShowScore(false);
    setQuestionsAnswered(0); // Reset questions answered for the new session
    setCurrentQuestion(0); // Reset to the first question
    setScore(0); // Reset score
    setIncorrectAnswers([]); // Clear incorrect answers
    shuffleQuestions(); // Shuffle questions for the new session
  };

  const restartQuiz = () => {
    setShowScore(false);
    setCurrentQuestion(0); // Reset to the first question
    setScore(0); // Reset score
    setQuestionsAnswered(0); // Reset questions answered
    setIncorrectAnswers([]); // Clear incorrect answers
    shuffleQuestions(); // Shuffle questions for the new session
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 relative">
      {/* Profile Section */}
      <div className="absolute top-4 left-4 flex items-center space-x-3">
        <img
          src="/profile-pic.jpg" // Replace with your profile picture path
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-purple-500"
        />
        <span className="text-xl font-bold text-white">Syed Irfan Hussain Zaidi (monday 2 to 5)</span> {/* Replace with your name */}
      </div>

      {/* GIAIC Roll No Section */}
      <div className="absolute top-4 right-4">
        <p className="text-lg font-semibold text-gray-300">
          Student GIAIC Roll No: <span className="text-purple-400">00003451</span>
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-sm text-gray-400">
          With heartfelt gratitude, I thank <span className="text-purple-400 font-semibold">Sir Asharib Ali</span> for his unwavering guidance, inspiring mentorship, and for lighting the path to knowledge and success.
        </p>
      </div>

      {showScore ? (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl text-center w-full max-w-2xl border border-gray-700">
          <h1 className="text-3xl font-bold mb-4 text-white">Session Over!</h1>
          <p className="text-xl mb-6 text-gray-300">
            Your score: <span className="font-bold text-green-400">{score}</span> /{" "}
            <span className="font-bold text-gray-400">{questionsAnswered}</span>
          </p>

          {/* Display Incorrect Answers */}
          {incorrectAnswers.length > 0 && (
            <div className="mt-6 text-left">
              <h2 className="text-2xl font-bold mb-4 text-white">Incorrect Answers:</h2>
              {incorrectAnswers.map((item, index) => (
                <div key={index} className="mb-6 p-4 rounded-lg bg-gray-700 border border-gray-600">
                  <p className="text-lg font-semibold text-gray-200">
                    <span className="text-red-400">Question:</span> {item.question}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-red-400">Your Answer:</span> {item.userAnswer}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-green-400">Correct Answer:</span> {item.correctAnswer}
                  </p>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={resetSession}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
          >
            Start New Session
          </button>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-2xl border border-gray-700">
          <h1 className="text-3xl font-bold mb-4 text-white">
            Question <span className="text-purple-400">{currentQuestion + 1}</span> of{" "}
            <span className="text-gray-400">{shuffledQuestions.length}</span>
          </h1>
          <p className="text-lg mb-6 text-gray-200">{shuffledQuestions[currentQuestion].question}</p>
          <div className="space-y-4">
            {shuffledQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={`w-full p-4 rounded-lg text-left transition-all shadow-md ${
                  selectedAnswer === option
                    ? option === shuffledQuestions[currentQuestion].answer
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                      : "bg-gradient-to-r from-red-500 to-red-600 text-white"
                    : "bg-gradient-to-r from-gray-700 to-gray-800 text-gray-200 hover:from-gray-600 hover:to-gray-700"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Questions answered in this session:{" "}
            <span className="font-bold text-purple-400">{questionsAnswered}</span> / 5
          </p>
          <button
            onClick={restartQuiz}
            className="mt-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all shadow-lg"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;