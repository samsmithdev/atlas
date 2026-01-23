import AtlasToolbar from "./AtlasToolbar";
import AtlasEditor from "./AtlasEditor";

export default function AtlasProjectEditor() {
    return ( 
        <div className="w-full h-full flex flex-col mx-auto">
            <AtlasToolbar />
            <AtlasEditor />
        </div>
    );
}