let simsubscreennum=0;

function navNext() {
	for(let temp=0;temp<2;temp++) {
		document.getElementById("canvas"+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;

	document.getElementById("canvas"+simsubscreennum).style.visibility="visible";
	document.getElementById("nextButton").style.visibility="hidden";
	magic();
}

function navBack() {
	simsubscreennum -= 1;

	document.getElementById("canvas" + (simsubscreennum + 1)).style.visibility = "hidden";
	document.getElementById("canvas" + simsubscreennum).style.visibility = "visible";

	if (simsubscreennum === 0) {
		document.getElementById("nextButton").style.visibility = "visible";
	} else {
		document.getElementById("nextButton").style.visibility = "hidden";
	}

	magic();
}

function magic() {}

function resetExperiment() {
	document.getElementById("reset").style.visibility="hidden";

	// Reset input fields
	document.getElementById("textInput").value = "0";

	//reset slider
	document.getElementById("slider").value = "0";

	// Clear error messages
	document.getElementById("errorText").textContent = "";
	
	// Clear displayed content
	document.getElementById("displayArea").textContent = "";
	document.getElementById("output").textContent = "";
	
	// Return to canvas 1
	simsubscreennum = 1;

	for (let temp = 0; temp < 3; temp++) {
		document.getElementById("canvas" + temp).style.visibility = "hidden";
	}
	
	document.getElementById("canvas1").style.visibility = "visible";
	
	// Show the "Next" button on canvas 1
	document.getElementById("nextButton").style.visibility = "hidden";
	document.getElementById("displayButton").textContent = " 0";
    document.getElementById("displayArea").textContent = "Selected number: 0";
}


const slider = document.getElementById("slider");
document.getElementById("slider").value = "0";

const textInput = document.getElementById("textInput");
textInput.value = "0";

const errorText = document.getElementById("errorText");

slider.addEventListener("input", function() {
	textInput.value = slider.value;
});

textInput.addEventListener("input", function() {
	const inputValue = textInput.value;
	
	if (isNaN(inputValue) || inputValue < 0 || inputValue > 9) {
		errorText.textContent = "Error: Please enter a valid number between 0 and 9.";
	} else {
		errorText.textContent = "";
		slider.value = inputValue;
	}
});

textInput.addEventListener("keydown", function(event) {
	const key = event.key;

	if (!/^[0-9]$/.test(key) && key !== "Backspace" && key !== "Enter" && !(event.ctrlKey && key === "Enter")) {
		event.preventDefault();
		errorText.textContent = "Error: Only numeric values are allowed.";
	} else {
		errorText.textContent = "";
	}
});

function displayNumber() {
	var numberValue = document.getElementById("textInput").value;
	document.getElementById("displayArea").textContent = "Selected number: " + numberValue;
}

slider.addEventListener("input", function() {
	textInput.value = slider.value;
	displayNumber();
});

document.getElementById("displayArea").textContent = "Selected number: 0";

function displayNumber1() {
	var numberValue = document.getElementById("textInput").value;
	var displayButton = document.getElementById("displayButton");
	displayButton.textContent = " " + numberValue;
}

slider.addEventListener("input", function() {
	textInput.value = slider.value;
	displayNumber1();
});

document.getElementById("displayButton").textContent = " 0";

var numToMorse = {
"1": ".----",
"2": "..---",
"3": "...--",
"4": "....-",
"5": ".....",
"6": "-....",
"7": "--...",
"8": "---..",
"9": "----.",
"0": "-----"
};

var morseCode = "";

function convertAndPlay() {
	var numbers = document.getElementById("textInput").value.split("");
	var output = document.getElementById("output");
	output.innerHTML = "";
	
	morseCode = numbers.map(num => numToMorse[num]).join("");
	
	var context = new AudioContext();
	
	morseCode.split("").forEach(function(symbol, index) {
		setTimeout(function() {
			output.innerHTML += symbol;
			
			var oscillator = context.createOscillator();
			oscillator.frequency.value = 600;
			oscillator.connect(context.destination);
			oscillator.start();
			
			if (symbol === ".") {
				setTimeout(function() { oscillator.stop(); }, 100);
			} else if (symbol === "-") {
				setTimeout(function() { oscillator.stop(); }, 300);
			}
		}, inde x * 800);
	});
	setTimeout(function(){ document.getElementById("reset").style.visibility="visible";}, 4000)
}
