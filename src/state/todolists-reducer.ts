import {TodolistType} from "../App";

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {

        default:
            throw new Error("I don't understand this type")
    }
}
