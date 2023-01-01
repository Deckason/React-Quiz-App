import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../config/firebase";
import { useQuizContext } from "./CustomContextProvider";
import ClipLoader from "react-spinners/ClipLoader"
import { useNavigate } from "react-router-dom";
import Options from "./Options";
import { useReducer } from "react";
import QuizResult from "./QuizResult";

const Quiz = () => {
    const {quiz, setQuiz, isLoading, setIsLoading, logoutUser,
        setErr, err
    
    } = useQuizContext()
    const navigate = useNavigate()

    const category = sessionStorage.getItem("category")

    if (!category) {
       navigate("/") 
    }
    const quizCollectionRef = collection(db, "quiz")
    const q = query(quizCollectionRef, where("category", "==", category));
    

//FETCHING THE QUIZ FROM THE DATABASE
   async function getDocuments() {
        try {
            setErr("")
            setIsLoading(true)
            const querySnapshot = await getDocs(q);
            let quizArray = [];
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            quizArray.push({...doc.data()});
            });

            setQuiz({quizArray})//-----------------------STORED THE QUIZ HERE------------------------

            setIsLoading(false)
            
            } catch (error) {
                setErr(error.message)
                setIsLoading(false)
            }
   }


   const initialState = {
        //quiz: quiz, //this is not working because the get documents function is taking time to fetch the quiz from the database
        quizId: 0,
        correctAnswerCount: 0,
        currentAnswer: "",
        showResults: false,
   }

   const ACTION = {
    NEXT_QUESTION: "NEXT QUESTION",
    SELECTED_ANSWER: "SELECTED ANSWER",
    RESTART: "RESTART",
   }
   
   const reducer = (state, action)=>{
        switch (action.type) {
            case ACTION.NEXT_QUESTION: {
                const quizId = state.quizId < quiz?.quizArray.length-1 ? state.quizId+1 : state.quizId;
                const showResults = state.quizId === quiz?.quizArray.length-1 ? true : state.showResults;
                const currentAnswer = "";
                return{
                    ...state,
                    quizId,
                    showResults,
                    currentAnswer,
                }
            }
            break;

            case ACTION.SELECTED_ANSWER: {
                const currentAnswer = action.payload;
                const correctAnswerCount = action.payload === quiz?.quizArray[state?.quizId].answer ? 
                state.correctAnswerCount+1 : state.correctAnswerCount;
                
                return{
                    ...state,
                    currentAnswer,
                    correctAnswerCount,
                }
            }
            break;

            case ACTION.RESTART: {
                return initialState
            }
            break;
        
            default:
                return state;
                break;
        }
   }

   const [state, dispatch] = useReducer(reducer,initialState)

   useEffect(()=>{
    getDocuments()
   }, [category])

    return (
        
        <div className="container quiz_page">
            {!state.showResults &&
                <>
                    {isLoading && <ClipLoader
                        color={"#fff"}
                        loading={isLoading}
                        size={50}
                    />}
                {!isLoading && 
                    <>
                        <div className="topNav">
                            <button onClick={logoutUser}>Logout</button>
                            <button onClick={()=>navigate("/")}>End Quiz</button>
                        </div>
                        <div className="question">
                        <p className="errors">{err}</p>
                            <p>{`${state?.quizId+1}) `}{quiz?.quizArray[state.quizId]?.question || "Try refreshing the page"}</p>
                        </div>
                        <div className="answer">
                            {quiz?.quizArray[state.quizId]?.options.map((option, index)=>(
                            <Options 
                                option={option} 
                                key={index}
                                selectedAnswer={(option)=>{dispatch({type: ACTION.SELECTED_ANSWER, payload: option})}}
                                correctAnswer={quiz?.quizArray[state.quizId]?.answer}
                                currentAnswer={state?.currentAnswer}
                                correctAnswerCount={state?.correctAnswerCount}
                            />
                            ))}
                        </div>
                        {state?.currentAnswer &&
                            <button onClick={()=>{dispatch({type: ACTION.NEXT_QUESTION})}}>
                                {state.quizId === quiz?.quizArray.length-1 && "RESULT"}
                                {state.quizId !== quiz?.quizArray.length-1 && "NEXT"}
                            </button>
                        }
                        
                    </>
                }
                </>
            }
            {state.showResults &&
                <QuizResult
                    no_Of_Questions={quiz?.quizArray.length}
                    correctlyAnswered={state.correctAnswerCount}
                    restart={()=>{dispatch({type: ACTION.RESTART})}}
                />
            }

        </div>
        
    );
}
 
export default Quiz;