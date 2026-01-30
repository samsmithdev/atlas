'use client';

import { useRouter } from "next/navigation";
import { AtlasFormSelector } from "@/components/atlas/AtlasActionModal";
import { Button } from "@/components/ui/button";

export default function AtlasActionModalTestPage() {
    const router = useRouter();
    const buttonStyling = "bg-slate-500";

    const triggerModal = (action: string) => {
        router.push(`?action-modal=${action}`);
    }
    return (
        <div className="bg-slate-900 w-full h-full items-center flex flex-col gap-8 text-indigo-200">
            <h1 className="text-5xl border-b-4 border-indigo-500 p-8">Welcome to the ATLAS Development Center!</h1>
            <p className="text-xs">Unauthorized use is not authorized.</p>
            <Button
                variant="outline"
                onClick={() => triggerModal(AtlasFormSelector.SelectProject)}
                className='bg-black hover:bg-slate-500 hover:scale-120 text-2xl p-8 rounded-3xl cursor-auto hover:cursor-pointer'
            >
                Select Project
            </Button>
            <Button
                variant="outline"
                onClick={() => triggerModal(AtlasFormSelector.CreateSubject)}
                className="bg-black hover:bg-slate-500 hover:scale-120 text-2xl p-8 rounded-3xl cursor-auto hover:cursor-pointer"
            >
                Create Subject
            </Button>
            <Button
                variant="outline"
                onClick={() => triggerModal(AtlasFormSelector.CreateProject)}
                className="bg-black hover:bg-slate-500 hover:scale-120 text-2xl p-8 rounded-3xl cursor-auto hover:cursor-pointer"
            >
                Create Project
            </Button>
            <Button
                variant="outline"
                onClick={() => triggerModal(AtlasFormSelector.CreateFile)}
                className="bg-black hover:bg-slate-500 hover:scale-120 text-2xl p-8 rounded-3xl cursor-auto hover:cursor-pointer"
            >
                Create File
            </Button>
        </div>
    );
}
