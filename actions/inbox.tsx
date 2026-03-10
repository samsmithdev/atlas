'use server';

import { InboxAction } from "@prisma/client";
import { checkAuth } from "./auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export type ActionState = {
    message: string;
    status: 'success' | 'error' | 'idle';
    errors?: {
        name?: string[];
        shortcode?: string[];
        description?: string[];
    }
}

type AtlasInboxItemForProcessingPanel = {
    itemHeader: string;
    itemContent: string;
    itemSummary: string;
    itemId: string;
}

export async function fetchInboxItemTransaction() {
    const { userId, session } = await checkAuth();

    try {
        const inboxItems = await prisma.inboxItem.findMany({
            where: { userId: userId, actionTaken: null },
            select: {
                id: true,
                createdAt: true,
                content: true,
                status: true,
                assets: true,
            }
        });

        return { status: "success", data: inboxItems }
    } catch (error) {
        return { status: "error" , message: "DB Error attempting to delete inbox item."}
    }
}

export async function deleteInboxItemTransaction(inboxItemId: string) {
    const { userId, session } = await checkAuth();

    try {
        await prisma.$transaction(async (tx) => {
            const updatedInboxItem = await tx.inboxItem.update({
                where: { id: inboxItemId, userId: userId },
                data: { 
                    actionTaken: InboxAction.DELETED
                }
            });
        });

                    revalidatePath('/projects/inbox');
            return { status: "success", message: "Inbox item successfully deleted."}
    } catch (error) {
        return { status: "error" , message: "DB Error attempting to delete inbox item."}
    }
}