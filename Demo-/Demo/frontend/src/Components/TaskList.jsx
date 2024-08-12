import React, { useState } from "react";
import "../styles/TaskList.css";

const TaskList = () => {
  const [taskLists, setTaskLists] = useState([
    { id: "list-1", title: "To Do", tasks: [{ id: "task-1", title: "Task 1", comments: [], attachments: [] }] },
    { id: "list-2", title: "In Progress", tasks: [] },
    { id: "list-3", title: "Done", tasks: [] },
  ]);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [taskCardTitle, setTaskCardTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [currentComments, setCurrentComments] = useState([]);
  const [attachments, setAttachments] = useState([]); // 用于管理当前任务的附件

  const openTaskModal = (task, listId) => {
    setIsTaskModalOpen(true);
    setCurrentTask({ ...task, listId });
    setTaskCardTitle(task.title);
    setCurrentComments(task.comments);
    setAttachments(task.attachments || []); // 初始化附件
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setCurrentTask(null);
    setNewComment("");
    setCurrentComments([]);
    setAttachments([]); // 关闭时清空附件
  };

  const handleSaveTaskCard = () => {
    if (!currentTask) return;

    const { listId, id } = currentTask;
    const updatedLists = taskLists.map((list) =>
      list.id === listId
        ? {
            ...list,
            tasks: list.tasks.map((task) =>
              task.id === id ? { ...task, title: taskCardTitle, comments: currentComments, attachments } : task
            ),
          }
        : list
    );
    setTaskLists(updatedLists);
    closeTaskModal(); // 保存后关闭模态框
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !currentTask) return;

    const newCommentObj = { id: `comment-${Date.now()}`, text: newComment.trim() };
    const updatedComments = [...currentComments, newCommentObj];
    setCurrentComments(updatedComments);
    setNewComment("");
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = currentComments.filter(comment => comment.id !== commentId);
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
    const newTaskLists = [
      ...taskLists,
      { id: `list-${taskLists.length + 1}`, title: "New List", tasks: [] },
    ];
    setTaskLists(newTaskLists);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: `attachment-${Date.now()}-${file.name}`,
      name: file.name,
      url: URL.createObjectURL(file) // 生成文件的临时URL
    }));
    setAttachments([...attachments, ...newAttachments]);
  };

  const handleDeleteAttachment = (attachmentId) => {
    const updatedAttachments = attachments.filter(att => att.id !== attachmentId);
    setAttachments(updatedAttachments);
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
              onBlur={(e) => {
                const newTitle = e.target.innerText.trim();
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
                { id: `task-${Date.now()}`, title: "New Task", comments: [], attachments: [] },
              ];
              const newTaskLists = taskLists.map((l) =>
                l.id === list.id ? { ...l, tasks: newTasks } : l
              );
              setTaskLists(newTaskLists);
            }}
          >
            + Add a task
          </button>
        </div>
      ))}
      <div className="add-task-list-container">
        <button className="add-task-list-button" onClick={handleAddList}>
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
                  <div key={comment.id} className="comment">
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
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="file-input"
              />
              <div className="attachment-list">
                {attachments.map((att) => (
                  <div key={att.id} className="attachment">
                    <a href={att.url} target="_blank" rel="noopener noreferrer">
                      {att.name}
                    </a>
                    <button
                      className="delete-attachment-button"
                      onClick={() => handleDeleteAttachment(att.id)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button className="save-task-button" onClick={handleSaveTaskCard}>
              Save
            </button>
            <button className="close-modal-button" onClick={closeTaskModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
