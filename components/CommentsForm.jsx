import React, { useState, useEffect, useRef } from "react";

import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef();
  const nameEl = useRef();
  const emailEl = useRef();
  const storeDataEl = useRef();

  useEffect(() => {
    nameEl.current.value = window.localStorage.getItem("name");
    emailEl.current.value = window.localStorage.getItem("email");
    commentEl.current.value = window.localStorage.getItem("comment");
  }, []);

  const handleCommentSubmit = () => {
    setError(false);

    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current;

    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = { name, email, slug, comment };

    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
      window.localStorage.setItem("comment", comment);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
      window.localStorage.removeItem("comment", comment);
    }

    nameEl.current.value = ""
    emailEl.current.value = ""
    commentEl.current.value = ""
    storeDataEl.current.checked = false

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h1 className="text-xl mb-8 font-semibold border-b pb-4">
        Leave a Comment
      </h1>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-800"
          name="comment"
          cols="30"
          rows="5"
          placeholder="Comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          ref={nameEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-800"
          placeholder="Name"
          name="name"
        />
        <input
          type="text"
          ref={emailEl}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-800"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label
            className="text-gray-500 cursor-pointer ml-2"
            htmlFor="storeData"
          >
            Save the informations for the next time.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-xs text-red-500">All fields are required.</p>
      )}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={handleCommentSubmit}
          className="transition duration-300 ease-in hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-4 py-2"
        >
          Submit
        </button>
        {showSuccessMessage && (
          <span className="text-md text-green-500 font-semibold ">
            Comment submitted for review.
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
