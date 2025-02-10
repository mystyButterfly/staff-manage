
import './HowToUse.css'

function HowToUse() {
  return (
    <div className="htu-container">
        <header className='htu-header'>
            <h1>Welcome to the People Management Service!</h1>
            <p>This application allows you to view, create, edit, and delete records of individuals. Here’s a step-by-step guide on how to use this service efficiently:</p>
        </header>

        <section>
            <h2>1. Viewing Records</h2>
            <p>Upon accessing the application, you'll be presented with a list of individuals in a table format. Each row represents a person, displaying their <strong>Name</strong>, <strong>Age</strong>, <strong>City</strong>, and <strong>Occupation</strong>.</p>
        </section>
        
        <section>
            <h2>2. Searching for a Person</h2>
            <p>Use the search bar at the top of the table to filter records. Enter any part of the name, age, city, or occupation of the person you are searching for. The table will automatically update to display only those that match your search criteria.</p>
        </section>

        <section>
            <h2>3. Sorting Records</h2>
            <p>Click on the headers (<strong>Name</strong>, <strong>Age</strong>, <strong>City</strong>, <strong>Occupation</strong>) in the table to sort the records. Each click toggles the sort order between ascending and descending.</p>
        </section>

        <section>
            <h2>4. Viewing Details</h2>
            <p>Click the <strong>Detail</strong> button in the respective row to open a modal that displays comprehensive information about that person, including:</p>
            <ul>
                <li>ID</li>
                <li>Name</li>
                <li>Age</li>
                <li>City</li>
                <li>Occupation</li>
            </ul>
            <p>From this modal, you can also edit or delete the record.</p>
        </section>

        <section>
            <h2>5. Editing Records</h2>
            <p>To edit a person&apos;s information, click the <strong>Edit</strong> button in the modal. Modify the necessary fields, then click <strong>Submit</strong> to save changes or <strong>Cancel</strong> to discard edits. Once the changes are made, the table will refresh, showing updated information.</p>
        </section>

        <section>
            <h2>6. Deleting Records</h2>
            <p>If you need to remove a person from the records, open the detail modal and click on the <strong>Delete</strong> button. You will need to confirm your intention to delete by entering the word "<strong>delete</strong>" in the prompt that appears. Click <strong>Submit delete</strong> to permanently remove the record.</p>
        </section>

        <section>
            <h2>7. Creating a New Record</h2>
            <p>Click the <strong>Create new record</strong> button at the top of the application. Fill in the form with the new person's details (Name, Age, City, and Occupation). Click <strong>Submit</strong> to save the new record or <strong>Cancel</strong> to exit without saving. A successful creation will alert you with a message, and the new record will appear in the list.</p>
        </section>

        <section>
            <h2>8. Pagination</h2>
            <p>At the bottom of the table, you can navigate through pages of records if there are more than the displayed limit (10 items per page). Click on the page numbers to view more records.</p>
        </section>

        <section>
            <h2>9. Accessing Documentation</h2>
            <p>If you need further assistance, click on the <strong>Documentation and support</strong> link, which provides additional instructions and FAQs about using the application.</p>
        </section>

        <section>
            <h2>10. Refreshing Data</h2>
            <p>If you want to update the data displayed on the screen (for instance, after adding or deleting entries), click the refresh icon next to the documentation link.</p>
        </section>
    </div>
  )
}

export default HowToUse
