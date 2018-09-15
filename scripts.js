//////// CIRCUIT GENERATION ////////

function generateCircuit(button) {
	const maxDifficulty = getDifficulty();
	const exerciseLimit = getExerciseCount();
	var chosenExercises = [];
	var totalExercises = 0;
	var totalDifficulty = 0;
	var possibleExercises = EXERCISES.slice();
	shuffle(possibleExercises);

	while (possibleExercises.length &&
			(chosenExercises.length < exerciseLimit) &&
			(totalDifficulty < maxDifficulty)) {
		var randomExecise = possibleExercises.pop();
		if (validateExercise(randomExecise, totalDifficulty, maxDifficulty)) {
			totalDifficulty += randomExecise.difficulty;
			chosenExercises.push(randomExecise);
		}
	}

	setCircut(chosenExercises);
	button.classList.add("clicked");
}

function validateExercise(exercise, totalDifficulty, maxDifficulty) {
	var addedDifficulty = parseInt(exercise.difficulty);
	if (isNaN(addedDifficulty)) {
		console.log(`ERROR: Exercise "${exercise.title}" has difficulty ${exercise.difficulty}`);
		addedDifficulty = 0;
	}

	return (totalDifficulty + addedDifficulty) <= maxDifficulty;
}

function getExerciseCount() {
	var exerciseCount = document.querySelector(".exercise-count-slider input").value;
	return parseInt(exerciseCount) || 0;
}

function getDifficulty() {
	var difficulty = document.querySelector(".difficulty-radio .radio-group button.selected").value;
	return parseInt(difficulty) || 0;
}

function setCircut(exercises) {
	const templateExercise = document.querySelector("#circuit-item-template");
	const exerciseListNode = document.querySelector(".circuit-list");
	exerciseListNode.innerHTML = "";

	for (var i in exercises) {
		var exercise = exercises[i];
		var exerciseNode = templateExercise.content.cloneNode(true);
		setExerciseTemplateData(exerciseNode, exercise);
		exerciseListNode.appendChild(exerciseNode);
	}
}

function setExerciseTemplateData(node, exercise) {
	node.querySelector(".item-title").textContent = exercise.title;
}

//////// EVENT HANDLERS ////////

function rangeChanged(node) {
	var rangeRow = node.parentElement;
	var newValue = node.value;
	var nodeType = node.type;

	if (nodeType === "number") {
		var otherRange = rangeRow.querySelector("input[type='range']");
	} else {
		var otherRange = rangeRow.querySelector("input[type='number']");
	}

	otherRange.value = node.value;
}

function toggleCompletion(exerciseNode, event) {
	var checkbox = exerciseNode.querySelector("input[type='checkbox']");
	// toggle check if neccessary
	if (event.target !== checkbox) {
		checkbox.checked = !checkbox.checked;
	}

	// apply or remove checked class
	if (checkbox.checked) {
		exerciseNode.classList.add("completed");
	} else {
		exerciseNode.classList.remove("completed");
	}
}

function setDifficulty(button) {
	var radioGroup = button.parentElement;
	var radioButtons = radioGroup.querySelectorAll("button");

	for (var i = 0; i < radioButtons.length; i++) {
		var radioButton = radioButtons[i];
		radioButton.classList.remove("selected");
	}

	button.classList.add("selected");
}

//////// HELPER FUNCTIONS ////////

function shuffle(array) {
	var randIndex, element;
	for (var i = array.length - 1; i > 0; i--) {
		randIndex = Math.floor(Math.random() * (i + 1));
		element = array[i];
		array[i] = array[randIndex];
		array[randIndex] = element;
	}
	return array;
}

