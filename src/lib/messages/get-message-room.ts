import { supabase } from '../supabase/default';

export async function getMessagesByRoom(room: string) {
    const { data, error } = await supabase
        .from('messages')
        .select("*")
        .eq('room', room)

    if (error) {
        console.error('Error storing messages:', error.message, error.details)
        throw error
    }
    return data
}

