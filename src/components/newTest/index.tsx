import React, { useState } from "react";
import { useAppDispatch } from "../../store";
import { IQuestion, IAnswer, ITests } from "../../types";
import { createTestAsync } from "../../store/features/testsSlice";
import { useNavigate } from "react-router-dom";

export const CreateTestPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [testTitle, setTestTitle] = useState<string>("");
  const [testDescription, setTestDescription] = useState<string>("");
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [originalQuestions, setOriginalQuestions] = useState<IQuestion[]>([]);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(false);

  const handleShuffleToggle = () => {
    if (!shuffleQuestions) {
      setOriginalQuestions([...questions]);
      const shuffled = [...questions].sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
    } else {
      setQuestions(originalQuestions);
    }
    setShuffleQuestions(!shuffleQuestions);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTestDescription(e.target.value);
  };

  const handleAddQuestion = () => {
    const newQuestion: IQuestion = {
      id: Date.now().toString(),
      question: "",
      answers: [],
      correctAnswer: "",
      userAnswer: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const handleDuplicateQuestion = (questionId: string) => {
    const questionToDuplicate = questions.find((q) => q.id === questionId);
    if (questionToDuplicate) {
      const duplicatedQuestion: IQuestion = {
        ...questionToDuplicate,
        id: Date.now().toString(),
      };
      setQuestions([...questions, duplicatedQuestion]);
    }
  };

  const handleAddAnswer = (questionId: string) => {
    const newAnswer: IAnswer = {
      id: Date.now().toString(),
      text: "",
      isCorrect: false,
    };

    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? { ...q, answers: [...q.answers, newAnswer] }
          : q
      )
    );
  };

  const handleDeleteAnswer = (questionId: string, answerId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? { ...q, answers: q.answers.filter((a) => a.id !== answerId) }
          : q
      )
    );
  };

  const handleSetCorrectAnswer = (questionId: string, answerId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              correctAnswer: q.correctAnswer === answerId ? "" : answerId,
              answers: q.answers.map((a) => ({
                ...a,
                isCorrect: a.id === answerId ? !a.isCorrect : false,
              })),
            }
          : q
      )
    );
  };

  const handleSubmit = () => {
    if (!testTitle || !testDescription || questions.length === 0) {
      alert("Please fill out all fields.");
      return;
    }

    for (const question of questions) {
      if (!question.question.trim() || question.answers.length === 0) {
        alert("Each question must have text and at least one answer.");
        return;
      }

      const correctAnswers = question.answers.filter((a) => a.isCorrect);
      if (correctAnswers.length !== 1) {
        alert("Each question must have exactly one correct answer.");
        return;
      }
    }

    const newTest: ITests = {
      id: Date.now().toString(),
      title: testTitle,
      description: testDescription,
      questions,
    };

    dispatch(createTestAsync(newTest));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-700 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Create a New Test
        </h1>

        {/* Test Title */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Test Title
          </label>
          <input
            type="text"
            value={testTitle}
            onChange={handleTitleChange}
            placeholder="Enter test title"
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Test Description */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Test Description
          </label>
          <input
            type="text"
            value={testDescription}
            onChange={handleDescriptionChange}
            placeholder="Enter test description"
            className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Shuffle Questions */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={shuffleQuestions}
            onChange={handleShuffleToggle}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-lg font-medium text-gray-700">
            Shuffle Questions
          </label>
        </div>

        {/* Questions */}
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="p-6 mb-4 border rounded-lg bg-gray-50 shadow-sm"
          >
            <div className="mb-4">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Question
              </label>
              <input
                type="text"
                value={question.question}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[index].question = e.target.value;
                  setQuestions(updatedQuestions);
                }}
                placeholder="Enter question text"
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Answers */}
            {question.answers.map((answer, idx) => (
              <div
                key={answer.id}
                className="flex items-center gap-4 mb-2 p-2 rounded-md bg-white shadow"
              >
                <input
                  type="text"
                  value={answer.text}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[index].answers[idx].text = e.target.value;
                    setQuestions(updatedQuestions);
                  }}
                  placeholder="Enter answer text"
                  className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    answer.isCorrect ? "bg-green-50" : ""
                  }`}
                  onDoubleClick={() =>
                    handleSetCorrectAnswer(question.id, answer.id)
                  }
                />
                <button
                  onClick={() => handleDeleteAnswer(question.id, answer.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            ))}

            {/* Add Answer / Delete Question / Duplicate */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleAddAnswer(question.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                Add Answer
              </button>
              <button
                onClick={() => handleDeleteQuestion(question.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Delete Question
              </button>
              <button
                onClick={() => handleDuplicateQuestion(question.id)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
              >
                Duplicate Question
              </button>
            </div>
          </div>
        ))}

        {/* Add New Question */}
        <button
          onClick={handleAddQuestion}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 mb-6"
        >
          Add New Question
        </button>

        {/* Submit Test */}
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};
