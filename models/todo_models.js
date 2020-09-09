const mongoose = require("mongoose");

const todo_schema = mongoose.Schema({
    id_user: {
        type: String,
        require: true,
    },
    activity: {
        type: String,
        require: true,
    },
    created_at: {
        type: Date,
        require: true,
    },
    due_date: {
        type: Date,
        require: true,
    },
    is_complete: {
        type: Boolean,
        require: true,
        default: false,
    },
});

module.exports = mongoose.model("todo", todo_schema);
