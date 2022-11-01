import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {collection, addDoc} from "firebase/firestore"
import { db } from "../config/firebase";
import { useQuizContext } from "./CustomContextProvider";
import { ClipLoader } from "react-spinners";

const AddQuiz = () => {

    const {isLoading, setIsLoading, err, setErr} = useQuizContext()

    const addQuizSchema = yup.object().shape({
        question: yup.string().required("Question field is required!"),
        optionA: yup.string().required("Input field is required!"),
        optionB: yup.string().required("Input field is required!"),
        optionC: yup.string().required("Input field is required!"),
        optionD: yup.string().required("Input field is required!"),
        answer: yup.string().required("Provide an answer to the question"),
        category: yup.string().required("Select a category"),
    })

    const {register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(addQuizSchema),
    })

    async function addQuiz(data) {
        //const quiz = {
          //  Question: data.Question,
            //optionA: data.optionA,
            //optionB: data.optionB,
            //optionC: data.optionC,
            //optionD: data.optionD,
            //answer: data.answer,
            //category: data.category,
        //}

        try {
            setIsLoading(true)
            const addQuizRef = collection(db, "quiz")
            const docRef = await addDoc(addQuizRef,{
                question: data.question,
                options: [data.optionA,data.optionB,data.optionC,data.optionD],
                answer: data.answer,
                category: data.category,
            })
            console.log(docRef.id, "Document added")
            setIsLoading(false)
            const form = document.querySelector(".addQuizForm")
            form.reset()
        } catch (error) {
            setErr(error.message)
            setIsLoading(false)
        }
    }

    return (
        <div className="container">
                <form className="addQuizCode">
                    <input type="password" placeholder="Enter access code" autoComplete="password"/>
                    <button>Submit</button>
                </form>
               
               <form className="addQuizForm" onSubmit={handleSubmit(addQuiz)}>
                <p>{err}</p>
                    <div className="question">
                        <textarea placeholder="Enter Question here" {...register("question")}/>
                        <small className="errors">{errors.question?.message}</small>
                    </div>
                    <div className="QuestionOptions">
                        <div className="input">
                            <input type="text"  placeholder="Enter option A" {...register("optionA")}/>
                            <small className="errors">{errors.optionA?.message}</small>
                        </div>
                       <div className="input">
                            <input type="text" placeholder="Enter option B" {...register("optionB")}/>
                            <small className="errors">{errors.optionB?.message}</small>
                       </div>
                        <div className="input">
                            <input type="text" placeholder="Enter option C" {...register("optionC")}/>
                            <small className="errors">{errors.optionC?.message}</small>
                        </div>
                        <div className="input">
                            <input type="text" placeholder="Enter option D" {...register("optionD")}/>
                            <small className="errors">{errors.optionD?.message}</small>
                        </div>
                    </div>
                    <div className="questionAnswer">
                        <input type="text" placeholder="Enter your answer" {...register("answer")}/>
                        <small className="errors">{errors.answer?.message}</small>
                    </div>
                    <select {...register("category")}>
                        <option hidden value={""}>Choose Quiz Category</option>
                        <option value={"General Knowledge"}>General Knowledge Quiz</option>
                        <option value={"Geography Quiz"}>Geography Quiz</option>
                        <option value={"Food & Drink Quiz"}>Food And Drink Quiz</option>
                        <option value={"Sports Quiz"}>Sports Quiz</option>
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