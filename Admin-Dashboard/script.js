const userData = [
    { id: 1, name: 'Mukesh', email: 'mukesh@email.com' },
    { id: 2, name: 'Mohan', email: 'mohan@email.com' },
    { id: 3, name: 'Pratik D', email: 'pratik@email.com' },
    { id: 4, name: 'Rahul H', email: 'rahul@email.com' },
    { id: 5, name: 'Aditya J', email: 'aditya@email.com' },
    { id: 6, name: 'Srushti', email: 'srushti@email.com' },
    { id: 7, name: 'Anil R', email: 'anil@email.com' },
    { id: 8, name: 'Aman P', email: 'aman@email.com' },
    { id: 9, name: 'Sakshi O', email: 'sakshi@email.com' },
    { id: 10, name: 'Sunil I', email: 'sunil@email.com' },
    { id: 11, name: 'Aarav Patel', email: 'aarav@email.com' },
    { id: 12, name: 'Aarya Singh', email: 'aarya@email.com' },
    { id: 13, name: 'Aarushi Gupta', email: 'aarushi@email.com' },
    { id: 14, name: 'Abhay Verma', email: 'abhay@email.com' },
    { id: 15, name: 'Aditi Desai', email: 'aditi@email.com' },
    { id: 16, name: 'Akash Sharma', email: 'akash@email.com' },
    { id: 17, name: 'Ananya Singh', email: 'ananya@email.com' },
    { id: 18, name: 'Aniket Kapoor', email: 'aniket@email.com' },
    { id: 19, name: 'Arjun Yadav', email: 'arjun@email.com' },
    { id: 20, name: 'Arya Choudhary', email: 'arya@email.com' },
    { id: 21, name: 'Rohan Mehta', email: 'rohan@email.com' },
    { id: 22, name: 'Sakshi Jain', email: 'sakshi@email.com' },
    { id: 23, name: 'Samayra Kumar', email: 'samayra@email.com' },
    { id: 24, name: 'Shaurya Singh', email: 'shaurya@email.com' },
    { id: 25, name: 'Siya Bajaj', email: 'siya@email.com' },
    { id: 26, name: 'Vikram Sharma', email: 'vikram@email.com' },
    { id: 27, name: 'Vidya Krishnan', email: 'vidya@email.com' },
    { id: 28, name: 'Yogesh Verma', email: 'yogesh@email.com' },
    { id: 29, name: 'Zara Bhatt', email: 'zara@email.com' },
    { id: 30, name: 'Zayn Kumar', email: 'zayn@email.com' },
    { id: 31, name: 'Zoya Khanna', email: 'zoya@email.com' },

];

const usersPerPage = 10;
let currentPage = 1;

function populateTable(data) {
    const tableBody = document.getElementById('user-table-body');
    tableBody.innerHTML = '';
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    for (let i = startIndex; i < endIndex && i < data.length; i++) {
        const user = data[i];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="select-row"></td>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button class="edit" data-user-id="${user.id}"><img src="edit_icon.png" alt="Edit"></button>
                <button class="delete" data-user-id="${user.id}"><img src="delete_icon.png" alt="Delete"></button>
            </td>
        `;
        tableBody.appendChild(row);
    }

    // Add event listeners for edit and delete actions
    document.querySelectorAll('.edit').forEach(editButton => {
        editButton.addEventListener('click', handleEdit);
    });

    document.querySelectorAll('.delete').forEach(deleteButton => {
        deleteButton.addEventListener('click', handleDelete);
    });
}

function handleEdit(event) {
    const userId = event.currentTarget.getAttribute('data-user-id');
    const userRow = event.currentTarget.closest('tr');
    const userNameCell = userRow.querySelector('td:nth-child(3)'); // Assuming the name is in the third column

    const newName = prompt('Enter the new name:');
    if (newName !== null) {
        console.log(`Edit user with ID ${userId} - New Name: ${newName}`);
        userNameCell.textContent = newName;
    }
}

function handleDelete(event) {
    const userId = event.currentTarget.getAttribute('data-user-id');
    const confirmation = confirm(`Are you sure you want to delete user with ID ${userId}?`);
    if (confirmation) {
        console.log(`Delete user with ID ${userId}`);
        event.currentTarget.closest('tr').remove();
    }
}

function deleteSelectedRows() {
    const selectedRows = document.querySelectorAll('.select-row:checked');
    selectedRows.forEach(row => {
        row.closest('tr').remove();
    });
}

function updatePagination(totalPages) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    // Add "First Page" button
    pagination.appendChild(createPageButton('first-page', '<<', 1));

    // Add "Previous Page" button
    pagination.appendChild(createPageButton('previous-page', '<', currentPage - 1));

    // Add page number buttons
    for (let i = 1; i <= totalPages; i++) {
        pagination.appendChild(createPageButton('page-number', i, i));
    }

    // Add "Next Page" button
    pagination.appendChild(createPageButton('next-page', '>', currentPage + 1));

    // Add "Last Page" button
    pagination.appendChild(createPageButton('last-page', '>>', totalPages));
}

function createPageButton(className, content, page) {
    const button = document.createElement('button');
    button.className = className;
    button.innerHTML = content;
    button.addEventListener('click', () => {
        currentPage = page;
        filterAndPopulateTable(searchBar.value, filterDropdown.value);
    });
    return button;
}

function filterAndPopulateTable(query, filterOption) {
    const filteredData = userData.filter(user => {
        const lowerCaseQuery = query.toLowerCase();
        switch (filterOption) {
            case 'name':
                return user.name.toLowerCase().includes(lowerCaseQuery);
            case 'id':
                return user.id.toString().includes(lowerCaseQuery);
            case 'email':
                return user.email.toLowerCase().includes(lowerCaseQuery);
            default:
                return false;
        }
    });

    const totalPages = Math.ceil(filteredData.length / usersPerPage);
    populateTable(filteredData);
    updatePagination(totalPages);
}

// Event listener for the search bar and filter dropdown
const searchBar = document.querySelector('.search-bar');
const filterDropdown = document.querySelector('.filter-dropdown');

searchBar.addEventListener('input', function () {
    const filterOption = filterDropdown.value;
    filterAndPopulateTable(this.value, filterOption);
});

filterDropdown.addEventListener('change', function () {
    const filterOption = this.value;
    filterAndPopulateTable(searchBar.value, filterOption);
});

// Event listener for the "Delete Selected" button
const deleteSelectedButton = document.querySelector('.delete-selected');
deleteSelectedButton.addEventListener('click', deleteSelectedRows);

// Event listener for the "Select All" checkbox
const selectAllCheckbox = document.querySelector('.select-all');
selectAllCheckbox.addEventListener('change', function () {
    const selectRows = document.querySelectorAll('.select-row');
    selectRows.forEach(row => {
        row.checked = this.checked;
    });
});

// Fetch initial user data and populate the table
const totalPages = Math.ceil(userData.length / usersPerPage);
populateTable(userData);
updatePagination(totalPages);

function addPersonManually() {
    const newName = prompt('Enter the name:');
    const newEmail = prompt('Enter the email:');

    if (newName !== null && newEmail !== null) {
        const newId = userData.length + 1; // Assign a new ID (this is just an example)
        const newPerson = { id: newId, name: newName, email: newEmail };
        userData.push(newPerson);
        filterAndPopulateTable(searchBar.value, filterDropdown.value);
    }
}

// Add event listener for the "Add Person" button
const addPersonButton = document.querySelector('.add-person');
addPersonButton.addEventListener('click', addPersonManually);


document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('user-table-body');

    tableBody.addEventListener('change', function (event) {
        if (event.target.classList.contains('select-row')) {
            const selectedRow = event.target.closest('tr');
            if (selectedRow) {
                selectedRow.classList.toggle('selected', event.target.checked);
            }
        }
    });

    function saveSelectedRows() {
        const selectedRows = document.querySelectorAll('.selected');
        selectedRows.forEach(row => {
            // Perform save operation on the selected rows if needed
            // For demonstration purposes, let's just change the background color to grey
            row.style.backgroundColor = '#808080';
            row.classList.remove('selected');
        });
    }

    document.getElementById('searchInput').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            searchTable();
        }
    });

    // Add this event listener for the "Save" button
    const savePersonButton = document.querySelector('.save-person');
    savePersonButton.addEventListener('click', saveSelectedRows);
});

function saveSelectedRows() {
    const selectedRows = document.querySelectorAll('.selected');
    selectedRows.forEach(row => {
        // Perform save operation on the selected rows if needed
        // For demonstration purposes, let's just change the background color to grey
        row.style.backgroundColor = '#808080';
        row.classList.remove('selected');
    });
}