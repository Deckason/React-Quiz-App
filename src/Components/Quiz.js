import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../config/firebase";
import { useQuizContext } from "./CustomContextProvider";
import ClipLoader from "react-spinners/ClipLoader"
import { useNavigate } from "react-router-dom";
import Options from "./Options";

const Quiz = () => {
    const {quiz, setQuiz, isLoading, setIsLoading, id,
        nextQuestion, prevQuestion, logoutUser,
        setErr, err,setAnswer
    
    } = useQuizContext()
    const navigate = useNavigate()

    const quizCollectionRef = collection(db, "quiz")
    const q = query(quizCollectionRef, where("category", "==", sessionStorage.getItem("category")));
    
   async function getDocuments() {
        try {
            setIsLoading(true)
            const querySnapshot = await getDocs(q);
            let quizArray = [];
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            quizArray.push({...doc.data()});
            });
            const numOfQuestions = quizArray.length-1
            
            setQuiz({
                question: quizArray[id].question,
                answer: quizArray[id].answer,
                options: quizArray[id].options,
                numOfQuestions: numOfQuestions,
                questionNumber: id+1
            })
            setIsLoading(false)
            console.log(numOfQuestions,id)
            } catch (error) {
                setErr(error.message)
                setIsLoading(false)
            }
   }

   function checkAnswer(option,key) {
    setAnswer(option);
    console.log(option, key)
   }

   useEffect(()=>{
    getDocuments()
   }, [])

    return (
        
        <div className="container">
            {isLoading && <ClipLoader
                color={"#fff"}
                loading={isLoading}
                size={50}
            />}
           {!isLoading && 
                <>
                    <div className="topNav">
                        <button onClick={logoutUser}>Logout</button>
                            <h4>Question {`${quiz?.questionNumber}`}</h4>
                        <button onClick={()=>navigate("/")}>End Quiz</button>
                    </div>
                    <div className="question">
                    <p className="errors">{err}</p>
                        <p>{quiz?.question || "Try refreshing the page"}</p>
                    </div>
                    <div className="answer">
                        {quiz?.options.map((option, index)=>(
                           <Options option={option} key={index}/>
                        ))}
                    </div>
                    
                </>
            }
        </div>
        
    );
}
 
export default Quiz;