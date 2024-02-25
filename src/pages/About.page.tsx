import AboutLinks from "../components/about/AboutLinks.component";
import TechStack from "../components/about/AboutTechStack.component";
import H1 from "../components/common/H1.component";
import H2 from "../components/common/H2.component";

function AboutPage() {
  return (
    <section className="min-h-[100vh] pt-[80px] lg:pt-[120px] mx-auto pb-16 lg:px-6">
      <div className="mx-auto lg:max-w-screen-sm text-center mb-8 flex flex-col w-[90vw] lg:min-w-[900px] lg:w-[900px]">
        <div className="flex flex-col mb-10 lg:mb-20 max-w-[600px] mx-auto">
          <H1 className="!mb-10">About</H1>
          <H2 className="!text-lg mb-3">
            Introducing <span className="text-primary">Holidaze</span>
          </H2>
          <p>
            A fictional web application designed as the culminating project for my final exam in the Noroff Front-End Development course, driven by the Noroff v1 API.
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
