import { Link } from "react-router-dom";
import H2 from "../common/H2.component";

const aboutLinks: { text: string; link: string }[] = [
  {
    text: "Project brief",
    link: "https://content.noroff.dev/project-exam-2/brief.html",
  },
  {
    text: "Repository",
    link: "https://github.com/MagnusPladsen/Project-Exam-2",
  },
  {
    text: "Styleguide & wireframe",
    link: "https://www.figma.com/file/kjzm533uZkgdihBmSDBm8N/Holidaze?type=design&node-id=0%3A1&mode=design&t=q7dvviVlWkyZBfY1-1",
  },
  {
    text: "API docs",
    link: "https://docs.noroff.dev/docs/v1",
  },
  {
    text: "LinkedIn",
    link: "https://www.linkedin.com/in/magnus-pladsen-1a2738226/",
  },
  {
    text: "GitHub",
    link: "https://github.com/MagnusPladsen",
  },
];

function AboutLinks() {
  return (
    <div className="flex flex-col gap-2 w-full lg:w-[40%]">
      <H2 className="">Links</H2>
      {aboutLinks.map((link) => (
        <div key={link.text} className="flex justify-between">
          <p>{link.text}</p>
          <p className="text-primary text-xs hover:underline underline-offset-2">
            <Link to={link.link}>Read more</Link>
          </p>
        </div>
      ))}
    </div>
  );
}

export default AboutLinks;
