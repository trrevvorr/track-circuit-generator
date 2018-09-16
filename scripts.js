//////// GLOBALS ////////
// see globals defined in exercises.js

//////// CIRCUIT GENERATION ////////
function generateCircuit(button) {
	var chosenExercises = [];
	// settings
	const difficultyWeights = getDifficultyWeights();
	const exerciseLimit = getExerciseCount();
	// available exercises
	var availableExercises = {};
	availableExercises.easy = shuffle(EXERCISES.easy.slice());
	availableExercises.medium = shuffle(EXERCISES.medium.slice());
	availableExercises.hard = shuffle(EXERCISES.hard.slice());

	// choose exercises
	var DIFFS = [];
	while ((chosenExercises.length < exerciseLimit) && exerciseAvailable(availableExercises)) {
		var difficulty = chooseDifficulty(difficultyWeights)
		var exercise = availableExercises[difficulty].pop();
		if (validateExercise(exercise, difficulty)) {
			chosenExercises.push(exercise);
			DIFFS.push(difficulty);
		}
	}
	// display circuit data on page
	displayCircuit(chosenExercises);
	button.classList.add("clicked");

	DIFFS.sort();
	console.log(`easy: ${(DIFFS.lastIndexOf(EASY) - DIFFS.indexOf(EASY) + 1) / DIFFS.length * 100}%`)
	console.log(`medium: ${(DIFFS.lastIndexOf(MED) - DIFFS.indexOf(MED) + 1) / DIFFS.length * 100}%`)
	console.log(`hard: ${(DIFFS.lastIndexOf(HARD) - DIFFS.indexOf(HARD) + 1) / DIFFS.length * 100}%`)
}

function validateExercise(exercise, difficulty) {
	return !!exercise; // exercise must exist
}

function getExerciseCount() {
	var exerciseCount = document.querySelector(".exercise-count-input input").value;
	return parseInt(exerciseCount) || 0;
}

function getDifficultyWeights() {
	var difficultyWeights = [];
	const difficulty = document.querySelector(".difficulty-radio .radio-group button.selected").value;

	if (difficulty === EASY) {
		// EASY: 50%, MED: 33%, HARD: 17%
		difficultyWeights = [EASY, EASY, EASY, MED, MED, HARD];
	} else if (difficulty === MED) {
		// EASY: 33%, MED: 33%, HARD: 33%
		difficultyWeights = [EASY, MED, HARD];
	} else if (difficulty === HARD) {
		// EASY: 17%, MED: 33%, HARD: 50%
		difficultyWeights = [EASY, MED, MED, HARD, HARD, HARD];
	} else {
		console.log(`ERROR: difficulty setting invalid: "${difficulty}"`);
		difficultyWeights = [];
	}

	return difficultyWeights;
}

function exerciseAvailable(exercises, difficulty) {
	if (difficulty) {
		return exercises[difficulty].length > 0;
	} else {
		return (exercises[EASY].length + exercises[MED].length + exercises[HARD].length) > 0;
	}
}

function chooseDifficulty(difficultyWeights) {
	var randIndex = Math.floor(Math.random() * (difficultyWeights.length));
	return difficultyWeights[randIndex];
}

function displayCircuit(exercises) {
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
	node.querySelector(".item-title").textContent = exercise;
}

//////// EVENT HANDLERS ////////

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

