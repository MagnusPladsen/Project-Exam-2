import { Link } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";

function LandingPage() {
  return (
    <section>
      <div className="grid max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Find the perfect venue for your holiday
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-4 md:text-lg lg:text-xl dark:text-gray-400">
            Or post your venue and start earning money. We have a big community
            of people looking for the perfect place to stay.
          </p>
          <Link to="/venues">
            <PrimaryButton>See venues</PrimaryButton>
          </Link>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img src="/hero.jpg" alt="Hero image" className="rounded-lg" />
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
