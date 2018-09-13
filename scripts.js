function generateCircuit() {	
	const maxDifficulty = getMaxDifficulty();
	const maxDuration = getMaxDuration();
	var chosenExercises = [];
	var totalDuration = 0;
	var totalDifficulty = 0;
	var exercises = EXERCISES.slice();
	shuffle(exercises);

	while ((totalDuration < maxDuration) && 
		   (totalDifficulty < maxDifficulty) &&
		   (exercises.length)) {
		var randomExecise = exercises.pop();
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

function setExerciseTemplateData(node, exercise) {
	node.querySelector(".item-title").textContent = exercise.title;
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

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}