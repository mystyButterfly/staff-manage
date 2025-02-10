import { useState, useEffect } from "react";
import { NODE_SERVER_URL } from "../App";

const Modal = ({ isOpen, onClose, person }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [personData, setPersonData] = useState(person || {});
  const [formData, setFormData] = useState(person || {});
  const [showDelete, setShowDelete] = useState(false);
  const [submitDelete, setSubmitDelete] = useState(false);
  const [modifyError, setModifyError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [ageError, setAgeError] = useState(false);

  // Synchronize state with updated person prop
  useEffect(() => {
    setPersonData(person || {});
    setFormData(person || {});
  }, [person]);

  useEffect(() => {
    setIsEditing(false);
    setShowDelete(false);
    setSubmitDelete(false);
    setModifyError('');
    setDeleteError('');
    setAgeError(false);
  }, [isOpen, onClose]);

  // Effect to handle Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose(); // Call onCloseCreate when Escape is pressed
      }
    };

    // Only add event listener if the modal is open
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "age") {
      setAgeError(false); // Reset the ageError when the user modifies the input
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${NODE_SERVER_URL}/api/people/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // sending updated person data
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json(); // Parse the error response
        if (errorResponse.error && errorResponse.error.includes("Age must be 18 or older")) {
          setAgeError(true);
        }
        throw new Error(errorResponse.error || "Failed to update person");
      }

      const updatedPerson = await response.json();
      setPersonData(updatedPerson);
      
      setModifyError('');
      setFormData({});

      setIsEditing(false); // Hide form after submission
    } catch (error) {
      console.error("Error updating person:", error);
      setModifyError(error.message || "Error updating person");
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${NODE_SERVER_URL}/api/people/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // Parse the error response
        throw new Error(errorResponse.error || "Failed to delete person");
      }

      // Optional: Update state to remove the deleted person from UI
      // setPeople((prevPeople) => prevPeople.filter(person => person.id !== id));
      setDeleteError('');
      setIsEditing(false); // Hide form after deletion
      setShowDelete(false);
      onClose();
    } catch (error) {
      console.error("Failed to delete:", error);
      setDeleteError(error.message || "Error updating person"); // User feedback
    }
  };

  function handleSubmitDelete(e) {
    e.preventDefault();
    const word = e.target.value;
    word === "delete" ? setSubmitDelete(true) : setSubmitDelete(false);
  }

  const toggleEdit = () => {
    setModifyError('');
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFormData({ ...personData }); // Reset the form data to current values
    }
    if (isEditing) {
      setShowDelete(false), setSubmitDelete(false), setAgeError(false)
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <h2>User Details</h2>
          <p>
            <strong>ID:</strong> {personData.id}
          </p>
          <p>
            <strong>Name:</strong> {personData.name}
            <input
              className={`edit-input ${isEditing ? "" : "hide-input"}`}
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <strong>Age:</strong> {personData.age}
            <input
              className={`edit-input number-input ${isEditing ? "" : "hide-input"} ${ageError?'error-input':''}`}
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <strong>City:</strong> {personData.city}
            <input
              className={`edit-input ${isEditing ? "" : "hide-input"}`}
              type="text"
              name="city"
              value={formData.city || ""}
              onChange={handleInputChange}
            />
          </p>
          <p>
            <strong>Occupation:</strong> {personData.occupation}
            <input
              className={`edit-input ${isEditing ? "" : "hide-input"}`}
              type="text"
              name="occupation"
              value={formData.occupation || ""}
              onChange={handleInputChange}
            />
          </p>
          {modifyError && <p className="errorMessege">{modifyError}</p>}
          <div className="buttons-modify">
            <button onClick={toggleEdit} className={isEditing?"cancel-btn":""}>
              {isEditing ? "Cancel modifying" : "Modify"}
            </button>
            {isEditing ? (
              <button onClick={() => handleSubmit()}>Save</button>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="modal-edit">
          {isEditing && (
            <div>
              <div>
                {showDelete ? (
                  <div>
                    <span>To submit delete input &quot;delete&quot;</span>
                    <input
                      type="text"
                      placeholder="here"
                      onChange={handleSubmitDelete}
                    />
                    <br />
                    <button
                      className="cancel-btn"
                      onClick={() => {
                        setShowDelete(false);
                        setSubmitDelete(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={!submitDelete}
                      className={submitDelete ? "delete-button-red" : "disable"}
                      onClick={() => handleDelete(person.id)}
                    >
                      Submit delete
                    </button>
                  </div>
                ) : (
                  <button
                    className="delete-button"
                    onClick={() => setShowDelete(true)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
          {deleteError && <p className="errorMessege">{deleteError}</p>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
