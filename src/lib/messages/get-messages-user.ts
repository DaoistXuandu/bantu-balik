import { supabase } from '../supabase/default';

export async function getMessagesByUser(merchant: string, user: string) {
    const { data, error } = await supabase
        .from('messages')
        .select("*")
        .or(`merchant.eq.${merchant},user.eq.${user}`); // OR condition

    if (error) {
        console.error('Error storing messages:', error.message, error.details)
        throw error
    }

    const unreads: Record<string, number> = {};

    data?.forEach(item => {
        if (!item.read && item.username !== user) {
            if (!unreads[item.room]) unreads[item.room] = 0;
            unreads[item.room] += 1;
        }
    });

    return unreads
}

