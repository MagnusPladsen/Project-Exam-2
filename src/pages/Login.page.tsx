import { useEffect, useState } from "react";
import LoginForm from "../components/forms/loginForm/LoginForm.component";
import RegisterForm from "../components/forms/registerForm/RegisterForm.component";
import Logo from "../components/logo/Logo.component";

function LoginPage() {
  const [register, setRegister] = useState(false);

  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (params.get("register") === "true") {
      setRegister(true);
    }
  }, []);

  return (
    <section
      className={` antialiased bg-gradient-to-b from-primary to-white h-full w-full `}
    >
      <div className="container px-6 mx-auto py-10">
        <div className="flex flex-col text-center md:text-left md:flex-row min-h-screen md:justify-evenly md:items-center">
          <div className="lg:flex flex-col w-full hidden lg:mb-80">
            <Logo logoSize="60" textClassName="!text-6xl" />
          </div>
          <div className="w-full md:w-9/12 mx-auto md:mx-0">
            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                {register ? "Register" : "Log in"}
              </h2>
              {register ? <RegisterForm /> : <LoginForm />}
              <p
                onClick={() => {
                  setRegister(!register);
                  // set params in rul
                  const url = new URL(window.location.href);
                  url.searchParams.set("register", (!register).toString());
                  window.history.pushState({}, "", url);
                }}
                className="transition-all text-md w-full text-center text-primary-medium group-hover:text-white hover:underline underline-offset-1 hover:text-primary cursor-pointer"
              >
                {register
                  ? "Already have an account? Login here!"
                  : "Don't have an account? Register here!"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
