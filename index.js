window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get the input values
    const content = e.target.elements.content.value;
    const category = e.target.elements.category.value;

    // Check if either the content or category is empty
    if (!content.trim() || category === '') {
        // Display the error message as a popup
        const errorPopup = document.getElementById('error-popup');
        errorPopup.textContent = 'Please enter both your task and pick a category';
        errorPopup.style.display = 'block';

        // Automatically hide the error message after 5 seconds
        setTimeout(() => {
            errorPopup.style.display = 'none';
        }, 5000);

        return; // Prevent creating a new todo
    }

    const todo = {
        content,
        category,
        done: false,
        createdAt: new Date().getTime()
    }

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));

    // Reset the form
    e.target.reset();

    DisplayTodos();
})



	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');
		const updateButton = document.createElement('button'); // Added update button
  
		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');
		updateButton.classList.add('Update'); // Added update button

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';
		updateButton.innerHTML = 'Update'; // Added update button

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		actions.appendChild(updateButton); // Added update button
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()
		})

		const editButtonState = {
            isEditing: false,
            originalContent: todo.content,
        };

edit.addEventListener('click', () => {
    const input = content.querySelector('input');
    
    if (!editButtonState.isEditing) {
        // Switch to edit mode
        input.removeAttribute('readonly');
        input.focus();

        // Get the length of the input value
        const inputValueLength = input.value.length;

        // Set the cursor position to the end of the text
        input.setSelectionRange(inputValueLength, inputValueLength);

        edit.innerHTML = 'Update';
        editButtonState.isEditing = true;
    } else {
        // Update the content and switch back to view mode
        input.setAttribute('readonly', true);
        todo.content = input.value;
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodos();

        edit.innerHTML = 'Edit';
        editButtonState.isEditing = false;
    }
});




// ...


		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}
