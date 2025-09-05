import { apps_name, secret_word } from '@/config/data'
import { ChatMessage } from '@/hooks/use-realtime-chat'
import { supabase } from '../supabase/default';

export async function storeMessages(messages: ChatMessage[], room: string, username: string) {
    const latestMessage = messages
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .at(-1);

    if (latestMessage?.user.name !== username || latestMessage.user.name == apps_name)
        return

    if (latestMessage) {
        const { error } = await supabase()
            .from('messages')
            .insert({
                content: latestMessage.content,
                username: latestMessage.user.name,
                created_at: latestMessage.createdAt,
                room: room,
            })

        if (error) {
            console.error('Error storing messages:', error.message, error.details)
            throw error
        }
    }
}
