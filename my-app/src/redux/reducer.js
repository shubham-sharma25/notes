import { initialState } from "./state";

function reducer(state = initialState, action) {
    switch (action.type) {
        case "DELETE_NOTE":
            let updatedNotes = state.notes.filter(note => note.id !== action.selectedId);
            return {
                ...state,
                notes: updatedNotes,
            };
        case "SAVE_NOTE":
            return {
                ...state,
                notes: [...state.notes, action.newNote],
            };
        case "UPDATE_NOTE":
            let updatedNote =state.notes.map(note=>{
                if(note.id === action.selectedId){
                    let newNote = note;
                    newNote.editable = true;
                    return newNote;
                }
                return note;
            })
            return {
                ...state,
                notes: updatedNote,
            };
        case "SAVE_UPDATE_NOTE":
            let saveUpdatedNote =state.notes.map(note=>{
                if(note.id === action.newNote.id){
                    let newNote = note;
                    newNote.editable = false;
                    newNote.title = action.newNote.title;
                    newNote.body = action.newNote.body;
                    return newNote;
                }
                return note;
            })
            return {
                ...state,
                notes: saveUpdatedNote,
            };
        default:
            return state;
    }
}

export default reducer;