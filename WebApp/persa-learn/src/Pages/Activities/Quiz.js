import React, { useEffect, useState } from "react";

import QuizBox from "../../Components/QuizBox";
import Progressbar from "../../Components/Progressbar";
// import tempQuizData from "../../assets/tempQuizData.json";
import { checkAnswers, getQuiz } from "../../http_Requests/userRequests";
import { useLocation, useNavigate } from "react-router-dom";
import Overlay from "../../Components/Quiz/Overlay";

const Quiz = () => {
  const [quizID, setQuizID] = useState();
  const [title, setTitle] = useState();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [isComplete, setIsComplete] = useState(false);

  // overlay states
  const [earnedXp, setEarnedXp] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [remainingXp, setRemaining] = useState(0);
  const [totalXp, setTotalXp] = useState(0);

  // data passed from previous page (quiz id)
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(async () => {
    // get quiz data
    if (state !== null) {
      const data = await getQuiz(state.quizID);

      //set quiz title
      setTitle(data.quizName);
      setQuizID(data.quizID);
      setQuestions(data.questions);
    }
  }, []);

  const addAnswer = (questionID, answerIdx) => {
    let isFound = false;
    // check if question already answered
    answers.map((ans) => {
      if (ans.questionID == questionID) {
        ans.ans = answerIdx;
        isFound = true;
      }
    });
    if (isFound) {
      //update answers
      setAnswers([...answers]);
    } else {
      // add new answer
      setAnswers([...answers, { questionID, ans: answerIdx }]);
    }
  };
  const complete = async () => {
    // check if all questions answered
    if (answers.length === questions.length) {
      //check answers and submit
      const data = await checkAnswers({ quizID, answers });
      console.log("data: ", data);
      //set values for overlay
      setScore(answers.length - data.wrongAnswers.length);
      setEarnedXp(data.xp);
      setEarnedCoins(data.coins);
      setLevel(data.level);
      setTotalXp(data.totalXp);
      setRemaining(data.remainingXp);
      setIsComplete(true);
    } else alert("answer all the questions");
  };

  return (
    <div className="content-box">
      <h1>{title}</h1>
      <div className="container wide-container center-container">
        <Progressbar
          progress={answers.length}
          numQuestions={questions.length}
        />
        {questions.map((question) => {
          return (
            <QuizBox
              key={question.id}
              questionId={question.id}
              question={question.name}
              details={question.details}
              options={question.options}
              answers={answers}
              addAnswer={addAnswer}
            />
          );
        })}
      </div>
      <button className="btn" onClick={() => complete()}>
        Complete
      </button>
      {isComplete ? (
        <Overlay
          score={score}
          answers={answers}
          level={level}
          earnedXp={earnedXp}
          earnedCoins={earnedCoins}
          totalXp={totalXp}
          remainingXp={remainingXp}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
