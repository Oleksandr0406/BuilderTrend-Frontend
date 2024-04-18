import { Link, useNavigate } from "react-router-dom"
import { usePassword } from "../hooks/usePassword"
import { useState } from "react"
import { useDispatch } from "react-redux"
import {loadingOff, loadingOn} from '../store/authSlice'
import { signupUser } from "../services/auth"

export const Signup = () => {
  const [showPassword, showPass, hidePass] = usePassword()
  const [showConfirmPassword, showConfirmPass, hideConfirmPass] = usePassword()
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

  const handleSignup = async () => {
    if (!userInfo.email || !userInfo.password || !userInfo.confirmPassword) {
      alert('Signup fields cannot be empty!');
      return;
    }
    dispatch(loadingOn())
    const res = await signupUser({...userInfo})
    
    dispatch(loadingOff())
    if (typeof res === 'string') {
      alert(res);
      return;
    }
    if (res) {
      navigate('/signin')
    }
  }

  return (
    <div className="w-[100%] h-[100vh] flex flex-col gap-6 justify-center items-center bg-cover bg-[url('/bg.png')]">
      <div className="w-96">
        <img src="https://delmar-react-tailwind.vercel.app/static/media/logo.9f804465c04a053b763ff5493042c6f5.svg" alt="logo" 
          className="w-[100%] h-[100%]"
        />
      </div>

      <div className="bg-white rounded-3xl w-[90%] p-4 md:w-[60%] md:p-10 lg:w-[35%] lg:p-16">
        <p className="font-[500] text-3xl text-center">Sign Up</p>

        <div className="mt-4 flex flex-col gap-6">
            <div className="shadow-md rounded-2xl p-2 bg-white flex items-center">
                <div className="w-7">
                <img src="https://delmar-react-tailwind.vercel.app/static/media/email.b49826fce354b47df4ea66518a70a532.svg" alt="image" 
                    className="w-[100%] h-[100%]"
                />
                </div>
                <input placeholder="E-mail" className="p-2 border-none w-[100%] placeholder:text-red-400 focus:outline-none" 
                  name='email' onChange={handleChange} value={userInfo.email}
                />
            </div>

            <div className="shadow-md rounded-2xl p-2 bg-white flex items-center">
                <div className="w-12">
                <img src="https://delmar-react-tailwind.vercel.app/static/media/password.0baf6a7cbb9d864baf542676971cdaa9.svg" alt="image" 
                    className="w-[100%] h-[100%]"
                />
                </div>
                <input placeholder="Password" type={showPassword ? "password": "text"} className="p-2 border-none w-[100%] placeholder:text-red-400 focus:outline-none" 
                  name='password' onChange={handleChange} value={userInfo.password}
                />
                <div className="w-10">
                { showPassword ? <img src="https://delmar-react-tailwind.vercel.app/static/media/eye-lock.d107eb1ce1b5084858dc197fcebf2cf4.svg" alt="image" 
                    className="w-[100%] h-[100%] cursor-pointer"  onClick={hidePass}
                /> :
                <img src="https://delmar-react-tailwind.vercel.app/static/media/eye.d0bc4ebd567464de6ea6c8aacbbed3a1.svg" alt="image" 
                    className="w-[100%] h-[100%] cursor-pointer" onClick={showPass}
                /> }
                </div>
            </div>

            <div className="shadow-md rounded-2xl p-2 bg-white flex items-center">
                <div className="w-12">
                    <img src="https://delmar-react-tailwind.vercel.app/static/media/password.0baf6a7cbb9d864baf542676971cdaa9.svg" alt="image" 
                        className="w-[100%] h-[100%]"
                    />
                </div>
                <input placeholder="Confirm password" type={showConfirmPassword ? "password": "text"} className="p-2 border-none w-[100%] placeholder:text-red-400 focus:outline-none" 
                  name='confirmPassword' onChange={handleChange} value={userInfo.confirmPassword}
                />
                <div className="w-10">
                    { showConfirmPassword ? <img src="https://delmar-react-tailwind.vercel.app/static/media/eye-lock.d107eb1ce1b5084858dc197fcebf2cf4.svg" alt="image" 
                        className="w-[100%] h-[100%] cursor-pointer"  onClick={hideConfirmPass}
                    /> :
                    <img src="https://delmar-react-tailwind.vercel.app/static/media/eye.d0bc4ebd567464de6ea6c8aacbbed3a1.svg" alt="image" 
                        className="w-[100%] h-[100%] cursor-pointer" onClick={showConfirmPass}
                    /> }
                </div>
            </div>
        </div>

        <div className="w-[50%] mx-auto mt-6">
          <button className="w-[100%] p-2 bg-red-600 rounded-3xl text-white font-semibold shadow-lg"
            onClick={handleSignup}
          >
            SIGN UP
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-5">
            <p className="text-red-400 text-sm">Already have an account?</p>
            <p className="text-red-400 text-sm font-semibold cursor-pointer">
                <Link to="/signin">Sign In</Link>
            </p>
        </div>
      </div>
    </div>
  )
}
