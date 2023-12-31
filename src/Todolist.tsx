import React, {useCallback} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditebleSpan} from "./EditebleSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";


type TodolistType = {
    id: string
    title: string
    tasks: TaskType[]
    changeFilter: (todolistID: string, value: FilterValueType) => void
    addTask: (todolistID: string, newTitle: string) => void
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, id: string, newValue: string) => void
    removeTask: (todolistID: string, id: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void

}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const Todolist = React.memo((props: TodolistType) => {

    const addTask = useCallback((newTitle: string) => {
        props.addTask(props.id, newTitle)
    }, [props.addTask, props.id]);


    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'), [props.changeFilter, props.id]);

    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'), [props.changeFilter, props.id]);

    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id]);

    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.id)
    }, []);

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [])

    let taskForTodolist = props.tasks

    if (props.filter === 'active') {
        taskForTodolist = props.tasks.filter(el => el.isDone === false)
    }

    if (props.filter === 'completed') {
        taskForTodolist = props.tasks.filter(el => el.isDone === true)
    }


    return (
        <div className={'todolist'}>
            <h3 className={"todolistTitle"}>
                <EditebleSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton size="small" onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div className={'items'}>
                <div>
                    {taskForTodolist.map(el =>
                        <Task
                            key={el.id}
                            task={el}
                            changeStatus={props.changeStatus}
                            changeTaskTitle={props.changeTaskTitle}
                            removeTask={props.removeTask}
                            todolistId={props.id}
                        />
                    )}
                </div>
            </div>
            <div className={'btns'}>
                <Button variant={props.filter === 'all' ? 'contained' : "text"} onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={props.filter === 'active' ? 'contained' : "text"}
                        onClick={onActiveClickHandler}>Active</Button>
                <Button color={"secondary"} variant={props.filter === 'completed' ? 'contained' : "text"}
                        onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
})

