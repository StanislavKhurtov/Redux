import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditebleSpan} from "./EditebleSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

type TaskProps = {
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, id: string, newValue: string) => void
    removeTask: (todolistID: string, id: string) => void
    todolistId: string
    task: TaskType
}
export const Task = React.memo((props: TaskProps) => {

    const removeTask = () => props.removeTask(props.todolistId, props.task.id);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.todolistId, props.task.id, e.currentTarget.checked)
    }

    const onChangeTitleHandler = (newValue: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newValue)
    }

    return (
        <div key={props.task.id} className={props.task.isDone ? "isDone" : ''}>
            <Checkbox checked={props.task.isDone}
                      onChange={onChangeHandler}/>
            <EditebleSpan title={props.task.title} onChange={onChangeTitleHandler}/>
            <IconButton size="small" onClick={removeTask}>
                <Delete/>
            </IconButton>
        </div>
    );
})