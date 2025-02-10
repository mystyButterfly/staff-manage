import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import CreateModal from "./CreateModal";
import { NODE_SERVER_URL } from "../App";

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredList, setFilteredList] = useState([]);
  const [untachedList, setUntachedList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({}); //this state for filtering by occupation
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);

  // fetch data
  const fetchData = async () => {
    try {
      const response = await fetch(`${NODE_SERVER_URL}/api/people`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        // Ensure data is an array before setting state
        setFilteredList(data);
        setUntachedList(data);
      } else {
        console.error("Fetch data format error: ", data);
        setFilteredList([]);
        setUntachedList([]);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setFilteredList([]);
      setUntachedList([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // end fetching data
  useEffect(() => {
    initializeSelectedOptions();
  }, [untachedList]);

  const sortData = useCallback(() => {
    let newList = [...filteredList];
    if (sortConfig.key) {
      newList.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    setFilteredList(newList);
  }, [sortConfig]);

  useEffect(() => {
    sortData(); // Sort when sortConfig changes
  }, [sortData]);

  const handleSortClick = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const handleButtonClick = (id) => {
    const person = filteredList.find((element) => element.id === id);
    setSelectedPerson(person);
    setIsModalOpen(true); // Open the modal
  };

  // search start
  function filterPerson(person, query) {
    const { name, age, city, occupation } = person;
    const lowerCaseQuery = query.toLowerCase();

    return [
      name.toLowerCase(),
      age.toString(),
      city.toLowerCase(),
      occupation.toLowerCase(),
    ].some((property) => property.includes(lowerCaseQuery));
  }

  function searchHandler(e) {
    const searchArgument = e.target.value;
    const newList = untachedList.filter((person) =>
      filterPerson(person, searchArgument)
    );
    setFilteredList(newList);
  }
  // search end

  // filtering by occopation start

  // Function to initialize selectedOptions based on occupations in the data
  const initializeSelectedOptions = () => {
    const occupations = untachedList.map((person) => person.occupation);
    
    // Initialize the initialOptions object
    const initialOptions = {};
    occupations.forEach((occupation) => {
      initialOptions[occupation] = false;
    });
  
    // Get keys from the initialOptions and sort them in descending order (case insensitive)
    const sortedKeys = Object.keys(initialOptions).sort((a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
  
    // Create a new object to hold the sorted options
    const sortedOptions = {};
    sortedKeys.forEach((key) => {
      sortedOptions[key] = initialOptions[key];
    });
  
    // Set the sorted options
    setSelectedOptions(sortedOptions);
  };
  

  // Update filtered list whenever selected options change
  useEffect(() => {
    // Check if all selectedOptions are false
    const allFalse = Object.values(selectedOptions).every((option) => !option);

    if (allFalse) {
      // If all are false, return the original untachedList
      setFilteredList(untachedList);
    } else {
      // Filter based on selectedOptions
      const filtered = untachedList.filter(
        (item) => selectedOptions[item.occupation]
      );
      setFilteredList(filtered);
    }
  }, [selectedOptions]);

  const handleCheckboxChange = (role) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [role]: !prevState[role],
    }));
  };

  // filtering by occupation end

  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Search ..."
          onChange={(e) => searchHandler(e)}
        />
        <div>
          <button onClick={() => setIsModalCreateOpen(true)}>
            Create new record
          </button>
          <Link to="/howuse">Documentation and support</Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            onClick={() => fetchData()}
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg>
        </div>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>
                Name <span onClick={() => handleSortClick("name")}>↨</span>
              </th>
              <th>
                Age <span onClick={() => handleSortClick("age")}>↨</span>
              </th>
              <th>
                City <span onClick={() => handleSortClick("city")}>↨</span>
              </th>
              <th>
                Occupation
                <span>
                  <div className="dropdown">
                    <div className="dropbtn">▼</div>
                    <div className="dropdown-content">
                      {Object.keys(selectedOptions).length > 0 ? (
                        Object.keys(selectedOptions).map((role) => (
                          <label key={role}>
                            <input
                              type="checkbox"
                              checked={selectedOptions[role]}
                              onChange={() => handleCheckboxChange(role)}
                            />
                            {role}
                          </label>
                        ))
                      ) : (
                        <p>No options available</p>
                      )}
                    </div>
                  </div>
                </span>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((person, index) => (
              <tr key={index}>
                <td>{person.name}</td>
                <td>{person.age}</td>
                <td>{person.city}</td>
                <td>{person.occupation}</td>
                <td className="btnDetail">
                  <button onClick={() => handleButtonClick(person.id)}>
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              disabled={currentPage === index + 1}
              className={currentPage === index + 1 ? "disabled" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          fetchData();
        }}
        person={selectedPerson}
      />
      <CreateModal
        isOpenCreate={isModalCreateOpen}
        onCloseCreate={() => {
          setIsModalCreateOpen(false);
          fetchData();
        }}
      />
    </div>
  );
};

export default Table;
