import {TasksStateType} from "../App";
import {v1} from "uuid";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'

}


type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.title
                } : el)
            }

        default:
            throw new Error("I don't understand this type")
    }
}


export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId: todolistId, taskId: taskId}
}

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId: todolistId, title: title}
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId: todolistId, taskId: taskId, title: title}
}








