import AtlasEmptySelectProjectPane from "@/components/atlas/panes/empty-states/AtlasEmptySelectProjectPane";


export default async function DevelopmentHomepage() {
    return (
        <div className="flex items-center bg-black">
            <AtlasEmptySelectProjectPane />
        </div>
    )
}