const { argv } = require("yargs");
const path = require("path");
const Todo = require("./src/Todo");
const { saveFile, readFile } = require("./src/utils");
const { ADD, UPDATE, NEXT, DONE, FIND, LIST } = require("./src/commands");
const colors = require("colors");

const fileName = "./data.json";
const filePath = path.resolve(__dirname, fileName);

(function init() {
	const data = readFile(filePath) || [];
	const todo = new Todo(data);
	const { _: baseCommand } = argv;

	switch (baseCommand[0]) {
		case ADD: {
			todo.addItem(argv.text);
			console.log("Todo Added Successfully".green);
			saveFile(todo.todoList, filePath);
			break;
		}

		case UPDATE: {
			todo.update(argv.id, argv.text);
			console.log("Todo Updated".green);
			saveFile(todo.todoList, filePath);
			break;
		}

		case NEXT: {
			const item = todo.next();
			console.log(`${item.id} -  ${item.text} [${item.created}]`);
			break;
		}

		case DONE: {
			todo.done();
			console.log("One Todo Completed".green);
			saveFile(todo.todoList, filePath);
			break;
		}

		case LIST: {
			if (todo.todoList.length === 0) {
				console.log("Empty Todo List".blue);
				break;
			}
			for (let i = 0; i < todo.todoList.length; i++) {
				console.log(
					`${todo.todoList[i].id} - ${todo.todoList[i].text} [${todo.todoList[i].created}]`
				);
			}
			break;
		}

		case FIND: {
			const items = todo.find(argv.terms);
			if (items.length === 0) {
				console.log("No Todo Found!".red);
				break;
			}
			for (let i = 0; i < items.length; i++) {
				console.log(`${items[i].id} -  ${items[i].text} [${items[i].created}]`);
			}
			break;
		}

		default:
			throw new Error("Command Not Found!".red);
	}
})();
