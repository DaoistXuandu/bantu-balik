import { supabase } from '../supabase/default';

export async function updateMessageId(id: string) {
    const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', id)

    if (error) {
        console.error('Error storing messages:', error.message, error.details)
        throw error
    }
}

