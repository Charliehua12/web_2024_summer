import React, { useState } from "react";
import "../styles/TaskList.css";

const TaskList = () => {
 const generateRandomGradient = () => {
    const randomColor = () => {
      const r = Math.floor(Math.random() * 254); // 限制红色通道的值，避免生成过于亮的颜色
      const g = Math.floor(Math.random() * 254); // 限制绿色通道的值，避免生成过于亮的颜色
      const b = Math.floor(Math.random() * 254); // 限制蓝色通道的值，避免生成过于亮的颜色
      return `rgb(${r},${g},${b})`;
    };

    const color1 = randomColor();
    const color2 = randomColor();
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  };
  const [taskLists, setTaskLists] = useState([
    {
      id: "list-1",
      title: "Welcome to coteam！！！",
      tasks: [{ id: "task-1", title: "Task 1", comments: [], attachments: [] }],
      gradient: generateRandomGradient(),
    },
  ]);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskCardTitle, setTaskCardTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [currentComments, setCurrentComments] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);

  const openTaskModal = (task, listId) => {
    setIsTaskModalOpen(true);
    setCurrentTask({ ...task, listId });
    setTaskCardTitle(task.title);
    setCurrentComments(task.comments);
    setAttachments(task.attachments || []);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setCurrentTask(null);
    setNewComment("");
    setCurrentComments([]);
    setAttachments([]);
  };

  const handleSaveTaskCard = () => {
    if (!currentTask) return;

    const { listId, id } = currentTask;
    const updatedLists = taskLists.map((list) =>
      list.id === listId
        ? {
            ...list,
            tasks: list.tasks.map((task) =>
              task.id === id
                ? {
                    ...task,
                    title: taskCardTitle,
                    comments: currentComments,
                    attachments,
                  }
                : task
            ),
          }
        : list
    );
    setTaskLists(updatedLists);
    closeTaskModal();
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !currentTask) return;

    const newCommentObj = {
      id: `comment-${Date.now()}`,
      text: newComment.trim(),
    };
    const updatedComments = [...currentComments, newCommentObj];
    setCurrentComments(updatedComments);
    setNewComment("");
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = currentComments.filter(
      (comment) => comment.id !== commentId
    );
    setCurrentComments(updatedComments);
  };

  const handleCommentKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddComment();
    }
  };

  const handleDeleteList = (listId) => {
    const updatedLists = taskLists.filter((list) => list.id !== listId);
    setTaskLists(updatedLists);
  };

  const handleAddList = () => {
    const newTitle = `List ${taskLists.length + 1}`;
    if (taskLists.some((list) => list.title === newTitle)) {
      alert("List with the same name already exists.");
      return;
    }

    const newTaskLists = [
      ...taskLists,
      {
        id: `list-${taskLists.length + 1}`,
        title: newTitle,
        tasks: [],
        gradient: generateRandomGradient(),
      },
    ];
    setTaskLists(newTaskLists);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map((file) => ({
      id: `attachment-${Date.now()}-${file.name}`,
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const handleDeleteAttachment = (attachmentId) => {
    const updatedAttachments = attachments.filter(
      (att) => att.id !== attachmentId
    );
    setAttachments(updatedAttachments);
  };

  const handleDragStart = (e, task, listId) => {
    setDraggedTask({ ...task, listId });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropListId) => {
    if (!draggedTask) return;

    const { listId, id } = draggedTask;
    const sourceList = taskLists.find((list) => list.id === listId);
    const destinationList = taskLists.find((list) => list.id === dropListId);

    if (sourceList && destinationList) {
      const draggedTaskData = sourceList.tasks.find((task) => task.id === id);
      const updatedSourceTasks = sourceList.tasks.filter(
        (task) => task.id !== id
      );
      const updatedDestinationTasks = [
        ...destinationList.tasks,
        draggedTaskData,
      ];

      const updatedLists = taskLists.map((list) => {
        if (list.id === listId) {
          return { ...list, tasks: updatedSourceTasks };
        } else if (list.id === dropListId) {
          return { ...list, tasks: updatedDestinationTasks };
        }
        return list;
      });

      setTaskLists(updatedLists);
      setDraggedTask(null);
    }
  };

  return (
    <div className="task-list-container">
      {taskLists.map((list) => (
        <div
          key={list.id}
          className="task-column"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, list.id)}
          style={{ background: list.gradient }}
        >
          <div className="task-column-header">
            <h2
              contentEditable
              suppressContentEditableWarning
              className="task-column-title"
              onBlur={(e) => {
                const newTitle = e.target.innerText.trim();
                if (
                  newTitle !== list.title &&
                  taskLists.some((l) => l.title === newTitle)
                ) {
                  alert("List with the same name already exists.");
                  e.target.innerText = list.title;
                  return;
                }

                const newTaskLists = taskLists.map((l) =>
                  l.id === list.id ? { ...l, title: newTitle } : l
                );
                setTaskLists(newTaskLists);
              }}
            >
              {list.title}
            </h2>
            <button
              className="delete-list-button"
              onClick={() => handleDeleteList(list.id)}
            >
              &times;
            </button>
          </div>
          {list.tasks.map((task) => (
            <div
              key={task.id}
              className="task-card"
              draggable
              onDragStart={(e) => handleDragStart(e, task, list.id)}
              onClick={() => openTaskModal(task, list.id)}
            >
              {task.title}
              <button
                className="delete-task-button"
                onClick={(e) => {
                  e.stopPropagation();
                  const newTasks = list.tasks.filter((t) => t.id !== task.id);
                  const newTaskLists = taskLists.map((l) =>
                    l.id === list.id ? { ...l, tasks: newTasks } : l
                  );
                  setTaskLists(newTaskLists);
                }}
              >
                &times;
              </button>
            </div>
          ))}
          <button
            className="add-task-button"
            onClick={() => {
              const newTasks = [
                ...list.tasks,
                {
                  id: `task-${Date.now()}`,
                  title: "New Task",
                  comments: [],
                  attachments: [],
                },
              ];
              const newTaskLists = taskLists.map((l) =>
                l.id === list.id ? { ...l, tasks: newTasks } : l
              );
              setTaskLists(newTaskLists);
            }}
          >
            + Add Task
          </button>
        </div>
      ))}
      <div className="add-task-list-container">
        <button className="add-task-list-button" onClick={handleAddList}>
          + Add List
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
            <div className="task-modal-comments">
              <h3>Comments</h3>
              <div className="comment-input-container">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={handleCommentKeyDown}
                />
              </div>
              <div className="comment-list">
                {currentComments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <span>{comment.text}</span>
                    <button
                      className="delete-comment-button"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="task-modal-attachments">
              <h3>Attachments</h3>
              <input type="file" multiple onChange={handleFileUpload} />
              <ul>
                {attachments.map((att) => (
                  <li key={att.id}>
                    <a href={att.url} target="_blank" rel="noopener noreferrer">
                      {att.name}
                    </a>
                    <button
                      className="delete-attachment-button"
                      onClick={() => handleDeleteAttachment(att.id)}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="task-modal-footer">
              <button onClick={handleSaveTaskCard}>Save</button>
              <button onClick={closeTaskModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
