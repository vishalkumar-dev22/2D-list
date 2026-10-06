* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #eef3f8;
    min-height: 100vh;
    padding: 40px 20px;
}

.container {
    max-width: 600px;
    margin: auto;
    background: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    margin-bottom: 25px;
    color: #1d3557;
}

.input-box {
    display: flex;
    gap: 10px;
}

#taskInput {
    flex: 1;
    padding: 13px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
}

button {
    border: none;
    cursor: pointer;
    border-radius: 8px;
    padding: 10px 15px;
}

#addBtn {
    background: #1d4ed8;
    color: white;
}

.filters {
    display: flex;
    gap: 8px;
    margin: 20px 0;
}

.filter {
    background: #e5e7eb;
}

.filter.active {
    background: #1d4ed8;
    color: white;
}

#taskList {
    list-style: none;
}

.task {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px;
    margin-bottom: 10px;
    background: #f5f7fa;
    border-radius: 8px;
}

.task-text {
    flex: 1;
    font-size: 16px;
}

.task.completed .task-text {
    text-decoration: line-through;
    color: #888;
}

.edit-btn {
    background: #f59e0b;
    color: white;
}

.delete-btn {
    background: #dc2626;
    color: white;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}

#clearBtn {
    background: #374151;
    color: white;
}

.empty {
    text-align: center;
    color: #888;
    padding: 20px;
}

@media (max-width: 500px) {
    .input-box {
        flex-direction: column;
    }

    #addBtn {
        width: 100%;
    }

    .task {
        flex-wrap: wrap;
    }

    .footer {
        flex-direction: column;
        gap: 12px;
    }
}
