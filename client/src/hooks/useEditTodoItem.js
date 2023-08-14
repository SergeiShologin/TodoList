export const useEditTodoItem = (url, method, id, newTitle) => {
    const editedTodoItem = async () => {
        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    newTitle
                }),
            });

            if (res.status !== 200) {
                const json = await res.json();
                alert(json.message);
            }
        } catch (e) {
            console.log(e);
        }
    }
    return editedTodoItem
}