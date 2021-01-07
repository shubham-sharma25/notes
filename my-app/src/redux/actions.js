export function checkItem(e) {
    return {
        type: "CHECK_ITEM",
        clickedCity: e.value,
        checked: !e.checked
    }
}
export function deleteItem(e) {
    return {
        type: "DELETE_ITEM",
        clickedCity: e.value
    }
}

export function deleteNotesAction(e) {
    return {
        type: "DELETE_ITEM",
        clickedCity: e.value
    }
}