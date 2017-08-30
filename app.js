/*
 * Racing cars in javascript
 * author: Ignacio Cartes Wörner
 *
 * Development time: 1h 13min
 */

(function() {
	'use strict';
	
	// Constant
	// There determine how the application will behave
	
	// How many cars will participate
	const NUMBER_OF_CARS = 3;
	
	// Cars colors and names (in order, from top to bottom)
	const CAR_COLORS = ["#df0000", "#0000df", "#00df00"];
	const CAR_NAMES = ["Red", "Blue", "Green"];
	
	// Car sizes (in pixels)
	const CAR_WIDTH = 50;
	const CAR_HEIGHT = 30;
	const CAR_VERTICAL_MARGIN = 10;
	
	// Car acceleration ranges (in pixels/frame^2)
	const CAR_MIN_ACCELERATION = 0.8;
	const CAR_MAX_ACCELERATION = 1.0;
	
	// Car top speeds (in pixels/frame)
	const CAR_MIN_TOPSPEED = 3.75;
	const CAR_MAX_TOPSPEED = 5.5;
	
	// Frames per second
	const FPS = 60;
	
	// Track size
	const TRACK_LENGTH = 500;
	
	
	
	
	
	
	
	// Variables
	var car = [];
	var interval;
	
	/*
	 * Function executed once DOM has fully loaded
	 * Initializes all required DOM elements and variables
	 */
	document.addEventListener("DOMContentLoaded", function(event) {
		
		// Create new car elements
		for (let i = 0; i < NUMBER_OF_CARS; i++) {
			
			// Create one element
			let new_car = document.createElement("div");
			new_car.id = "div-car-" + (i + 1).toString();
			
			// Element properties
			new_car.style.position = 'absolute';
			new_car.style.width = CAR_WIDTH.toString() + "px";
			new_car.style.height = CAR_HEIGHT.toString() + "px";
			
			// Each car positioning is dynamically calculated
			new_car.style.left = "0px";
			new_car.style.top = (((CAR_VERTICAL_MARGIN + CAR_HEIGHT) * i) + CAR_VERTICAL_MARGIN).toString() + "px";
			
			new_car.style.backgroundColor = CAR_COLORS[i];
			
			// Add new car to track div
			document.getElementById("div-track").appendChild(new_car);
			
			// Store car
			car.push({element: new_car});
			
		};
		
		// Define size of track
		let track = document.getElementById("div-track");
		
		// Width is defined by a constant, height is calculated from number of cars and their size
		track.style.width = (TRACK_LENGTH).toString() + "px";
		track.style.height = (((CAR_VERTICAL_MARGIN + CAR_HEIGHT) * NUMBER_OF_CARS) + CAR_VERTICAL_MARGIN).toString() + "px";
		
		// Add listener to "Start Race" button
		document.getElementById("btn-start").addEventListener("click", startRace);
		
	});
	
	
	/*
	 * startRace()
	 *
	 * Called when clicking the "Start Race" button.
	 * Initializes the race logic and creates the main execution loop.
	 */
	function startRace () {
		
		// Initialize cars
		for (let i = 0; i < NUMBER_OF_CARS; i++) {
			
			// Set cars back to their initial position
			car[i].element.style.left = "0px";
			car[i].speed = 0;
			car[i].distance = 0;
			
			// Define random variables to determine cars movement
			car[i].acceleration = (Math.random() * (CAR_MAX_ACCELERATION - CAR_MIN_ACCELERATION)) + CAR_MIN_ACCELERATION;
			car[i].topSpeed = (Math.random() * (CAR_MAX_TOPSPEED - CAR_MIN_TOPSPEED)) + CAR_MIN_TOPSPEED;
			
			console.log(car[i]);
		};

		// Clear result
		document.getElementById("div-result").innerHTML = "";
		
		// Disable race button until its over
		document.getElementById("btn-start").disabled = true;
		
		// Call the main loop, to be executed
		interval = setInterval(raceInterval, 1000 / FPS);
		
	};
	
	
	/*
	 * raceInterval()
	 *
	 * Main execution loop
	 * Moves cars forward, until one of them reaches the goal line, then declares a winner and stops
	 */
	 function raceInterval () {
		 
		 // Loop through both cars
		for (let i = 0; i < NUMBER_OF_CARS; i++) {
			
			// Accelerate car if top speed hasn't been reached yet
			if (car[i].speed < car[i].topSpeed) {
				car[i].speed += car[i].acceleration;
			} else {
				car[i].speed = car[i].topSpeed;
			};
				
			// Move car forward
			car[i].distance += car[i].speed;
			
			// Display car in new position
			car[i].element.style.left = parseInt(car[i].distance).toString() + "px";
			
			// Compare car position to goal
			if (car[i].distance >= (TRACK_LENGTH - CAR_WIDTH)) {
				
				// Create alert message
				document.getElementById("div-result").innerHTML = "Winner: <br/><span style='color: " + CAR_COLORS[i] + ";'>" + CAR_NAMES[i] + "!</span>";
		
				// Re-enable race button
				document.getElementById("btn-start").disabled = false;
				
				// End the loop
				clearInterval(interval);
				
				// Break the loop (in case both cars reach the goal on the same animation frame)
				break;
				
			};
			
			// Randomly decide to change topspeed on cars (to shake things up)
			if (Math.random() > 0.95)
				car[i].topSpeed = (Math.random() * (CAR_MAX_TOPSPEED - CAR_MIN_TOPSPEED)) + CAR_MIN_TOPSPEED;
			
		};
		 
	 };
	
}());












