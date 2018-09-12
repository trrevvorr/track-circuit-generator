function generateCircuit() {
	const maxDifficulty = getMaxDifficulty();
	const maxDuration = getMaxDuration();
	const numExercises = EXERCISES.length;
	var chosenExercises = [];
	var totalDuration = 0;
	var totalDifficulty = 0;

	while ((totalDuration < maxDuration) && (totalDifficulty < maxDifficulty)) {
		var randomIndex = Math.floor(Math.random() * (numExercises + 1));
		var randomExecise = EXERCISES[randomIndex];
		totalDuration += randomExecise.duration;
		totalDifficulty += randomExecise.difficulty;
		chosenExercises.push(randomExecise);
	}
	
	loadCircut(chosenExercises);
}

function getMaxDuration() {
	var duration = document.querySelector(".duration-slider input").value;
	return parseInt(duration) || 0;
}

function getMaxDifficulty() {
	var difficulty = document.querySelector(".difficulty-slider input").value;
	return parseInt(difficulty) || 0;
}

function loadCircut(exercises) {
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

function setExerciseTemplateData(element, exercise) {
	element.querySelector(".item-title").textContent = exercise.title;
}