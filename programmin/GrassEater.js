let LivingCreature = require('./LivingCreature');

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x, y, 15);
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
    chooseCell(char) {
        this.getNewCoordinates();
        return super.chooseCell(char);
    }
    mul() {
        let found = super.chooseCell(0);
        let exact = found[Math.round(Math.random() * found.length)];
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            let eater = new GrassEater(x, y);
            matrix[y][x] = 2;
            grassEaterArr.push(eater);
            this.energy = 15;
        }
    }
    eat() {
        if (super.becomeInfected(grassEaterArr)) {
            let found = super.chooseCell(1);
            let exact = found[Math.round(Math.random() * found.length)];;
            if (exact) {
                this.energy += 3;
                let x = exact[0];
                let y = exact[1];
                for (var i in grassAr) {
                    if (x == grassAr[i].x && y == grassAr[i].y) {
                        grassAr.splice(i, 1);
                    }
                }
                matrix[y][x] = 2;
                matrix[this.y][this.x] = 0;
                this.x = x;
                this.y = y;

                if (this.energy > 25) {
                    this.mul();
                }
            } else {
                this.move();
            }
        }
    }
    move() {
        let found = this.chooseCell(0);
        let exact = found[Math.round(Math.random() * found.length)];
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy < 0) {
                this.die();
            }
        } else {
            this.energy--;
            if (this.energy < 0) {
                this.die();
            }
        }
    }
    die() {
        super.del(grassEaterArr);
        matrix[this.y][this.x] = 4;
    }
}