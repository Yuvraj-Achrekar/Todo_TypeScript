import "./style.css";

type Todo = {
	title: string;
	isCompleted: boolean;
	readonly id: number;
};

// Creating a array to store todo list items
const todos: Array<Todo> = [];

const todoInput = document.querySelector("input") as HTMLInputElement;
const todoContainer = document.getElementById(
	"todoContainer"
) as HTMLDivElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

// Action for form submit
myForm.onsubmit = (e) => {
	e.preventDefault();

	// creating a object of the new list item
	const todo: Todo = {
		title: todoInput.value,
		isCompleted: false,
		id: Math.random() * 1000,
	};

	todos.push(todo);
	// Once the item is added to the main array then rendering the items in the html
	renderList(todos);
	todoInput.value = "";
};

// renderList function which takes the main todos array as a input
const renderList = (todos: Todo[]) => {
	todoContainer.innerHTML = "";
	// mapping all the elements in array to render each and every element in the array
	todos.map((item) => {
		generateItem(item.id, item.title, item.isCompleted);
	});
};

const generateItem = (id: number, title: string, isCompleted: boolean) => {
	const todo = document.createElement("div");
	todo.className = "listItem";

	//Creating a checkbox
	const checkBox = document.createElement("input");
	checkBox.type = "checkbox";
	checkBox.className = "checkBtn";
	checkBox.checked = isCompleted;
	checkBox.onchange = () => {
		todos.find((item) => {
			if (item.id === id) item.isCompleted = checkBox.checked;
		});
		paragraphOutput.className = checkBox.checked ? "taskCompleted" : "";
	};

	//Creating a deletebtn
	const deleteBtn = document.createElement("button");
	deleteBtn.innerText = "X";
	deleteBtn.className = "deleteBtn";
	deleteBtn.onclick = () => {
		const abc = todos.findIndex((item) => item.id === id);
		todos.splice(abc, 1);
		renderList(todos);
	};

	//Creating a paragraph
	const paragraphOutput = document.createElement("p");
	paragraphOutput.className = "taskName";
	paragraphOutput.innerText = title;
	paragraphOutput.className = isCompleted ? "taskCompleted" : "";

	// appending all the created tags in todo div
	todo.append(checkBox, paragraphOutput, deleteBtn);
	// appending the todo div inside the todocontainer
	todoContainer.append(todo);
};
