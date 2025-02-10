import  { useState, useEffect } from "react";
import { NODE_SERVER_URL } from "../App";

const CreateModal = ({ isOpenCreate, onCloseCreate }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    occupation: "",
    city: "",
  });
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [ageError, setAgeError] = useState(false);

  // Effect to handle Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseCreate(); // Call onCloseCreate when Escape is pressed
      }
    };
    setResponse([]);
    setError("");
    setFormData({
      name: "",
      age: "",
      occupation: "",
      city: "",
    });
    // Only add event listener if the modal is open
    if (isOpenCreate) {
      document.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpenCreate, onCloseCreate]);

  if (!isOpenCreate) return null;

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

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    // Validate that the age is 18 or older
    // if (formData.age < 18) {
    //   setError("Age must be 18 or older.");
    //   return; // Stop further execution
    // }

    try {
      const response = await fetch(`${NODE_SERVER_URL}/api/people`, {
        method: "POST", // Specify the method
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
        body: JSON.stringify(formData), // Convert the form data to JSON
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // Parse the error response
        if (errorResponse.error && errorResponse.error.includes("Age must be 18 or older")) {
          setAgeError(true);
        }
        throw new Error(errorResponse.error || "Network response was not ok");
      }

      const data = await response.json(); // Parse the JSON response
      setResponse(data);

      // Reset form fields
      setFormData({
        name: "",
        age: "",
        occupation: "",
        city: "",
      });
      setError("");
      setAgeError(false);
    } catch (error) {
      console.error("Error creating record:", error);
      setError(error.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCloseCreate}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onCloseCreate}>
          X
        </button>
        <div className="modal-edit">
          <div>
            <form onSubmit={handleSubmit} className="create-record">
              <h2>Create new record</h2>
              <div>
                <label>
                  Name:
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Age:
                  <input
                    required
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="1"
                    className={ageError?'error-input':''}
                  />
                </label>
              </div>
              <div>
                <label>
                  City:
                  <input
                    required
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Occupation:
                  <input
                    required
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div className="createModal-buttons">
                <button onClick={onCloseCreate} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit">Create</button>
              </div>
            </form>
            <div className="create-record-response">
              {response.name ? (
                <div>
                  {" "}
                  <h3>Record was successfully created!</h3>
                  Name: {response.name}
                  <br />
                  Unique record ID: {response.id}
                  <br />
                </div>
              ) : (
                ""
              )}
              {error && <p className="errorMessege">Error: {error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
