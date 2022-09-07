let LivingCreature = require('./LivingCreature');

module.exports = class Les extends LivingCreature {
    constructor(x, y, e) {        
        super(x, y, e);
        this.d = 0;
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
        if (super.becomeInfected(lesArr)) {
            this.getNewCoordinates();
            let found = super.chooseCell(4);
            let exact = found[Math.round(Math.random() * found.length)];
            if (exact) {
                let x = exact[0];
                let y = exact[1];
                matrix[y][x] = 5;
                matrix[this.y][this.x] = 0;
                this.y = y;
                this.x = x;
//                this.energy += 5;
                this.mul();
            } else {
                this.move();
            }
        }
    }
    mul() {
        let found2 = [super.chooseCell(0), super.chooseCell(1)];
        let found = found2[Math.floor(Math.random() * 2)];
        let exact = found[Math.floor(Math.random() * found.length)];

        if (exact) {

            var y = exact[1];
            var x = exact[0];
            for (var i in grassAr) {
                if (this.x == grassAr[i].x && this.y == grassAr[i].y) {
                    grassAr.splice(i, 1);
                }
            }
            matrix[y][x] = 5;
            lesArr.push(new Les(x, y, 10));
            this.energy = 10;
        }
    }
    move() {
        let found2 = [super.chooseCell(0), super.chooseCell(1)];
        let found = found2[Math.floor(Math.random() * 2)];
        let exact = found[Math.floor(Math.random() * found.length)];
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            if (matrix[y][x] == 0) {
                this.d = 0;
            } else if (matrix[y][x] == 1) {
                this.d = 1;
            }
            matrix[y][x] = 5;
            matrix[this.y][this.x] = this.d;
            this.x = x;
            this.y = y;
            this.energy--;
            if (this.energy < 0) {
                this.die();
            }
        } else {
            this.energy--;
        }
    }
    die() {
        super.del(lesArr);
        matrix[this.y][this.x] = 4;
    }
}