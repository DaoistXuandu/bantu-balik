'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export function useListenerDB() {
    const [prev, setPrev] = useState(false)
    const [refundId, setRefundId] = useState("")
    const [username, setUsername] = useState("")
    const [read, setRead] = useState(false)

    useEffect(() => {
        const channel = supabase
            .channel('custom-insert-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload) => {
                    setRefundId(payload.new.room)
                    setUsername(payload.new.username)
                    setRead(payload.new.read)
                    setPrev(prev => !prev)
                    // console.log(payload.new)
                    // console.log(prev)
                }
            )
            .subscribe((status) => {
                console.log('Subscription status:', status)
            })

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    return { refundId, username, read, prev }
}
