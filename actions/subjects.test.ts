import { describe, it, expect, vi, test } from 'vitest'
import { Subject } from '@/app/generated/prisma/client'

import { createSubject } from './subjects'

import prisma from '@/lib/db'

vi.mock('@/app/lib/db');

// Create Subject
describe('createSubject with All Parameters Action', () => {
    it('should save a new subject to the database and return it', async () => {
        const newSubject: Subject = {
            id: "Test Subject ID 0001",
            name: "Test Subject Name",
            shortcode: "TSN",
            description: "Test Subject Description"
        };

        vi.mocked(prisma.subject.create).mockResolvedValue(newSubject);

        const result = await createSubject({
            name: newSubject.name,
            id: newSubject.id,
            shortcode: newSubject.shortcode,
            description: newSubject.description
        });

        expect(result.id).toEqual(newSubject.id);

        expect(prisma.subject.create).toHaveBeenCalledWith({
            data: {
                name: newSubject.name,
                id: newSubject.id,
                shortcode: newSubject.shortcode,
                description: newSubject.description
            }
        })
    })
})