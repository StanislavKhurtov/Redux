import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type FilterValueType = 'all' | 'completed' | 'active';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export const AppWithReducers = () => {

    const todolistIs_1 = v1();
    const todolistIs_2 = v1();

    let [todolists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
        {id: todolistIs_1, title: 'What to learn', filter: "all"},
        {id: todolistIs_2, title: 'What to buy', filter: "all"},
    ]);

    let [tasks, dispatchTaskReducer] = useReducer(tasksReducer, {
        [todolistIs_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JavaScript', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'Angular', isDone: false},

        ],
        [todolistIs_2]: [
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Milk', isDone: true},
        ],
    })


    const removeTask = (todolistID: string, id: string) => {
        dispatchTaskReducer(removeTaskAC(todolistID, id))
    };

    const addTask = (todolistID: string, title: string) => {
        dispatchTaskReducer(addTaskAC(todolistID, title))
    };

    const changeTaskTitle = (todolistId: string, id: string, newValue: string) => {
        dispatchTaskReducer(changeTaskTitleAC(todolistId, id, newValue))
    };

    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        dispatchTaskReducer(changeTaskStatusAC(todolistID, taskId, isDone))
    };

    const removeTodolist = (todolistId: string) => {
        dispatchTaskReducer(removeTodolistAC(todolistId))
        dispatchToTodolistReducer(removeTodolistAC(todolistId))
    };

    const addTodolist = (title: string) => {
        dispatchToTodolistReducer(addTodolistAC(title))
        dispatchTaskReducer(addTodolistAC(title))
    };

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatchToTodolistReducer(changeTodolistTitleAC(todolistId, newTitle))
    };

    const changeFilter = (todolistID: string, value: FilterValueType) => {
        dispatchToTodolistReducer(changeTodolistFilterAC(todolistID, value))

    };


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container gap={10}>
                    {todolists.map((el) => {

                        let taskForTodolist = tasks[el.id];

                        if (el.filter === 'completed') {
                            taskForTodolist = taskForTodolist.filter(el => el.isDone === true)
                        }

                        if (el.filter === 'active') {
                            taskForTodolist = taskForTodolist.filter(el => el.isDone === false)
                        }

                        return (
                            <div>
                                <Grid item>
                                    <Paper style={{padding: "20px"}}>
                                        <Todolist
                                            key={el.id}
                                            id={el.id}
                                            title={el.title}
                                            tasks={taskForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            filter={el.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            </div>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}