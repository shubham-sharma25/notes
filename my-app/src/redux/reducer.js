import { initialState } from "./state";

function reducer(state = initialState, action) {
    switch (action.type) {
        case "DELETE_NOTE":
            let updatedNotes = state.notes.filter(note => note.id !== action.selectedId);
            return {
                ...state,
                notes: updatedNotes,
            };
        //{title: "",body: "",notes:[...this.state.notes,newNote]}
        case "SAVE_NOTE":
            return {
                ...state,
                notes: [...state.notes,action.newNote],
            };
        default:
            return state;
    }
}

export default reducer;