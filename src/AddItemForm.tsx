import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    console.log('1')
    let [newTitle, setNewTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (newTitle.trim() !== "") {
            props.addItem(newTitle.trim())
            setNewTitle("")
        } else {
            setError("Title is requared");
        }
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) {
            setError(null)
        }
        if (newTitle.trim() !== "") {
            if (e.key === "Enter") {
                props.addItem(newTitle.trim())
                setNewTitle("")
            }
        }
    };

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value);

    return (
        <div>
            <TextField
                variant="outlined"
                label={"Type value"}
                value={newTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTask} color={'primary'}>
                <AddBox />
            </IconButton>
        </div>
    );
})