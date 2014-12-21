<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>Hobocalypse - Game</title>
		<link rel="stylesheet" type="text/css" href="css/reset.css" />
		<link rel="stylesheet" type="text/css" href="css/game.css" />
		<link rel="stylesheet" type="text/css" href="css/screen.css" />
		<script src="scripts/jquery-2.1.1.min.js"></script>
		<script src="scripts/jquery-ui.js"></script>
		<script src="scripts/resourcebox.js"></script>

		<!-- Game related -->
		<!-- melonJS Library -->
		<script src="game/lib/melonJS-2.0.2.js"></script>

		<!-- Plugin(s) -->
		<script type="text/javascript" src="game/lib/plugins/debugPanel.js"></script>
		
		<!-- Game Scripts -->
		<script src="game/game.js"></script>
		<script src="game/resources.js"></script>
		<script src="game/updateUI.js"></script>

		<!-- Game screens -->
		<script src="game/screens/play.js"></script>
		<script src="game/screens/title.js"></script>

		<!-- Player -->
		<script src="game/player/player.js"></script>
		<script src="game/player/experience.js"></script>

		<!-- Game entities -->
		<script src="game/entities/bullet.js"></script>
		<script src="game/entities/Enemy.js"></script>
		<script src="game/entities/PositionEntities.js"></script>
		<script src="game/entities/fontbox.js"></script>

		<!-- Game item system -->
		<script src="game/items/weapons.js"></script>
		<script src="game/items/chestgear.js"></script>
		<script src="game/items/pants.js"></script>
		<script src="game/items/headgear.js"></script>

		<!-- Uncategorized -->
		<script src="game/popups/popup.js"></script>
		<script src="game/levelChange.js"></script>

		<!-- Other important scripts -->
		<script type="text/javascript" src="game/windows/windows.js"></script>
		<script type="text/javascript" src="game/windows/inventory.js"></script>
	</head>
	
	<body>
		<div id="main-center-wrap" class="noselect">
			<div id="top-gamebar">
				<div id="top-gamebar-content">
				<div id="profile-picture">
				</div>

				<div id="experienceBox">
					<span id="playerName">ExampleUser</span>
					<span id="playerLevel"></span>
					<div id="exp"></div>
				</div>
				<ul id="buttons-list">
					<li><a href="#">SETTINGS</a></li>
					<li><a href="#">REPORT</a></li>
					<li><a href="#debug">DEBUG</a></li>
				</ul>
				</div>
			</div>

			<!-- <div id="resourcebox">
				<a id="resource-list-button"><span></span>Resources</a>
				<div id="resources-list">
					<ul>
						<h4>Primary</h4>
						<li style="background-color: #8ad68e;"><p style="background-color: #3bac60; width: 25%;">Food</p></li>
						<li style="background-color: #84dcea;"><p style="background-color: #0084c2; width: 65%;">Water</p></li>
					</ul>

					<ul>
						<h4>Secondary</h4>
						<li style="background-color: #a7bbc5;"><p style="background-color: #587e90; width: 15%;">Metal</p></li>
						<li style="background-color: #d9a384;"><p style="background-color: #a05e35; width: 99%;">Wood</p></li>
						<li style="background-color: #f2f2f2;"><p style="background-color: #abafae; width: 95%;">Cloth</p></li>
					</ul>

				</div>
			</div> -->

			<div id="game-content">
				<div id="inventory">
						<div id="inventory-title"><a><span>&#8672;</span> Inventory</a></div>
						<div id="character-part" class="table">
							<ul id="char-row-1">
								<li id="headgear" class="equipped-item"></li>
							</ul>

							<ul id="char-row-2">
								<li id="primary" class="equipped-item"></li>
								<li id="chestgear" class="equipped-item"></li>
								<li id="secondary" class="equipped-item"></li>
							</ul>

							<ul id="char-row-3">
								<li id="left-acc" class="equipped-item"></li>
								<li id="pants" class="equipped-item"></li>
								<li id="right-acc" class="equipped-item"></li>
							</ul>
						</div>

						<div id="inventory-part">
							<ul class="inv-list">
							<?php
								for ($j=1; $j < 21; $j++) {
									echo "<li class='inventory-item'></li>";
									if ($j%5 == 0) echo "<br />";
								}
							?>
							</ul>
						</div>
					</div>

				<script type="text/javascript">
					window.onReady(function onReady() {
					game.onload();
				});
				</script>
			</div>

			<div id="bottom-gamebar">
				<div id="weapon-picture"><span></span></div>

				<div id="weapon-name">
				</div>

				<ul id="weapon-stats">
				<li>RoF: <span id="rof"></span></li>
				<li>Bul. speed: <span id="bul-spd"></span></li>
				<li>Distance: <span id="distance"></span></li>
				<li>Damage: <span id="damage"></span></li>
				</ul>

				<ul id="big-buttons">
				<li class="sts">STS</li>
				<li class="inv" id="inventory-button">INV</li>
				</ul>
			</div>
		</div>
	</body>
</html>
