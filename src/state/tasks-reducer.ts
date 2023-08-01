import {TasksStateType} from "../App";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}


type ActionType =
    RemoveTaskActionType



export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)}
       /* case 'ADD-TASK':*/

        default:
            throw new Error("I don't understand this type")
    }
}


export const removeTodolistAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId: todolistId,taskId: taskId }
}






