// import { useParams, useNavigate } from "react-router-dom"
// import { useGetAllTestsQuery } from "../../store/api/tests.api"
// import { useEffect, useRef, useState } from "react"
// import { ITests } from "../../types"

// export const TestPass = () => {
//   const { id } = useParams<{ id: string }>()
//   const { data, isLoading, error } = useGetAllTestsQuery(id)
//   const navigate = useNavigate()

//   const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: string }>({})
//   const [validationMessage, setValidationMessage] = useState<string | null>(null)
//   const [test, setTest] = useState<ITests | null>(null)
//   const [userName, setUserName] = useState<string>("")

//   const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

//   useEffect(() => {
//     if (data) {
//       setTest(data)
//     }

//     const storedUserName = sessionStorage.getItem("userName")
//     if (storedUserName) {
//       setUserName(storedUserName)
//     }
//   }, [data])

//   const handleAnswerClick = (questionId: string, answerText: string) => {
//     setSelectedAnswers((prev) => ({
//       ...prev,
//       [questionId]: prev[questionId] === answerText ? "" : answerText,
//     }))
//   }

//   const handleSubmit = () => {
//     if (!test || !userName) {
//       setValidationMessage("Please enter your name before submitting")
//       return
//     }

//     const unansweredQuestionId = test.questions.find((q) => !selectedAnswers[q.id])?.id

//     if (unansweredQuestionId) {
//       setValidationMessage("Please answer all questions before submitting")
//       questionRefs.current[unansweredQuestionId]?.scrollIntoView({ behavior: "smooth" })
//     } else {
//       const updatedQuestions = test.questions.map((question) => ({
//         ...question,
//         userAnswer: selectedAnswers[question.id] || "",
//       }))


//       localStorage.setItem("testResults", JSON.stringify(updatedQuestions))


//       const correctCount = updatedQuestions.reduce((count, question) => {
//         const correctAnswer = question.answers.find((answer) => answer.isCorrect)?.text
//         return question.userAnswer === correctAnswer ? count + 1 : count
//       }, 0)


//       sessionStorage.setItem("userName", userName)
//       const testDetails = JSON.parse(localStorage.getItem("testDetails") || "[]")
//       const newDetails = [...testDetails, { name: userName, correctCount }]
//       localStorage.setItem("testDetails", JSON.stringify(newDetails))

//       navigate(`/test/results/${id}`)
//     }
//   }

//   const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const name = e.target.value
//     setUserName(name)
//     sessionStorage.setItem("userName", name)
//   }

//   if (isLoading) {
//     return (
//       <div className="h-screen bg-gray-200 flex justify-center items-center">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//       </div>
//     )
//   }

//   if (error || !data) {
//     return (
//       <div className="h-screen bg-gray-200 flex justify-center items-center">
//         <p className="text-xl text-red-600">Error loading test</p>
//       </div>
//     )
//   }

//   return (
//     <div className="h-screen bg-gradient-to-b from-blue-900 via-blue-900 to-blue-700 flex flex-col items-center p-8">
//       <div className="p-10 bg-white rounded-3xl shadow-2xl w-full sm:w-[600px] max-h-[90vh] overflow-y-auto">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{test?.title}</h2>
//         <p className="text-lg text-gray-600 mb-6 text-center">{test?.description}</p>

//         <input
//           type="text"
//           value={userName}
//           onChange={handleUserNameChange}
//           placeholder="Enter your name"
//           className="mb-4 p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         />

//         {validationMessage && (
//           <div className="text-red-500 mb-4 text-center text-lg">{validationMessage}</div>
//         )}

//         <div className="space-y-6">
//           {test?.questions.map((question) => (
//             <div
//               key={question.id}
//               ref={(el) => (questionRefs.current[question.id] = el)}
//               className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg mb-4"
//             >
//               <p className="text-xl font-semibold text-gray-800 mb-4">{question.question}</p>
//               <div className="space-y-4">
//                 {question.answers?.map((answer) => (
//                   <div
//                     key={answer.text}
//                     className="w-full border border-gray-400 text-center py-3 rounded-lg shadow-md hover:bg-blue-200 transition-all"
//                     onClick={() => handleAnswerClick(question.id, answer.text)}
//                     style={{
//                       backgroundColor: selectedAnswers[question.id] === answer.text ? "#4F46E5" : "white",
//                       cursor: "pointer",
//                     }}
//                   >
//                     {answer.text}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="mt-8 flex justify-center">
//           <button
//             onClick={handleSubmit}
//             className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all"
//           >
//             Submit Answers
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }


import { useParams, useNavigate } from "react-router-dom";
import { useGetAllTestsQuery } from "../../store/api/tests.api";
import { useEffect, useRef, useState } from "react";
import { ITests } from "../../types";

export const TestPass = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetAllTestsQuery(id);
  const navigate = useNavigate();

  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: string }>({});
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [test, setTest] = useState<ITests | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [time, setTime] = useState<number>(120);

  const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (data) {
      setTest(data);
    }

    const storedUserName = sessionStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, [data]);

  useEffect(() => {
    if (time <= 0) {
      navigate(`/test/results/${id}`);
    }

    const timeout = setTimeout(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [time]);

  const handleAnswerClick = (questionId: string, answerText: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: prev[questionId] === answerText ? "" : answerText,
    }));
  };

  const handleSubmit = () => {
    if (!test || !userName) {
      setValidationMessage("Please enter your name before submitting");
      return;
    }

    const unansweredQuestionId = test.questions.find((q) => !selectedAnswers[q.id])?.id;

    if (unansweredQuestionId) {
      setValidationMessage("Please answer all questions before submitting");
      questionRefs.current[unansweredQuestionId]?.scrollIntoView({ behavior: "smooth" });
    } else {
      const updatedQuestions = test.questions.map((question) => ({
        ...question,
        userAnswer: selectedAnswers[question.id] || "",
      }));

      localStorage.setItem("testResults", JSON.stringify(updatedQuestions));

      const correctCount = updatedQuestions.reduce((count, question) => {
        const correctAnswer = question.answers.find((answer) => answer.isCorrect)?.text;
        return question.userAnswer === correctAnswer ? count + 1 : count;
      }, 0);

      sessionStorage.setItem("userName", userName);
      const testDetails = JSON.parse(localStorage.getItem("testDetails") || "[]");
      const newDetails = [...testDetails, { name: userName, correctCount }];
      localStorage.setItem("testDetails", JSON.stringify(newDetails));

      navigate(`/test/results/${id}`);
    }
  };

  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setUserName(name);
    sessionStorage.setItem("userName", name);
  };

  const inTime = (sec: number) => {
    const min = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${min}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-200 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-screen bg-gray-200 flex justify-center items-center">
        <p className="text-xl text-red-600">Error loading test</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-b from-blue-900 via-blue-900 to-blue-700 flex flex-col items-center p-8">
      <div className="p-10 bg-white rounded-3xl shadow-2xl w-full sm:w-[600px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{test?.title}</h2>
        <p className="text-lg text-gray-600 mb-6 text-center">{test?.description}</p>

        <input
          type="text"
          value={userName}
          onChange={handleUserNameChange}
          placeholder="Enter your name"
          className="mb-4 p-3 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <div className="text-center mt-4">
          <strong>Time Remaining:</strong> {inTime(time)}
        </div>

        {validationMessage && (
          <div className="text-red-500 mb-4 text-center text-lg">{validationMessage}</div>
        )}

        <div className="space-y-6">
          {test?.questions.map((question) => (
            <div
              key={question.id}
              ref={(el) => (questionRefs.current[question.id] = el)}
              className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-lg mb-4"
            >
              <p className="text-xl font-semibold text-gray-800 mb-4">{question.question}</p>
              <div className="space-y-4">
                {question.answers?.map((answer) => (
                  <div
                    key={answer.text}
                    className="w-full border border-gray-400 text-center py-3 rounded-lg shadow-md hover:bg-blue-200 transition-all"
                    onClick={() => handleAnswerClick(question.id, answer.text)}
                    style={{
                      backgroundColor: selectedAnswers[question.id] === answer.text ? "#4F46E5" : "white",
                      cursor: "pointer",
                    }}
                  >
                    {answer.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Submit Answers
          </button>
        </div>
      </div>
    </div>
  );
};

