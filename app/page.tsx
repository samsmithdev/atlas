import Image from "next/image";
import AtlasProjectEditor from "./_components/AtlasProjectEditor";

export default function Home() {

  return (
    <div className="container w-screen h-[95%] mx-auto border">
      <AtlasProjectEditor />
    </div>
  );
}
