import AtlasProjectHeader from "@/features/projects/components/AtlasProjectHeader";

export default async function AtlasProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-col" id="atlas-projects-layout">
      <AtlasProjectHeader projectSelectorItems={projectSelectors} />
      {children}
    </div>
  );
}
