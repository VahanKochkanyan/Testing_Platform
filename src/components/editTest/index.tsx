import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAllTestsQuery, useUpdateTestMutation } from "../../store/api/tests.api";
import { IQuestion, ITests } from "../../types";

export const EditTest = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetAllTestsQuery(id);
  const [updateTest] = useUpdateTestMutation();

  const [testData, setTestData] = useState<ITests | null>(null);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (data) {
      setTestData(data);
    }
  }, [data]);

  const handleShuffleToggle = () => {
    setShuffleQuestions((prevState) => !prevState);
  };

  const handleQuestionChange = (questionIndex: number, newQuestion: string) => {
    setTestData((prevData) => {
      if (!prevData) return null;
      const updatedQuestions = [...prevData.questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        question: newQuestion,
      };
      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleAnswerChange = (
    questionId: string,
    answerIndex: number,
    newText: string
  ) => {
    setTestData((prevData) => {
      if (!prevData) return null;

      const updatedQuestions = prevData.questions.map((question) => {
        if (question.id === questionId) {
          const updatedAnswers = question.answers.map((answer, index) =>
            index === answerIndex ? { ...answer, text: newText } : answer
          );
          return { ...question, answers: updatedAnswers };
        }
        return question;
      });

      return { ...prevData, questions: updatedQuestions };
    });
  };

  const handleSave = async () => {
    if (!testData) {
      setValidationMessage("Please complete the test details before saving.");
      return;
    }

    await updateTest(testData);
    refetch();
    navigate("/dashboard");
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-200 flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error || !testData) {
    return (
      <div className="h-screen bg-gray-200 flex justify-center items-center">
        Error loading test
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-b from-blue-900 via-blue-900 to-blue-700 flex flex-col items-center p-8">
      <div className="p-10 bg-white rounded-3xl shadow-2xl w-full sm:w-[600px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {testData.title}
        </h2>
        <input
          type="text"
          value={testData.description}
          onChange={(e) =>
            setTestData((prev) =>
              prev ? { ...prev, description: e.target.value } : null
            )
          }
          placeholder="Enter test description"
          className="mb-4 p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {validationMessage && (
          <div className="text-red-500 mb-4 text-center text-lg">
            {validationMessage}
          </div>
        )}

        <div className="space-y-6">
          {testData.questions.map((question, questionIndex) => (
            <div
              key={question.id}
              ref={(el) => (questionRefs.current[question.id] = el)}
              className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg mb-4"
            >
              <input
                type="text"
                value={question.question}
                onChange={(e) =>
                  handleQuestionChange(questionIndex, e.target.value)
                }
                placeholder="Edit question"
                className="text-xl font-semibold text-gray-800 mb-4 p-2 w-full border rounded-md"
              />
              <div className="space-y-4">
                {question.answers.map((answer, answerIndex) => (
                  <input
                    key={answer.text}
                    type="text"
                    value={answer.text}
                    onChange={(e) =>
                      handleAnswerChange(question.id, answerIndex, e.target.value)
                    }
                    placeholder="Edit answer"
                    className="w-full border-solid border-2 border-gray-400 text-center pt-2 pb-2 rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="shuffleQuestions"
            checked={shuffleQuestions}
            onChange={handleShuffleToggle}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="shuffleQuestions"
            className="ml-2 text-lg font-medium text-gray-700"
          >
            Shuffle Questions
          </label>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
