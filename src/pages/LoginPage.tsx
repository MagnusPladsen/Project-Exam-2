import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useLoginMutation } from "../services/api/authService";
import { setCredentials } from "../redux/slices/authSlice";
import Logo from "../components/logo/Logo";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formState, setFormState] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  console.log("formState", formState)

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const onClick = async () => {
    try {
      const result = await login(formState);
      console.log("result", result);
      /* if (result) {
        dispatch(setCredentials(result.data));
        navigate("/venues");
      } */
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section
      className={` antialiased bg-gradient-to-b from-primary to-white h-full w-full`}
    >
      <div className="container px-6 mx-auto">
        <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
          <div className="flex flex-col w-full lg:mb-80">
            <Logo logoSize="60" textClassName="!text-6xl" />
          </div>
          <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                Log in
              </h2>
              <form action="" className="w-full">
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="username" className="text-gray-500 mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="Please insert your email"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-lg"
                    onChange={handleChange}
                  />
                </div>
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="password" className="text-gray-500 mb-2">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Please insert your password"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-lg"
                     onChange={handleChange}
                  />
                </div>
                <div id="button" className="flex flex-col w-full my-5 gap-6">
                  <PrimaryButton onClick={onClick}  className="w-full">
                    Log in
                  </PrimaryButton>

                  <a
                    href="/profile/register"
                    className="transition-all text-md w-full text-center text-primary-medium group-hover:text-white hover:underline underline-offset-1 hover:text-primary"
                  >
                    Don't have an account? Register here!
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
