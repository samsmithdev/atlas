import { ThinkingIndicator } from "@/components/atlas/AtlasInteractionModule";
import { AtlasLinkButton } from "@/components/atlas/buttons/AtlasLinkButton";
import Link from "next/link";

export default function Home() {

  return (
    <div className="bg-background w-full h-full items-center flex flex-col gap-8">
      <h1 className="text-5xl text-foreground border-b-4 border-primary p-8">Welcome to the A.T.L.A.S. Development Center!</h1>
      <p className='text-s text-muted'>Assistant Technology Leveraging Accessibility Systems</p>
      
      <p className='text-l text-foreground w-1/2 text-center'>A.T.L.A.S. is a personal knowledge system designed to handle as much of maintenance associated with managing notes as possible. Executive dysfunction can make taking comprehensive and organized notes hugely impactful, exactly as it makes maintaining them much more difficult. A.T.L.A.S.' goal is to streamline the intake and organizing processes to support neurodivergent users by removing key friction points that lead to abandoning systems.</p>
      
      <ThinkingIndicator />

      <AtlasLinkButton className='text-2xl p-6 m-4' href={"/projects"} displayText='Projects' variant='atlas_link'/>

      <p className="text-xs text-secondary">Unauthorized use is not authorized.</p>
    </div>
  );
}
