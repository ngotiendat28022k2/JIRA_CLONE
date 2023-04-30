import React, {useEffect, useRef, useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchDevice, updateDevice, createDevice } from '../slice/device'
import { createOtp, fetchOtp } from '../slice/otp'
import Notification from './util/notification'

type Props = {
}

  let indexOTP :number = 0
  const VerifyOtp = (props: Props) => {
    const  [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || ""))
    const [device, setDevice] = useState<string>(JSON.parse(localStorage.getItem("device")!))
    const [notify, setNotify] = useState({isOpen:false, message:"", type:"success"})
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""))
    const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const [messageError, setMessageError] = useState(true)
    const navigate = useNavigate();
    const dispatch = useDispatch()

  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>):void => {
    const value = e.target.value
    const newOtp: string[] = [...otp]
    newOtp[indexOTP] = value.substring(value.length-1)
    // console.log("newOtp", newOtp);
    
    if(!value) setActiveOtpIndex(indexOTP - 1)
    else setActiveOtpIndex(indexOTP + 1)
    setOtp(newOtp)
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOtpIndex])

  const handleOnKeyDown =async ({key}:React.KeyboardEvent<HTMLInputElement>, index:number) => {
    indexOTP = index
    if(key === "Backspace") setActiveOtpIndex(indexOTP - 1)     
  }
  const onHandleSave = async (data) => {
    const device = {
      ...data.device,
      email: data.email,
      userID: data.userID
    }
    await dispatch(createDevice(device))
  }

  const onHandleVerify =async () => {
    if(otp[otp.length - 1] === "") {
      setMessageError(false)
    }
    const otpString = otp.toString()
    otpString.replaceAll(",","")
    
    setMessageError(true)
      const valOTP = {
        email:user.email,
        otp: otpString.replaceAll(",","")
      }   

      await dispatch(fetchOtp(valOTP)).then(() => {
       setNotify({
        isOpen:true,
        message:"OTP Exactly",
        type:"success"
      })
      onHandleSave(user)
      setTimeout(() => {
        navigate("/signin");
      }, 2000)

    }).catch((error) => {
      setNotify({
        isOpen:true,
        message: "OTP is incorrect",
        type:"error"
      })
      
    })
  }
  const handleResend =async () => {
    const emailOTP = {
      email:user.email
     }
     const {payload} = await dispatch(createOtp(emailOTP))
     if(payload.resultOtp){
       alert(`otp has been sent back to gmail ${user.email}`)
     }
  }

  return (
   <>
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {user?.email}</p>
              </div>
            </div>
      
            <div>
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-[430px]">
                  {otp.map((_, index) => 
                    <div className="w-16 h-16 " key={index}>
                        <input 
                          ref={index === activeOtpIndex ? inputRef : null}
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700 px-[5px]" 
                          type="text" 
                          name="" 
                          id="" 
                          value={otp[index]}
                          onChange={(e) => handleOnChange(e)}
                          onKeyDown={(e) => handleOnKeyDown(e, index)}
                        />
                    </div>
                  )}

                  
                  </div>
                  {!messageError ? <span className='text-red-600 ml-[12px] text-[14px]'>Please fill out the information otp</span> : ""}
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button 
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        onClick={onHandleVerify}
                      >
                        Verify Account
                      </button>
                    </div>
      
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p> 
                      <span 
                        className="flex flex-row items-center text-blue-400 cursor-pointer hover:text-blue-600"
                        onClick={() => handleResend()}
                      >
                        Resend
                      </span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </>
  )
}

export default VerifyOtp