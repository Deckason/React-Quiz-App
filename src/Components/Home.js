import { Link, useNavigate } from "react-router-dom";
import { useQuizContext } from "./CustomContextProvider";
import ClipLoader from "react-spinners/ClipLoader";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect } from "react";


const Home = () => {
    const {userName, logoutUser, isLoading, setIsLoading, category, setCategory, filterArr} = useQuizContext()
    const navigate = useNavigate()

    sessionStorage.removeItem("category")

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
    
    async function getCategories() {
        const categoryArr = []
        const querySnapshot = await getDocs(collection(db, "quiz"));
        querySnapshot.forEach((doc) => {
            categoryArr.push(doc.data().category);
        });
        setCategory(filterArr(categoryArr))
    }

    useEffect(()=>{
        getCategories()
    },[])

    return (
        <div className="container">
            <h1>Welcome {userName}</h1>
            
            <h4>Select a Quiz Category</h4>
            <select defaultValue={"DEFAULT"} onChange={e=>{sessionStorage.setItem("category", e.target.value)}}>
                <option hidden value={"DEFAULT"}>Choose Quiz Category</option>
                {category && category.map((element, key) =>(
                    <option key={key} value={element}>{element}</option>
                ))}
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