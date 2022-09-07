

module.exports = class LivingCreature {
    constructor(x, y, energy) {
        this.x = x;
        this.y = y;
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
        this.energy = energy;
    }
    chooseCell(char) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                // console.log(matrix);
                if (matrix[y][x] == char) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    del(Arr) {
        for (var i in Arr) {
            if (this.x == Arr[i].x && this.y == Arr[i].y) {
                Arr.splice(i, 1);
            }
        }
    }
    becomeInfected(Arr) {
        let Virus = require('./Virus');
        if (Math.random() * 500 < 1) {
            this.del(Arr);
            matrix[this.y][this.x] = 6;
            virusArr.push(new Virus(this.x, this.y))
            return false;
        } else {
             return true;
        }
    }
}