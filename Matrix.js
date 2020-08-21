class Matrix{
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];
        this.shape = [this.cols, this.matrix]
        for(let i = 0; i < this.rows; i++){
            this.matrix[i] = [];
            for(let c = 0; c < this.cols; c++){
                this.matrix[i][c] = 0;
            }
        }
    }

    multiply(n){
        if(n instanceof Matrix){
            for(let i =0; i < this.rows; i++){
                for(let c = 0; c <this.cols; c++){
                    this.matrix[i][c] *= n.matrix[i][c]
                }
            }
        } else {
            for(let i =0; i < this.rows; i++){
                for(let c = 0; c <this.cols; c++){
                    this.matrix[i][c] *= n
                }
            }
        }
    }

    randomize(){
        for(let i = 0; i < this.rows; i ++){
            for(let k = 0; k < this.cols; k ++){
                this.matrix[i][k] = (Math.random() * (1))
            }
        }
    }
    
    add(n){
        if(n instanceof Matrix){

            if(this.rows !== n.rows && this.cols !== n.cols){
                console.log("Columns and rows must match of A and B.")
                return;
            } else {
                for(let i =0; i < this.rows; i++){
                    for(let c = 0; c <this.cols; c++){
                        this.matrix[i][c] += n.matrix[i][c]
                    }
                }
            }

        } else {
            for(let i =0; i < this.rows; i++){
                for(let c = 0; c <this.cols; c++){
                    this.matrix[i][c] += n
                }
            }
        }
    }
    
    static substract(a, b){
        // Return A - B
        var newMatrix = new Matrix(a.rows, a.cols)
        for(let i = 0; i < a.rows; i ++){
            for(let k = 0; k < a.cols; k++){
                newMatrix.matrix[i][k] = a.matrix[i][k] - b.matrix[i][k]
            }
        }
        return newMatrix;
    }
    
    divide(n){
        if(n instanceof Matrix){
            for(let i =0; i < this.rows; i++){
                for(let c = 0; c <this.cols; c++){
                    this.matrix[i][c] = this.matrix[i][c] / n.matrix[i][c]
                }
            }
        } else {
            for(let i =0; i < this.rows; i++){
                for(let c = 0; c <this.cols; c++){
                    this.matrix[i][c] = this.matrix[i][c] / n
                }
            }
        }
    }

    static matmul(a, b){
        if(a instanceof Matrix && a instanceof Matrix){
            var newMatrix = new Matrix(a.rows, b.cols)
            for(let i = 0; i < newMatrix.rows; i++){
                for(let k = 0; k < newMatrix.cols; k++){
                    var sum = 0;
                    for(let x = 0; x < a.cols; x++){
                        sum += a.matrix[i][x] * b.matrix[x][k]
                    }
                    newMatrix.matrix[i][k] = sum;
                }
            }
            return newMatrix;
        } else {
            return null
        }
    }

    static transpose(a){
        if(a instanceof Matrix){
            var newMatrix = new Matrix(a.cols, a.rows)
            for(let i = 0; i < a.rows; i++){
                for(let k = 0; k < a.cols; k ++){
                    newMatrix.matrix[k][i] = a.matrix[i][k]
                }
            }
            return newMatrix
        } else {
            return null
        }
    }
    
    static fromArray(arran){
        var arr = new Matrix(arran.length, 1)

        for(let i = 0; i < arran.length; i++){
            arr.matrix[i][0] = arran[i]
        }
        return arr
    }

    map(func){
        for(let i = 0; i < this.rows; i++){
            for(let k = 0; k < this.cols; k ++){
                this.matrix[i][k] = func(this.matrix[i][k])
            }
        }
    }

    toArray(){
        let array = []
        for(let i = 0; i < this.rows; i++){
            for(let k = 0; k < this.cols; k++){
                array.push(this.matrix[i][k])
            }
        }
        return array;
    }

    print(){
        console.table(this.matrix)
    }
}