export async function updateDateRefund(id: string) {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/update-refund-time`, {
        method: "PATCH",
        body: JSON.stringify({
            id: id,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(data => data.json())
        .then(response => response)
}
