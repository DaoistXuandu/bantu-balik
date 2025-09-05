import { apps_name, secret_word } from '@/config/data'
import { ChatMessage } from '@/hooks/use-realtime-chat'
import { supabase } from '../supabase/default';

export async function getMessages(room: string) {
    const { data, error } = await supabase()
        .from('messages')
        .select("*")
        .eq('room', room)

    if (error) {
        console.error('Error storing messages:', error.message, error.details)
        throw error
    }
    return data
}

