const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// DB Schema
const User = require("../models/user_models");
const Todo = require("../models/todo_models");

router.get("/todo/", async (req, res) => {
    const params = req.query;
    if (params.id_todo && params.id_user) {
        return res.json({ message: "To much Parameter", status: "error" });
    } else if (params.id_todo) {
        if (!mongoose.Types.ObjectId.isValid(params.id_todo)) {
            return res.json({ message: "id_todo invalid", status: "error" });
        }
        const cek_todo = await Todo.findOne({ _id: params.id_todo });
        if (cek_todo === null) {
            return res.json({ message: "Todo Not Found", status: "error" });
        } else {
            data_todo = {
                id: cek_todo._id,
                id_user: cek_todo.id_user,
                activity: cek_todo.activity,
                created_at: new Date(cek_todo.created_at).toString(),
                due_date: new Date(cek_todo.due_date).toString(),
                is_complete: cek_todo.is_complete,
            };
            return res.json({ data: data_todo, status: "success" });
        }
    } else if (params.id_user) {
        if (!mongoose.Types.ObjectId.isValid(params.id_user)) {
            return res.json({ message: "id_user invalid", status: "error" });
        }
        const cek_user = await User.findOne({ _id: params.id_user });
        if (cek_user === null) {
            return res.json({ message: "User Not Found", status: "error" });
        } else {
            try {
                let data_todo = [];
                const query_todo = await Todo.find({ id_user: params.id_user });
                query_todo.forEach((item) => {
                    let data = {
                        id: item._id,
                        id_user: item.id_user,
                        activity: item.activity,
                        created_at: new Date(item.created_at).toString(),
                        due_date: new Date(item.due_date).toString(),
                        is_complete: item.is_complete,
                    };
                    data_todo.push(data);
                });

                return res.json({ data: data_todo });
            } catch (error) {
                return res.json(error);
            }
        }
    } else {
        try {
            let data_todo = [];
            const query_todo = await Todo.find();
            query_todo.forEach((item) => {
                let data = {
                    id: item._id,
                    id_user: item.id_user,
                    activity: item.activity,
                    created_at: new Date(item.created_at).toString(),
                    due_date: new Date(item.due_date).toString(),
                    is_complete: item.is_complete,
                };
                data_todo.push(data);
            });

            return res.json({ data: data_todo });
        } catch (error) {
            return res.json(error);
        }
    }
});

router.post("/todo", async (req, res) => {
    const data = req.body;
    if (!data.id_user || !data.activity || !data.due_date) {
        return res.json({
            message: "Please Fill id_user and activity",
            status: "error",
        });
    } else {
        if (!mongoose.Types.ObjectId.isValid(data.id_user)) {
            return res.json({ message: "id_user invalid", status: "error" });
        }
        // cek user
        const cek_user = await User.findOne({ _id: data.id_user });
        if (cek_user === null) {
            return res.json({ message: "user not found", status: "error" });
        }
        const now = new Date();
        let due_date = new Date(data.due_date * 1000);
        const newTodo = new Todo({
            id_user: data.id_user,
            activity: data.activity,
            created_at: now,
            due_date: due_date,
        });
        try {
            const saveTodo = await newTodo.save();
            return res.json(saveTodo);
        } catch (error) {
            return res.json(error);
        }
    }
});

router.put("/todo/", async (req, res) => {
    const data = req.body;
    if (!data.id_todo || !data.activity || !data.due_date) {
        return res.json({
            message: "please fill id_todo, activity, and due_date",
        });
    }
    if (!mongoose.Types.ObjectId.isValid(data.id_todo)) {
        return res.json({ message: "id_todo invalid", status: "error" });
    }
    const cek_todo = await Todo.findOne({ _id: data.id_todo });
    if (cek_todo === null) {
        return res.json({ message: "Todo Not Found", status: "error" });
    } else {
        let due_date = new Date(data.due_date * 1000);
        try {
            const update_todo = await Todo.updateOne(
                { _id: data.id_todo },
                { $set: { activity: data.activity, due_date: due_date } }
            );
            return res.json(update_todo);
        } catch (error) {
            return res.json(error);
        }
    }
});

router.delete("/todo/", async (req, res) => {
    const params = req.query;
    if (!params.id_todo) {
        return res.json({ message: "Please fill id_todo", status: "error" });
    }
    if (!mongoose.Types.ObjectId.isValid(params.id_todo)) {
        return res.json({ message: "id_todo invalid", status: "error" });
    }
    const cek_todo = await Todo.findOne({ _id: params.id_todo });
    if (cek_todo === null) {
        return res.json({ message: "Todo Not Found", status: "error" });
    } else {
        try {
            const delete_todo = await Todo.remove({ _id: params.id_todo });
            return res.json(delete_todo);
        } catch (error) {
            return res.json(error);
        }
    }
});

module.exports = router;
