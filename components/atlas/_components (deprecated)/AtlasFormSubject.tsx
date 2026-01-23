'use client'

import Form  from 'next/form';
import { createSubjectTransaction } from '@/actions/subjects';

export default function AtlasFormSubject({ editingSubject }: { editingSubject?: string }) {

    return (
        <div 
        className=''
        id='atlas-form-subject'>
            <Form action={createSubjectTransaction}>
                <input name='name' inputMode='text'/>
                <input name='description' />
                <input name='shortcode' />
                <button type='submit'>Create Subject</button>
            </Form>
        </div>
    )
}