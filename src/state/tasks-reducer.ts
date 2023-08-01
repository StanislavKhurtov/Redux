import {TasksStateType} from "../App";
import {v1} from "uuid";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type addTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}


type ActionType =
    RemoveTaskActionType
    | addTaskActionType


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]}
        default:
            throw new Error("I don't understand this type")
    }
}


export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskId}
}

export const addTaskAC = (todolistId: string, title: string): addTaskActionType => {
    return {type: 'ADD-TASK', todolistId: todolistId, title:title}
}






