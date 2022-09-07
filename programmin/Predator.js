let LivingCreature = require('./LivingCreature');

module.exports = class Predator extends LivingCreature {
    constructor(x, y) {
        super(x, y, 10);
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    eat() {
        if (super.becomeInfected(predatorArr)) {
            this.getNewCoordinates();
            let found = super.chooseCell(1);
            let found2 = super.chooseCell(2);
            for (var i in found2) {
                found.push(found2[i])
            }
            let exact = found[Math.round(Math.random() * found.length)];;
            if (exact) {
                let x = exact[0];
                let y = exact[1];
                for (var i in grassAr) {
                    if (x == grassAr[i].x && y == grassAr[i].y) {
                        grassAr.splice(i, 1);
                        this.energy += 2
                    }
                }
                for (var i in grassEaterArr) {
                    if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        this.energy += 10
                    }
                }

                matrix[y][x] = 3;
                matrix[this.y][this.x] = 0;
                this.y = y;
                this.x = x;
                if (this.energy > 25) {
                    this.mul();
                }
            } else {
                this.move();
            }
        }
    }
    mul() {
        var found = super.chooseCell(0);
        var rand = found[Math.round(Math.random() * found.length)];
        if (rand) {
            var y = rand[1];
            var x = rand[0];
            matrix[y][x] = 3;
            predatorArr.push(new Predator(x, y));
            this.energy = 10;
        }
    }
    move() {
        this.energy--;
        let found = super.chooseCell(0);
        let exact = found[Math.round(Math.random() * found.length)];
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            if (this.energy < 0) {
                this.die();
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 4;
        super.del(predatorArr);
    }
}