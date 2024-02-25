import AboutLinks from "../components/about/AboutLinks.component";
import TechStack from "../components/about/AboutTechStack.component";
import H1 from "../components/common/H1.component";

function AboutPage() {
  return (
    <section className="min-h-[100vh] pt-[80px] lg:pt-[120px] mx-auto pb-16 lg:px-6">
      <div className="mx-auto lg:max-w-screen-sm text-center mb-8 flex flex-col w-[90vw] lg:min-w-[900px] lg:w-[900px]">
        <div className="flex flex-col mb-10 lg:mb-20">
          <H1>About Holidaze</H1>
          <p>
            Introducing <span className="text-primary">Holidaze</span>: A
            fictional project crafted as the crowning achievement of my Noroff
            Front-End Development course, powered by the Noroff API.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-between text-left gap-10">
          <TechStack />
          <AboutLinks />
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
