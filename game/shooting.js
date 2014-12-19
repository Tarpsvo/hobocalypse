var BULLET_SPEED = 35;
	FIRING_DELAY = 1000;

var lastShot, angle, bullet, newBullet;
var shooterXY = [], targetXY = [], bullets = [], shooters = [], collIndicators = [];

function shootBullet(event) {

	if (FIRING_DELAY > 10) {
		targetXY = [event.stageX, event.stageY];
		shooterXY = [character.x, character.y];

		angle = calcAngle(shooterXY, targetXY);
		if (getDistance(shooterXY, targetXY) > 100 && angle > 0.6 && angle < 2.2) {
			newBullet = new createjs.Bitmap("../site/templates/img/bullet.png");
			bullets.push({bullet: newBullet, x: event.stageX, y: event.stageY, angle: angle});
			shooters.push({x: character.x, y: character.y});

			newBullet.x = character.x;
			newBullet.y = character.y;

			stage.addChild(newBullet);
		}
	}
}


function calcAngle(shooter, target) {
	return Math.atan2(shooter[0]-target[0], shooter[1]-target[1]);
}


function checkBullets() {
	if (bullets.length !== 0) {
    	for (i = 0; i < bullets.length; i++) {
    		bullet = bullets[i].bullet;

    		bullet.rotation = -bullets[i].angle*(180/Math.PI)+90;
			bullet.x -= BULLET_SPEED * Math.sin(bullets[i].angle);
			bullet.y -= BULLET_SPEED * Math.cos(bullets[i].angle);

			if (outOfBounds(bullet.x, bullet.y)) {
				removeBullet(bullet);
				//console.log("Bullets: "+bullets.length);
			} else {
				checkCollision(bullet);
			}
		}
	}
}

function removeBullet(bullet) {
	var result;
	for (i = 0; i < bullets.length; i++) { 
		if (bullets[i].bullet === bullet) { 
	    	result = i;
	    	break;
	  }
	}
	stage.removeChild(bullets[result].bullet);
	bullets.splice(result, 1);
	shooters.splice(result, 1);
}

function getDistance(shooter, target) {
	var x = shooter[0]-target[0];
	var y = shooter[1]-target[1];
	return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
}

function outOfBounds(x, y) {
	if (x > stage.canvas.width || x < 0 || y > stage.canvas.height || y < 0) return true; else return false;
}


function checkCollision(bullet) {
	if(ndgmr.checkPixelCollision(bullet,enemy, 0, true)) {
		var indicator = new createjs.Shape();
		collIndicators.push(indicator);

		indicator.graphics.beginFill("blue").drawCircle(0, 0, 3);
		indicator.x = bullet.x;
		indicator.y = bullet.y;
		stage.addChild(indicator);
		removeBullet(bullet);
	}
}