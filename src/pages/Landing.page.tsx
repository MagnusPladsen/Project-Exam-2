import { Link } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton.component";
import Logo from "../components/logo/Logo.component";

function LandingPage() {
  return (
    <section className="w-full h-[100vh] ">
      <div
        className="h-[100vh] bg-center bg-cover"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/2707756/pexels-photo-2707756.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)",
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
          <div className="text-center">
            <div className="container px-4 mx-auto">
              <div className="max-w-4xl mx-auto text-center">
                <span className="text-gray-200 font-semibold uppercase tracking-widest opacity-60">
                  <Logo logoSize="40" textClassName="!text-3xl" />
                </span>
                <h1 className="mt-8 mb-6 text-4xl lg:text-5xl font-extrabold tracking-tight leading-none text-white">
                  Find the perfect venue for your holiday
                </h1>
                <p className="max-w-3xl mx-auto mb-12 text-lg text-gray-300">
                  Unlock Unforgettable Experiences: Your Venue, Your Way. Rent
                  or Host, Where Every Occasion Finds Its Perfect Space.
                </p>
                <Link to="/venues">
                  <PrimaryButton className="mb-2 py-5 px-8 text-sm font-bold uppercase ">
                    See venues
                  </PrimaryButton>
                </Link>
                <Link to="/login">
                  <p className="mb-4 text-sm font-bold max-w-3xl w-fit mx-auto text-gray-300 hover:text-white hover:underline transition-all">
                    Log in
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
