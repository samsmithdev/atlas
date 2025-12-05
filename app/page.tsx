import Image from "next/image";
import AtlasToolbar from "./_components/Atlas-Toolbar";
import AtlasEditor from "./_components/AtlasEditor";

export default function Home() {

  return (
    <div className="container w-screen mx-auto">
      <AtlasToolbar />

      <AtlasEditor />
    </div>
  );
}
