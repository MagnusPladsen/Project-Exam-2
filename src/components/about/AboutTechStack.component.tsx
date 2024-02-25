import { Link } from "react-router-dom";
import { TechStackItem } from "../../types/types";
import H2 from "../common/H2.component";
import ReactLogo from "../icons/logos/ReactLogo.component";
import ReduxLogo from "../icons/logos/ReduxLogo.component";
import TypescriptLogo from "../icons/logos/TypescriptLogo.componen";
import ViteLogo from "../icons/logos/ViteLogo.component";
import ReactHookFormLogo from "../icons/logos/ReactHookFormLogo.component";
import ReactRouterLogo from "../icons/logos/ReactRouter.logo.component";
import TailwindCSSLogo from "../icons/logos/TailwindCSSLogo.component";

function renderTechItem(item: TechStackItem) {
  return (
    <div className="flex gap-5 items-center" key={item.text}>
      <div className="flex justify-between w-full">
        <div className="flex gap-5 justify-between">
          <div className="w-6">{item.logo}</div>
          <p className="">{item.text} </p>
        </div>
        <p className="text-primary text-xs hover:underline underline-offset-2">
          <Link to={item.link}>Read more</Link>
        </p>
      </div>
    </div>
  );
}

const techStack: TechStackItem[] = [
  {
    logo: <TypescriptLogo />,
    text: "Typescript",
    link: "https://www.typescriptlang.org/",
  },
  {
    logo: <ReactLogo />,
    text: "React",
    link: "https://react.dev/",
  },
  {
    logo: <ViteLogo />,
    text: "Vite",
    link: "https://vitejs.dev/",
  },
  {
    logo: <TailwindCSSLogo />,
    text: "Tailwind CSS",
    link: "https://tailwindcss.com/",
  },
  {
    logo: <ReactHookFormLogo />,
    text: "React Hook Form",
    link: "https://react-hook-form.com/",
  },
  {
    logo: <ReactRouterLogo />,
    text: "React Router",
    link: "https://reactrouter.com/en/main",
  },
  {
    logo: <ReduxLogo />,
    text: "Redux Toolkit",
    link: "https://redux-toolkit.js.org/",
  },
];

function TechStack() {
  return (
    <div className="flex flex-col gap-2 w-full lg:w-[40%]">
      <H2 className="mb-3">Technology</H2>
      {techStack.map((item) => renderTechItem(item))}
      <p className="text-xs mt-3">
        Other libraries that were also used include:
      </p>
      <p className="text-xs">
        Yup, Framer Motion, ESLint, React Responsive Carousel, React Loading
        Skeleton, React Modern Calendar Datepicker, and React Star Ratings.
      </p>
    </div>
  );
}

export default TechStack;
