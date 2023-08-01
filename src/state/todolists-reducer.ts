import {TodolistType} from "../App";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.id)

        default:
            throw new Error("I don't understand this type")
    }
}
