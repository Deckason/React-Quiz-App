import { useForm } from 'react-hook-form';
import { yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuizContext } from './CustomContextProvider';

const Register = () => {
    const navigate = useNavigate();
    const { createAccount, setConnErr} = useQuizContext()

    const registerSchema = yup.object().shape({
        name: yup.string().required("Name is required!"),
        username: yup.string().required("username is required!").min(3, "Min 3 characters!"),
        email: yup.string().required("Email is required!").email(),
        password: yup.string().required("Password is required!").min(8, "Min 8 characters"),
        confirmPassword: yup.string().required("Confirm password is required!").oneOf([yup.ref("password")], "Password do not match")
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(registerSchema),
      });

      async function handleRegister(data) {
        //const auth = getAuth()
       /* const user = {
            name: data.name,
            username: data.username,
            email: data.email,
            password: data.password
        }
        */
        
        try {
            await createAccount( data.email, data.password, data.username)
            navigate("/")

        } catch (error) {
            setConnErr(error.message)
        }
            
            
            //console.log("Account created", auth.currentUser)
            //await updateProfile(auth.currentUser,{
              //  displayName: data.username
            //})
            //setUser(auth.currentUser);
            //setUserName(user.displayName)


       
            //localStorage.setItem("user", JSON.stringify(user));
            //navigate("/login");
    }
    


    return (
        <div className="container">
            <form action="" className="register" onSubmit={handleSubmit(handleRegister)}>
                <h2>Register</h2>
                    <p className="errors">{errors.name?.message}</p>
                    <p className="errors">{errors.username?.message}</p>
                    <p className="errors">{errors.email?.message}</p>
                    <p className="errors">{errors.password?.message}</p>
                    <p className="errors">{errors.confirmPassword?.message}</p>
                
                <input type={"text"} placeholder="Enter Name" {...register("name")}/>
                <input type={"text"} placeholder="Enter Username" {...register("username")}/>
                <input type="text" placeholder="Enter Email" {...register("email")}/>
                <input type={"password"} placeholder="Enter Password" autoComplete='password' {...register("password")}/>
                <input type={"password"} placeholder="Enter Confirm Password" autoComplete='password' {...register("confirmPassword")}/>
                <button>Submit</button>
                <p>Already have an account? <Link to={"/login"}>Login here</Link></p>
            </form>
        </div>
    );
}
 
export default Register;