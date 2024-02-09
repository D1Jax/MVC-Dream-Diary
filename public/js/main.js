const deleteBtn = document.querySelectorAll('.del');
const todoItem = document.querySelectorAll('span.not');
const todoComplete = document.querySelectorAll('span.completed');
const editButtons = document.querySelectorAll('.edit');
const editForm = document.getElementById('edit-form');
const editInput = editForm.querySelector('#edit-content');

Array.from(editButtons).forEach((button) => {
    button.addEventListener('click', editTodo);
});

Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteTodo);
});

// Attach a submit event listener to the edit form
editForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    const updatedContent = editInput.value;
    const todoId = editForm.querySelector('#edit-id').value; // Assuming you have an input field with id="edit-id" for the todo ID

    try {
        const response = await fetch(`/todos/editTodo`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: todoId, updatedContent }),
        });

        if (response.ok) {
            const updatedTodo = await response.json();
            // Update the UI with the updated todo item
            // Hide the edit form
            editForm.style.display = 'none';
            // Replace the old content with the updated content
            const todoItem = document.querySelector(`.todoItem[data-id="${todoId}"]`);
            const contentSpan = todoItem.querySelector('.not');
            contentSpan.textContent = updatedContent;
            // Optionally, update the completed status if it's relevant
         
            // Optionally, update the date if it's relevant
            
        } else {
            // Handle errors
            alert('Failed to update the todo item. Please try again.');
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred while trying to update the todo item.');
    }
});

async function editTodo(event) {
    const todoItem = event.currentTarget.parentNode; // The parent <li> element of the "Edit" button
    const todoId = todoItem.dataset.id; // The ID of the todo item
    const todoContent = todoItem.querySelector('.not').textContent; // The text content of the todo item
    const editForm = document.getElementById('edit-form');
    const editInput = editForm.querySelector('#edit-content');
    const editIdInput = editForm.querySelector('#edit-id');

    // Populate the edit form with the current content
    editInput.value = todoContent;
    editIdInput.value = todoId;
    editForm.querySelector('#edit-id').value = todoId; // Set the hidden input field with the todo ID

    // Show the edit form
    editForm.style.display = 'block';
}

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


