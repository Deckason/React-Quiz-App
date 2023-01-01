import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {collection, addDoc, getDocs} from "firebase/firestore"
import { db } from "../config/firebase";
import { useQuizContext } from "./CustomContextProvider";
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddQuiz = () => {

    const {isLoading, setIsLoading, err, setErr, logoutUser, shufle, category, setCategory, filterArr} = useQuizContext()
    const navigate = useNavigate()

    const addQuizSchema = yup.object().shape({
        question: yup.string().required("Question field is required!"),
        optionA: yup.string().required("Input field is required!"),
        optionB: yup.string().required("Input field is required!"),
        optionC: yup.string().required("Input field is required!"),
        answer: yup.string().required("Provide an answer to the question"),
        category: yup.string().required("Select a category"),
    })

    const {register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(addQuizSchema),
    })
    
    async function addQuiz(data) {
        const options = [data.optionA,data.optionB,data.optionC,data.answer];
        shufle(options)
        try {
            console.log(data)
            setIsLoading(true)
            const addQuizRef = collection(db, "quiz")
            const docRef = await addDoc(addQuizRef,{
                question: data.question,
                options: options,
                answer: data.answer,
                category: data.category,
            })
            if (docRef) {
                alert("Question added successfully")
            }
            window.location.reload()
            setIsLoading(false)
        } catch (error) {
            setErr(error.message)
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
                {/*<form className="addQuizCode">
                    <input type="password" placeholder="Enter access code" autoComplete="password"/>
                    <button>Submit</button>
                </form>*/}
               
               <div className="topNav">
                    <button onClick={logoutUser}>Logout</button>
                    <button onClick={()=>navigate("/")}>Home</button>
                </div>
               <form className="addQuizForm" onSubmit={handleSubmit(addQuiz)}>
                <p>{err && err}</p>
                    <div className="question">
                        <textarea className="inputDetails" placeholder="Enter Question here" {...register("question")}/>
                        <small className="errors">{errors.question?.message}</small>
                    </div>
                    <div className="QuestionOptions">
                        <div className="input">
                            <input type="text" className="inputDetails"  placeholder="Enter option A" {...register("optionA")}/>
                            <small className="errors">{errors.optionA?.message}</small>
                        </div>
                       <div className="input">
                            <input type="text" className="inputDetails" placeholder="Enter option B" {...register("optionB")}/>
                            <small className="errors">{errors.optionB?.message}</small>
                       </div>
                        <div className="input">
                            <input type="text" className="inputDetails" placeholder="Enter option C" {...register("optionC")}/>
                            <small className="errors">{errors.optionC?.message}</small>
                        </div>
                    </div>
                    <div className="questionAnswer">
                        <input type="text" className="inputDetails" placeholder="Enter correct answer" {...register("answer")}/>
                        <small className="errors">{errors.answer?.message}</small>
                    </div>
                    <select {...register("category")}>
                        <option className="inputDetails" hidden value={""}>Choose Quiz Category</option>
                        <option value={"General Knowledge"}>General Knowledge Quiz</option>
                        {category && category.map((element, key)=>(
                            <option key={key} value={element}>{element}</option>
                        ))}
                    </select>
                    <small className="errors">{errors.category?.message}</small>
                    <button>
                        {isLoading?<ClipLoader
                            color={"#fff"}
                            loading={isLoading}
                            size={10}
                            />
                        : "Submit"}
                    </button>
                </form> 
        </div>
    );
}
 
export default AddQuiz;