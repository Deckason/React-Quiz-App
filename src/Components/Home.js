import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuizContext } from "./CustomContextProvider";
import ClipLoader from "react-spinners/ClipLoader";
const Home = () => {
    const {userName, logoutUser, isLoading, setIsLoading} = useQuizContext()
    const navigate = useNavigate()
    
    function goToQuiz() {
        setIsLoading(true)
        if (sessionStorage.getItem("category")) {
            setIsLoading(false)
            navigate("/quiz")
        }else{
            alert("Choose quiz category!!!")
            setIsLoading(false)
        }
        
    }

    return (
        <div className="container">
            <h1>Welcome {userName}</h1>
            
            <h4>Select a Quiz Category</h4>
            <select defaultValue={"DEFAULT"} onChange={e=>{sessionStorage.setItem("category", e.target.value)}}>
                <option hidden value={"DEFAULT"}>Choose Quiz Category</option>
                <option value={"General Knowledge"}>General Knowledge Quiz</option>
                <option value={"Geography Quiz"}>Geography Quiz</option>
                <option value={"Food & Drink Quiz"}>Food And Drink Quiz</option>
                <option value={"Sports Quiz"}>Sports Quiz</option>
            </select>
            
            <button onClick={goToQuiz}>
                {isLoading?<ClipLoader
                    color={"#fff"}
                    loading={isLoading}
                    size={10}
                    /> 
                :"Start Quiz"}
            </button>
            <p><Link to={""} onClick={logoutUser}>Logout</Link></p>
        </div>
    );
}
 
export default Home;