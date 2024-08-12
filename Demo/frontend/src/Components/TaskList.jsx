import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../styles/TaskList.css";

const TaskList = () => {
  const [taskLists, setTaskLists] = useState([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskCardTitle, setTaskCardTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [currentComments, setCurrentComments] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:7001/api/user/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          setUserId(response.data.userId);
        } catch (error) {
          console.error('Failed to fetch user ID:', error);
        }
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchTaskLists = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:7001/api/task/user/${userId}`);
          setTaskLists(response.data.tasks);
        } catch (error) {
          console.error('Failed to fetch task lists:', error);
        }
      };

      fetchTaskLists();
    }
  }, [userId]);

  const openTaskModal = (task, listId) => {
    setIsTaskModalOpen(true);
    setCurrentTask({ ...task, listId });
    setTaskCardTitle(task.title);
    setCurrentComments(task.comments);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setCurrentTask(null);
    setNewComment("");
    setCurrentComments([]);
  };

  const handleSaveTaskCardTitle = async () => {
    if (!currentTask || !userId) return;

    const { listId, id } = currentTask;
    try {
      await axios.put(`http://127.0.0.1:7001/api/task/update/${id}`, { title: taskCardTitle, userId });
    } catch (error) {
      console.error('Failed to update task title:', error);
    }

    const updatedLists = taskLists.map((list) =>
      list.id === listId
        ? {
            ...list,
            tasks: list.tasks.map((task) =>
              task.id === id ? { ...task, title: taskCardTitle, comments: currentComments } : task
            ),
          }
        : list
    );
    setTaskLists(updatedLists);
    setCurrentTask({ ...currentTask, title: taskCardTitle });
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !currentTask) return;

    const newCommentObj = { text: newComment.trim(), taskId: currentTask.id, userId };
    try {
      const response = await axios.post('http://127.0.0.1:7001/api/comment/add', newCommentObj);
      newCommentObj.id = response.data.id;
      const updatedComments = [...currentComments, newCommentObj];
      setCurrentComments(updatedComments);
      setNewComment(""); 
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://127.0.0.1:7001/api/comment/delete/${commentId}`, {
        data: { userId }
      });
      const updatedComments = currentComments.filter(comment => comment.id !== commentId);
      setCurrentComments(updatedComments);
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const handleCommentKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddComment();
    }
  };

  const handleAddTask = async (listId) => {
    const newTaskObj = { title: "新添加任务", listId, userId };
    try {
      const response = await axios.post('http://127.0.0.1:7001/api/task/add', newTaskObj);
      newTaskObj.id = response.data.id;
      const updatedLists = taskLists.map((list) =>
        list.id === listId ? { ...list, tasks: [...list.tasks, newTaskObj] } : list
      );
      setTaskLists(updatedLists);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const handleDeleteTask = async (taskId, listId) => {
    try {
      await axios.delete(`http://127.0.0.1:7001/api/task/delete/${taskId}`, {
        data: { userId }
      });
      const updatedTasks = taskLists
        .find(list => list.id === listId)
        .tasks.filter(task => task.id !== taskId);
      const updatedLists = taskLists.map((list) =>
        list.id === listId ? { ...list, tasks: updatedTasks } : list
      );
      setTaskLists(updatedLists);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleAddList = async () => {
    const newListObj = { title: "New List", userId };
    try {
      const response = await axios.post('http://127.0.0.1:7001/api/list/add', newListObj);
      newListObj.id = response.data.id;
      setTaskLists([...taskLists, { ...newListObj, tasks: [] }]);
    } catch (error) {
      console.error('Failed to add list:', error);
    }
  };

  const handleUpdateListTitle = async (listId, title) => {
    try {
      await axios.put(`http://127.0.0.1:7001/api/list/update/${listId}`, { title, userId });
      const updatedLists = taskLists.map((list) =>
        list.id === listId ? { ...list, title } : list
      );
      setTaskLists(updatedLists);
    } catch (error) {
      console.error('Failed to update list title:', error);
    }
  };

  return (
    <div className="task-list-container">
      {taskLists.map((list) => (
        <div key={list.id} className="task-column">
          <div className="task-column-header">
            <h2
              contentEditable
              suppressContentEditableWarning
              className="task-column-title"
              onBlur={(e) => handleUpdateListTitle(list.id, e.target.innerText)}
            >
              {list.title}
            </h2>
          </div>
          {list.tasks.map((task) => (
            <div
              key={task.id}
              className="task-card"
              onClick={() => openTaskModal(task, list.id)}
            >
              {task.title}
              <button
                className="delete-task-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(task.id, list.id);
                }}
              >
                &times;
              </button>
            </div>
          ))}
          <button
            className="add-task-button"
            onClick={() => handleAddTask(list.id)}
          >
            + Add a task
          </button>
        </div>
      ))}
      <div className="add-task-list-container">
        <button
          className="add-task-list-button"
          onClick={handleAddList}
        >
          + Add a list
        </button>
      </div>

      {isTaskModalOpen && currentTask && (
        <div className="task-modal">
          <div className="task-modal-content">
            <input
              type="text"
              value={taskCardTitle}
              onChange={(e) => setTaskCardTitle(e.target.value)}
              className="task-modal-title"
            />
            <button onClick={handleSaveTaskCardTitle}>Save</button>
            <button onClick={closeTaskModal}>Close</button>

            <div className="task-modal-comments">
              {currentComments.map((comment) => (
                <div key={comment.id} className="task-modal-comment">
                  <span>{comment.text}</span>
                  <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                </div>
              ))}
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleCommentKeyDown}
                placeholder="Enter your comment..."
              />
              <button onClick={handleAddComment}>Add Comment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
