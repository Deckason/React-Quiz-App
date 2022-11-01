import { useForm } from 'react-hook-form';
import { yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuizContext } from './CustomContextProvider';
import ClipLoader from "react-spinners/ClipLoader"

    const Login = () => {

        const {signInAccount, isLoading, setIsLoading, setErr, err} = useQuizContext()
        const navigate = useNavigate();

    const loginSchema = yup.object().shape({
        email: yup.string().required("email is required!").email(),
        password: yup.string().required("Password is required!").min(8, "Min 8 characters"),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(loginSchema),
      });
    
    async function handleLogin(data) {
        setIsLoading(true)
        try {
            await signInAccount(data.email, data.password)
            sessionStorage.setItem("email", data.email)
            //console.log("Signed in: ", data.email)
            //setUser(auth.currentUser)
            //setUserName(user.displayName)
            setIsLoading(false)
            navigate("/")
        } catch (error) {
            setErr(error?.message)
            setIsLoading(false)
        }
        //navigate("/")
    }

       // const saved = localStorage.getItem("user")
    //const initialValue = JSON.parse(saved)

    return (
        <div className="container">
            <form action="" className="login" onSubmit={handleSubmit(handleLogin)}>
                <h2>Login</h2>
                    <p className="errors">{err}</p>
                    <p className="errors">{errors.email?.message}</p>
                    <p className="errors">{errors.password?.message}</p>
                
                <input type={"text"} placeholder="Enter email" {...register("email")}/>
                <input type={"password"} placeholder="Enter Password" autoComplete='password' {...register("password")}/>
                <button>
                    {isLoading?<ClipLoader
                    color={"#fff"}
                    loading={isLoading}
                    size={10}
                    /> 
                    : "Submit"}
                </button>
                <p>Don't have an account? <Link to={"/register"}>Register here</Link></p>
            </form>
        </div>
    );
}
 
export default Login;