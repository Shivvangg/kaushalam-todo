import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, getAllTask } from "../redux/actions/taskActions";

const CreateTask = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    taskStatus: "To do", // Default value for task status
  });

  const [error, setError] = useState(null);
  const loading = useSelector((state) => state.tasks.loading); // Assuming you handle loading in Redux

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, description, taskStatus } = formData;

    if (!title || !description || !taskStatus) {
      setError("All fields are required");
      return;
    }

    setError(null); // Reset error on valid submission

    // Dispatch the addTask action
    dispatch(addTask({ title, description, taskStatus }))
      .then(() => {
        // After the task is added, dispatch getAllTask to reload the task list
        dispatch(getAllTask());

        // Optionally reset the form after submission
        setFormData({
          title: "",
          description: "",
          taskStatus: "To do",
        });
      })
      .catch((err) => {
        setError("Failed to create the task.");
        console.error(err); // Log the error for debugging
      });
  };

  return (
    <div
      className={`p-4 bg-white rounded-lg shadow-md  border ${
        error
          ? "border-red-500 shadow-red-200"
          : "border-purple-400 shadow-purple-200"
      }`}
    >
      <h2 className="text-lg text-center font-semibold mb-4">Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block font-bold text-sm text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-purple-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-bold text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 p-2 w-full border rounded-md focus:outline-purple-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="taskStatus"
            className="block text-sm font-bold text-gray-700"
          >
            Status
          </label>
          <select
            id="taskStatus"
            name="taskStatus"
            value={formData.taskStatus}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-purple-500"
          >
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
          {error && (
            <span className="px-4 py-2 text-base md:text-lg text-red-500">
              {error}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
