import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile 
} from "firebase/auth";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth } from "../config/firebase";

 const AppContext = createContext()
export const useQuizContext = () => useContext(AppContext)

const CustomContextProvider = ({children}) => {
    //STATES FOR MY APP
    const [userName, setUserName] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState("")
    const [quiz, setQuiz] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [answser, setAnswer] = useState("")
    const [id, setId] = useState(0)
    const [category, setCategory] = useState("")

    //FUNCTION TO CREATE USERS ACCOUNT
    function createAccount(email, password, username) {
        return (
            createUserWithEmailAndPassword(auth, email, password)
            .then((cred)=>{
                sessionStorage.setItem("email", cred.user.email)
                updateProfile(auth.currentUser,{
                    displayName: username
                }).then(()=>{
                    setUserName(cred.user.displayName)
                    sessionStorage.setItem("userName", cred.user.displayName)
                }).catch((error)=>{
                    setErr(error.message)
                })
            })
            .catch((error)=>{
                setErr(error.message)
            })
        )
    }

    //FUNCTION TO LOGIN USER
    function signInAccount(email,password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //FUNCTION TO LOGOUT USER AND DESTROY SESSION
    function logoutUser() {
        signOut(auth).then(()=>{
            sessionStorage.clear()
            setUser(null)
            document.location.reload()
        }).catch(error=>{
            setErr(error.message)
        })
    }

    //NAVIGATES TO THE NEXT QUESTION
    function nextQuestion() {
        setErr("")
        setId(id === quiz.numOfQuestions ? quiz?.numOfQuestions : id+1)
       }
    
    //NAVIGATES TO THE PREVIOUS QUESTION
       function prevQuestion() {
        setErr("")
        setId(id==0?0:id-1)
    }
    
    useEffect(()=>{
        onAuthStateChanged(auth, user=>{
            setUser(user)
            setUserName(user?.displayName)
            //setEmail(user.email)
            //console.log(user.email)
        })
    },[user])

    //VALUES FOR MY STATE MANAGEMENTS
    const value = {
        userName,
        setUserName,
        user,
        setUser,
        createAccount,
        signInAccount,
        err,
        setErr,
        logoutUser,
        quiz,
        setQuiz,
        isLoading,
        setIsLoading,
        id,
        setId,
        nextQuestion,
        prevQuestion,
        category,
        setCategory,
        answser,
        setAnswer
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}
 
export default CustomContextProvider;