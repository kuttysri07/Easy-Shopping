import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userSignup } from "./Redux/auth/auth.login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name , setName] = useState("")
  const [signup, setSignup] = useState(false);

  const { User, loading, error } = useSelector((state) => state.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Check if the user is already logged in
  useEffect(() => {
    if (User) {
      navigate("/"); // Redirect to home page if the user is logged in
    }
  }, [User, navigate]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!signup) {
      dispatch(userLogin({ email, password }));
    }else{
      dispatch(userSignup({ email, password ,name }));
    }
  
  };

  return (
    <div>
      <div className="bg-white dark:bg-gray-900">
        <div className="flex justify-center h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/3"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
            }}
          >
            <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                EasyShop
                </h2>
                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis
                  libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <div className="flex justify-center mx-auto">
                 
                </div>
                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  {signup
                    ? "Sign Up to access your account"
                    : " Sign in to access your account"}
                </p>
              </div>

              <div className="mt-8">
                <form onSubmit={handleSubmit}>
                  {signup && (
                    <div>
                      <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Sri Ram"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-600 dark:text-gray-200">
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={loading} // Disable the button if loading
                      className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      {loading ? "Logging in..." : "Sign in"}{" "}
                      {/* Show loading text */}
                    </button>
                  </div>
                </form>
                {error && (
                  <p className="mt-4 text-red-500 text-center">{error}</p>
                )}{" "}
                {/* Display error message */}
                {!signup && (
                  <p className="mt-6 text-sm text-center text-gray-400">
                    Don&#x27;t have an account yet?{" "}
                    <a
                      className="text-blue-500 focus:outline-none focus:underline hover:underline"
                      onClick={() => setSignup(!signup)}
                    >
                      Sign up
                    </a>
                    .
                  </p>
                )}
                {signup && (
                  <p className="mt-6 text-sm text-center text-gray-400">
                    Already have an account ?{" "}
                    <a
                      className="text-blue-500 focus:outline-none focus:underline hover:underline"
                      onClick={() => setSignup(!signup)}
                    >
                      Sign in
                    </a>
                    .
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
