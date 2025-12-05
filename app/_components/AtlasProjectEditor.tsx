import AtlasToolbar from "./AtlasToolbar";
import AtlasEditor from "./AtlasEditor";

export default function AtlasProjectEditor() {
    return ( 
        <div className="w-full mx-auto">
            <AtlasToolbar />
            <AtlasEditor />
        </div>
    );
}