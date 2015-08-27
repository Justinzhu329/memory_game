$(document).ready(function(){
	var chooseCard = 0, turnButtonsOff = 0, play = 0, choice = [];


$.fn.center = function() {
    this.css("position", "fixed");
    this.css("top", ($(window).height()/2 - this.outerHeight()/2) + "px");
    this.css("left", ($(window).width()/2 - this.outerWidth()/2) + "px");
    return this;
}



	// media query change
	function widthChange(mq, index) {
		if (mq.matches) {
			// window width is at least 500px
			$(".memory-game").css("margin-left", index);
			$(".memory-game").css("margin-right", index);
		}
		else {
			// window width is less than 500px
			$(".memory-game").css("margin", "auto");
		}
	}

	// shuffle an array
	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex ;
	 	//While there remain elements to shuffle
	  while (0 !== currentIndex) {
	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;
	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }
	  return array;
	}

	// select difficulty and generate cards
	function chooseLevel() {
		var images = ["img/t9dog2-1.png", "img/t9lion-1.png", "img/t9ratty-1.png", "img/t9tuqui-1.png", "img/t9panda-1.png", "img/t9batty-1.png", "img/t9dog1-1.png", "img/t9kitty-1.png", "img/t9elephant-1.png", "img/t9ducky-1.png", "img/t9froggy-1.png", "img/t9foxy-1.png", "img/t9penguin-1.png"]
		$(".difficulty").show("slide", "slow");


		$(".levels").on("click", "input[type=button]", function(){
			turnButtonsOff++;
			var selectedDif = $(this).val();

			if (turnButtonsOff === 1) {
				$(".difficulty").effect("blind", 400, function(){
				if (selectedDif === "Easy") {
					if (matchMedia) {
						var mq = window.matchMedia("(min-width: 750px)");
						mq.addListener(widthChange);
						widthChange(mq, "25%");
					}

					var level = images.slice(0, 5).concat(images.slice(0,5));
					shuffle(level);

					for (var i = 0; i < 10; i++) {
						var card  = ("<section class='card'>");
							card += ("<div class='front'><img src='img/card-back.jpg'></div>");
							card += ("<div class='back'><img src='" + level[i] + "'></div>")
							card += ("</section>");
						$(".memory-game").append(card);
					}
				} else if (selectedDif === "Medium") {
					if (matchMedia) {
						var mq = window.matchMedia("(min-width: 750px)");
						mq.addListener(widthChange);
						widthChange(mq, "13%");
					}

					var level = images.slice(0, 8).concat(images.slice(0,8));
					shuffle(level);
					for (var i = 0; i < 16; i++) {
						var card  = ("<section class='card'>");
							card += ("<div class='front'><img src='img/card-back.jpg'></div>");
							card += ("<div class='back'><img src='" + level[i] + "'></div>")
							card += ("</section>");
						$(".memory-game").append(card);
					}
					$(".memory-game .card img").css("width", "90px");
				} else if (selectedDif === "Hard") {
					if (matchMedia) {
						var mq = window.matchMedia("(min-width: 750px)");
						mq.addListener(widthChange);
						widthChange(mq, "5%");
					}

					var level = images.concat(images);
					shuffle(level);
					for (var i = 0; i < 26; i++) {
						var card  = ("<section class='card'>");
							card += ("<div class='front'><img src='img/card-back.jpg'></div>");
							card += ("<div class='back'><img src='" + level[i] + "'></div>")
							card += ("</section>");
						$(".memory-game").append(card);
					}
					$(".memory-game .card img").css("width", "85px")
				} else {
					var level = images.concat(images, images, images);
					shuffle(level);
					for (var i = 0; i < 52; i++) {
						var card  = ("<section class='card'>");
							card += ("<div class='front'><img src='img/card-back.jpg'></div>");
							card += ("<div class='back'><img src='" + level[i] + "'></div>")
							card += ("</section>");
						$(".memory-game").append(card);
					}
					$(".memory-game .card img").css("width", "60px");
				}

/*
					setTimeout(function(){ 
						$(".front").toggleClass("flip-front");
						$(".back").toggleClass("flip-back");
					}, 700)
						$(".front").toggleClass("flip-front");
						$(".back").toggleClass("flip-back");

				$(".memory-game").on("doubletap", ".card", flipCards);
				$(".memory-game").on("dblclick", ".card", flipCards);
 */
 				$(".memory-game").on("click", ".card", flipCards);
				turnButtonsOff = 0;
				});
			};
		});
	}
/*
	// highlight cards when clicked
	function highlight() {
		$(".memory-game").on("click", ".card",function(){
			if ($(".card").hasClass("border-effect")) { 
				$(".card").removeClass("border-effect")
			};
			$(this).toggleClass("border-effect")
		})
	}
*/
	function congratMessage() {
		var message = ["Awesome", "Outstanding", "Genius", "Great", "Amazing", "Brilliant", "WoW", "Excellent", "Superb", "Perfect"]
		var effect = ["puff", "explode", "bounce", "blind", "fold", "clip", "drop", "fade", "pulsate", "shake", "slide"]
 		shuffle(message);
  	shuffle(effect);

  	$("body").append('<div class="messagewrap"><span></span><div class="message">' + message[0] + '</div></div>')
		$(".messagewrap").center().show(effect[0], "slow").hide(effect[1], "fast", function(){
			$(this).remove();
		});
	}

	// flip cards animation effect & compare
	function flipCards() {
		var backPicture = $(this).children(".back");

		if ($(this).children(".back").hasClass("flip-back")) {
			console.log("its already flipped!");
		} else if (chooseCard < 2) {
			$(this).children(".back").toggleClass("flip-back").addClass("selected");
			$(this).children(".front").toggleClass("flip-front").addClass("selected");
			choice.push(backPicture.children().attr("src"));
			chooseCard++;

			if (chooseCard === 2) {
				if (choice[0] === choice[1]) {
					congratMessage();
					setTimeout(function(){ 
						//alert("congrats");
						$(".selected").addClass("complete").removeClass("selected");
						chooseCard = 0;
						choice = [];
						var cardsLength = $(".card").length;
						var cardsCompleted = $(".complete").length;
							if (cardsLength === (cardsCompleted / 2)) {
								$("section.card").hide("explode", "slow", function(){
									$(this).remove();
									if (matchMedia) {
										var mq = window.matchMedia("(min-width: 750px)");
										mq.addListener(widthChange);
										widthChange(mq, "0");
									}
									$(".finished").show("shake", "slow");
								});
							}
					}, 600)
				} else {
					setTimeout(function(){ 
						//alert("try again");
						$(".flip-back:not(.complete)").toggleClass("flip-back").removeClass("selected");
						$(".flip-front:not(.complete)").toggleClass("flip-front").removeClass("selected");
						chooseCard = 0;
						choice = [];
					}, 600)
				}
			} 
		} 
	}

	function playAgain() {
		play++;
		if (play === 1) {
			$(".finished").hide("fade", "slow", function(){
				play = 0;
				chooseLevel();
			});
		}
	}


	chooseLevel();
	//highlight();
	$(".memory-game").on("click", ".playagain", playAgain);


});