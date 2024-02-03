import LogoIcon from "../components/icons/LogoIcon";

function LoginPage() {
  return (
    <div className="antialiased bg-gradient-to-b from-primary to-white h-full w-full">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
          <div className="flex flex-col w-full">
            <div className="hidden lg:block">
              <LogoIcon size={"200"} />
            </div>

            <h1 className="text-6xl lg:text-9xl font-logo text-white font-bold flex gap-5 items-center">
              <div className="lg:hidden">
                <LogoIcon size={"80"} />
              </div>
              Holidaze
            </h1>
            <p className="font-bold mx-auto md:mx-0 hidden lg:block lg:text-3xl text-white">
              Book your venue today!
            </p>
            <p className="font-bold lg:text-3xl hidden lg:block mx-auto md:mx-0 text-white">
              You deserve a break!
            </p>
          </div>
          <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
            <div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
              <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
                Log in
              </h2>
              <form action="" className="w-full">
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="username" className="text-gray-500 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="Please insert your username"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-lg"
                  />
                </div>
                <div id="input" className="flex flex-col w-full my-5">
                  <label htmlFor="password" className="text-gray-500 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Please insert your password"
                    className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-lg"
                  />
                </div>
                <div id="button" className="flex flex-col w-full my-5 gap-6">
                  <button
                    type="button"
                    className="w-full py-4 bg-primary hover:bg-white border border-primary transition-all rounded-lg text-white hover:text-primary font-bold"
                  >
                    Log in
                  </button>

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
    </div>
  );
}

export default LoginPage;
