import { useEffect, useState } from "react";
import { FaGoogle, FaMagnifyingGlass } from "react-icons/fa6";
import { GrNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useCart } from "./cartcontext";
import { IoIosArrowBack } from "react-icons/io";
import axiosInstance from "../config/api";
import useUser from "../hooks/useUser";
import UserAvatarDropdown from "./avatar";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "../schemas/LoginVadiation";

const Header = () => {
  const { user } = useUser();
  const { cartItemCount, updateCartItemCount } = useCart();
  const [inputValue, setInputValue] = useState("");
  const [isChatboxVisible, setChatboxVisible] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [view, setView] = useState("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState({ email: "", password: "" });

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordError, setForgotPasswordError] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRepass, setSignupRepass] = useState("");
  const [signupError, setSignupError] = useState({
    name: "",
    email: "",
    password: "",
    repass: "",
  });

  const [errors, setErrors] = useState({
    dob: "",
    address: "",
    phoneNumber: "",
    gender: "",
  });


  const handleChange = (e) => setInputValue(e.target.value);
  const toggleChatbox = () => setChatboxVisible(!isChatboxVisible);
  const toggleLogin = () => {
    if (user) return;
    setLoginVisible(!isLoginVisible);
    setView("login");
  };

  const googleSignIn = () => {
    window.open("http://localhost:3000/api/auth/google", "_self");
  };

  const validateSignIn = () => {
    let isValid = true;
    const error = { email: "", password: "" };

    const emailError = validateEmail(loginEmail);
    const passwordError = validatePassword(loginPassword);

    if (emailError || passwordError) {
      isValid = false;
      error.email = emailError;
      error.password = passwordError;
    }

    setLoginError(error);
    return isValid;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!validateSignIn()) {
      return;
    }

    const response = await axiosInstance.post("/user/login", {
      email: loginEmail,
      password: loginPassword,
    });
    if (response.data.account) {
      localStorage.setItem("user", JSON.stringify(response.data.account));
      window.location.reload();
    }
  };

  const validateForgotPassword = () => {
    const error = validateEmail(forgotPasswordEmail);
    let isValid = true;

    if (error !== "") {
      isValid = false;
      setForgotPasswordError(error);
    }
    return isValid;
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    if (!validateForgotPassword()) {
      return;
    }
  };

  const validateSignup = () => {
    const error = { name: "", email: "", password: "", repass: "" };
    let isValid = true;

    const nameError = validateName(signupName);
    const emailError = validateEmail(signupEmail);
    const passwordError = validatePassword(signupPassword);
    const repassError = validateConfirmPassword(signupPassword, signupRepass);

    if (nameError || emailError || passwordError || repassError) {
      isValid = false;
      error.name = nameError;
      error.email = emailError;
      error.password = passwordError;
      error.repass = repassError;
    }

    setSignupError(error);
    return isValid;
  };
  const handleClicked = () => {
    setIsModalOpen(true);
  }
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!validateSignup()) {
      return;
    }
  };
  const handleAdditionalDetailsSubmit = (event) => {
    event.preventDefault();

    const dob = event.target.dateOfBirth.value;
    const address = event.target.address.value;
    const phoneNumber = event.target.phoneNumber.value;
    const gender = event.target.gender.value;

    let errorMessages = {
      dob: "",
      address: "",
      phoneNumber: "",
      gender: "",
    };

    // Validate Date of Birth
    if (!dob) {
      errorMessages.dob = "Please select a valid Date of Birth.";
    }

    // Validate Address
    if (!address) {
      errorMessages.address = "Please enter your address.";
    }

    // Validate Phone Number using a regex pattern for basic phone number validation
    const phonePattern = /^[0-9]{10}$/;  // For a 10-digit phone number
    if (!phoneNumber || !phonePattern.test(phoneNumber)) {
      errorMessages.phoneNumber = "Please enter a valid phone number (10 digits).";
    }

    // Validate Gender
    if (!gender) {
      errorMessages.gender = "Please select a gender.";
    }

    // If there are any errors, set the error state
    if (Object.values(errorMessages).some((message) => message !== "")) {
      setErrors(errorMessages);
      return;
    }

    setIsModalOpen(false); // Close the modal if no errors
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartItemCount(cart.length);
  }, [updateCartItemCount]);

  return (
    <div className='w-full bg-customBlack py-4 flex justify-between items-center'>
      <div className='ml-5 flex flex-row w-[50%] h-full items-center'>
        <Link to='/'>
          <label className='text-white font-roboto text-[20px]'>
            E-ShopHub
          </label>
        </Link>
        <div
          className={`ml-5 h-[100%] bg-white rounded-full flex flex-row items-center transition-all duration-300 ${isSearchFocused ? "w-[50%]" : "w-[40%]"
            }`}>
          <input
            type='text'
            value={inputValue}
            onChange={handleChange}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className='border ml-4 h-full w-full text-sm border-gray-50 focus:outline-none'
            placeholder='Search'
          />
          <button className='mr-3'>
            <FaMagnifyingGlass />
          </button>
        </div>
      </div>

      <div className='mr-5 flex items-center'>
        <button onClick={() => toggleLogin()}>
          {!user ? (
            <img src='/src/assets/user.png' className='h-[20px] w-[20px]' />
          ) : (
            <UserAvatarDropdown image={user.image} />
          )}
        </button>
        <div className='relative ml-5'>
          <Link to='shoppingcart'>
            <img
              src='/src/assets/trolley.png'
              className='h-[25px] w-[25px]'
              alt='Shopping Cart Icon'
            />
          </Link>
          <span className='absolute top-0 left-4 inline-flex items-center justify-center h-3 w-3 text-[8px] font-bold text-black bg-white border-[0.5px] rounded-full'>
            {cartItemCount}
          </span>
        </div>
        <button onClick={toggleChatbox}>
          <img src='/src/assets/chat.png' className='ml-5 h-[20px] w-[20px]' />
        </button>
      </div>

      {isChatboxVisible && (
        <div className='z-30 fixed bottom-2 right-5 w-[300px] h-[250px] bg-white border border-gray-300 rounded-3xl shadow-lg flex flex-col justify-center items-center'>
          <div className='h-[90%] w-[90%]'>
            <div className='h-[80%] w-full'>
              <div className='flex items-center mb-4'>
                <div className='w-8 h-8 bg-black rounded-full mr-2'></div>
                <span className='text-black'>Hi, What can I help you?</span>
              </div>
              <div className='mb-4'>
                <p>I need a smartphone suitable for my heavy gaming.</p>
              </div>
            </div>
            <div className='h-[20%] w-full flex items-center justify-center'>
              <div className='h-10 w-52 flex items-center rounded-full border-[0.5px] border-black'>
                <input
                  type='text'
                  placeholder='Type a message'
                  className='ml-3 w-40'
                />
              </div>
              <button className='ml-3 h-10 w-10 rounded-full bg-black text-white'>
                ↑
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login/Signup Modal */}
      {isLoginVisible && (
        <>
          {/* Blur Background */}
          <div
            className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40'
            onClick={toggleLogin}></div>

          {/* Popup for Login/Sign-Up/Forgot Password */}
          <div className='lg:w-[40%] max-w-[600px] justify-center z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[70%] p-6 bg-white border border-gray-300 rounded-3xl shadow-lg flex flex-col items-center'>
            <div className='h-auto  w-[100%] flex flex-col items-center'>
              <div className='w-[80%] mb-10 flex flex-col justify-start'>
                <h2 className='text-lg font-thin'>E-ShopHub</h2>
                <div className='flex justify-between w-full items-end'>
                  <h1 className='text-4xl font-bold'>
                    {view === "signup"
                      ? "Sign Up"
                      : view === "forgot"
                        ? "Forgot Password"
                        : "Login"}
                  </h1>
                  {view === "login" && (
                    <button
                      className='mb-[2px] font-bold text-sm'
                      onClick={() => setView("signup")}>
                      I don&apos;t have an account.
                    </button>
                  )}
                </div>
              </div>

              {/* Login Form */}
              {view === "login" && (
                <form
                  noValidate
                  onSubmit={(e) => handleLoginSubmit(e)}
                  className='w-full flex flex-col items-center'>
                  <div className='mb-2 w-[80%] font-medium flex flex-col'>
                    Email
                    {loginError.email !== "" && (
                      <span className='text-red-500 text-sm'>
                        {loginError.email}
                      </span>
                    )}
                  </div>
                  <input
                    type='email'
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder='Email'
                    className={`w-[80%] mb-3 p-2 rounded-lg ${loginError.email
                      ? "border-2 border-red-500"
                      : "border-[0.5px] border-black"
                      }`}
                    onFocus={() =>
                      setLoginError((prevError) => ({
                        ...prevError,
                        email: "",
                      }))
                    }
                  />
                  <div className='mb-2 w-[80%] font-medium flex flex-col justify-start'>
                    Password
                    {loginError.password !== "" && (
                      <span className='text-red-500 text-sm'>
                        {loginError.password}
                      </span>
                    )}
                  </div>
                  <input
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    type='password'
                    placeholder='Password'
                    className={`w-[80%] mb-3 p-2 rounded-lg ${loginError.password
                      ? "border-2 border-red-500"
                      : "border-[0.5px] border-black"
                      }`}
                    onFocus={() =>
                      setLoginError((prevError) => ({
                        ...prevError,
                        password: "",
                      }))
                    }
                  />
                  <div className='flex flex-col justify-end items-end w-[80%]'>
                    <button
                      className='font-light text-sm'
                      onClick={() => setView("forgot")}>
                      Forgot your password?
                    </button>
                  </div>
                  <div className='w-[80%] flex justify-between mt-4'>
                    <button
                      type='submit'
                      className='flex items-center gap-2 bg-white text-sm py-2 px-6 border-[0.5px] border-black rounded-3xl'
                      onClick={googleSignIn}>
                      <FaGoogle className='text-[22px]' />
                      Sign in with Google
                    </button>
                    <button className='flex justify-center items-center w-[50px] h-[50px] bg-black text-white rounded-full'>
                      <GrNext />
                    </button>
                  </div>
                  <div />
                </form>
              )}

              {/* Sign-Up Form */}
              {view === "signup" && (
                <form
                  noValidate
                  className='w-[80%]'
                  onSubmit={(e) => handleSignupSubmit(e)}>
                  <div>
                    <button
                      className='bg-none border-none self-start flex gap-1.5 items-center hover:underline font-light text-sm mb-5'
                      onClick={() => setView("login")}>
                      <IoIosArrowBack />
                      Login
                    </button>
                  </div>

                  {/* Full Name */}
                  <div className='mb-5 items-center font-medium flex flex-row'>
                    <p className='w-[35%]'>Full name</p>
                    <div className='flex-grow flex flex-col'>
                      <input
                        type='text'
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        onFocus={() =>
                          setSignupError((prev) => ({ ...prev, name: "" }))
                        }
                        className={`border ${signupError.name
                          ? "border-2 border-red-500"
                          : "border-[0.5px] border-black"
                          } rounded-lg p-2`}
                      />
                      {signupError.name && (
                        <p className='text-red-500 text-sm mt-1 self-end'>
                          {signupError.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className='mb-5 items-center font-medium flex flex-row'>
                    <p className='w-[35%]'>Email</p>
                    <div className='flex-grow flex flex-col'>
                      <input
                        type='email'
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        onFocus={() =>
                          setSignupError((prev) => ({ ...prev, email: "" }))
                        }
                        className={`border ${signupError.email
                          ? "border-2 border-red-500"
                          : "border-[0.5px] border-black"
                          } rounded-lg p-2`}
                      />
                      {signupError.email && (
                        <p className='text-red-500 text-sm mt-1 self-end'>
                          {signupError.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Password */}
                  <div className='mb-5 items-center font-medium flex flex-row'>
                    <p className='w-[35%]'>Password</p>
                    <div className='flex-grow flex flex-col'>
                      <input
                        type='password'
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        onFocus={() =>
                          setSignupError((prev) => ({ ...prev, password: "" }))
                        }
                        className={`border ${signupError.password
                          ? "border-2 border-red-500"
                          : "border-[0.5px] border-black"
                          } rounded-lg p-2`}
                      />
                      {signupError.password && (
                        <p className='text-red-500 text-sm mt-1 self-end'>
                          {signupError.password}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className='mb-5 items-center font-medium flex flex-row'>
                    <p className='w-[35%]'>Confirm password</p>
                    <div className='flex-grow flex flex-col'>
                      <input
                        type='password'
                        value={signupRepass}
                        onChange={(e) => setSignupRepass(e.target.value)}
                        onFocus={() =>
                          setSignupError((prev) => ({ ...prev, repass: "" }))
                        }
                        className={`border ${signupError.repass
                          ? "border-2 border-red-500"
                          : "border-[0.5px] border-black"
                          } rounded-lg p-2`}
                      />
                      {signupError.repass && (
                        <p className='text-red-500 text-sm mt-1 self-end'>
                          {signupError.repass}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='flex justify-between mt-4'>
                    <button
                      type='button'
                      className='flex items-center gap-2 bg-white text-sm py-2 px-6 border-[0.5px] border-black rounded-3xl'
                      onClick={googleSignIn}>
                      <FaGoogle className='text-[22px]' />
                      Sign up with Google
                    </button>
                    <button onClick={handleClicked} className='flex justify-center items-center w-[50px] h-[50px] bg-black text-white rounded-full'>
                      <GrNext />
                    </button>
                  </div>
                </form>
              )}
              {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                  <div className="bg-white h-full p-6 rounded-lg w-[90%] max-w-md relative">
                    <h2 className="text-lg font-bold mb-4">Additional Details</h2>
                    <form onSubmit={(e) => handleAdditionalDetailsSubmit(e)}>
                      <div className="mb-4">
                        <label className="block mb-2">Date of Birth</label>
                        <input
                          type="date"
                          className="w-full border rounded px-3 py-2"
                          required
                          name="dateOfBirth"
                        />
                        {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2">Address</label>
                        <input
                          type="text"
                          className="w-full border rounded px-3 py-2"
                          placeholder="Enter your address"
                          required
                          name="address"
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2">Phone Number</label>
                        <input
                          type="tel"
                          className="w-full border rounded px-3 py-2"
                          placeholder="Enter your phone number"
                          required
                          name="phoneNumber"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2">Gender</label>
                        <select className="w-full border rounded h-10" required name="gender">
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                      </div>
                      <button
                        type="submit"
                        className="ml-auto flex justify-center items-center w-[50px] h-[50px] bg-black text-white rounded-full"
                      >
                        <GrNext />
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Forgot Password Form */}
              {view === "forgot" && (
                <>
                  <div className='w-[80%] flex flex-col'>
                    <button
                      className='bg-none border-none self-start flex gap-1.5 items-center hover:underline font-light text-sm mb-5'
                      onClick={() => setView("login")}>
                      <IoIosArrowBack />
                      Login
                    </button>
                    <div>
                      Type your email and we&apos;ll send you a new password
                      {forgotPasswordError && (
                        <p className='text-red-500 text-sm'>
                          {forgotPasswordError}
                        </p>
                      )}
                    </div>

                    <form
                      noValidate
                      onSubmit={(e) => handleForgotPasswordSubmit(e)}>
                      <div className='mt-3 flex flex-row items-center gap-4'>
                        <input
                          type='email'
                          placeholder='Email'
                          onChange={(e) =>
                            setForgotPasswordEmail(e.target.value)
                          }
                          className={`p-2 h-[50px] rounded-lg flex-grow ${forgotPasswordError !== ""
                            ? "border-2 border-red-500"
                            : "border-[0.5px] border-black"
                            }`}
                          onFocus={() => setForgotPasswordError("")}
                        />
                        <button className='ml-2 w-[50px] flex justify-center items-center h-[50px] bg-black text-white rounded-full'>
                          <GrNext className='w-[15px] h-[15px]' />
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
