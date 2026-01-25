import AtlasActionModal from "@/components/atlas/AtlasActionModalBeta";

export default function AtlasProjectsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>
) {
    return (
        <div className="w-full h-full">
            {children}
            <AtlasActionModal />
        </div>
    )
}