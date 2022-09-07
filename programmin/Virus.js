let LivingCreature = require('./LivingCreature');

module.exports = class Virus extends LivingCreature {
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
    move() {
        this.getNewCoordinates();
        var found = super.chooseCell(0);
        var exact = found[Math.round(Math.random() * found.length)];
        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
    }
    infect() {
        this.energy--;
        if (this.energy < 0) {
            this.die();
        } else {
            if (Math.random() < 0.4) {
                this.getNewCoordinates();
                var found2 = [super.chooseCell(2), super.chooseCell(3), super.chooseCell(5)];
                if (found2) {
                    var found = found2[Math.round(Math.random() * 3)];
                    if (found) {
                        var exact = found[Math.round(Math.random() * found.length)];
                        if (exact) {
                            let x = exact[0];
                            let y = exact[1];
                            matrix[y][x] = 6;
                            virusArr.push(new Virus(x, y));
                            for (var i in lesArr) {
                                if (x == lesArr[i].x && y == lesArr[i].y) {
                                    lesArr.splice(i, 1);
                                }
                            }
                            for (var i in grassEaterArr) {
                                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                                    grassEaterArr.splice(i, 1);
                                }
                            }
                            for (var i in predatorArr) {
                                if (x == predatorArr[i].x && y == predatorArr[i].y) {
                                    predatorArr.splice(i, 1);
                                }
                            }
                            for (var i in grassAr) {
                                if (x == grassAr[i].x && y == grassAr[i].y) {
                                    grassAr.splice(i, 1);
                                }
                            }
                            
                        } else {
                            this.move();
                        }
                    }
                }
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 4;
        super.del(virusArr);
    }
}