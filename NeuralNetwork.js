function sigmoid(x){
    return 1 / (1 + Math.exp(-x))
}

function dsig(x){
    return sigmoid(x) * (1 - sigmoid(x))
}

class NeuralNetwork{
    constructor(ins, hiddens, outs, lr=0.1) {
        this.input_nodes = ins;
        this.hidden_nodes = hiddens;
        this.outs = outs;
        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weights_ho = new Matrix(this.outs, this.hidden_nodes);
        this.weights_ho.randomize();
        this.weights_ih.randomize();
        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_o = new Matrix(this.outs, 1);
        this.bias_h.randomize()
        this.bias_o.randomize()
        this.lr = lr
    }

    feedForward(inputs){
        //Do Something
        inputs = Matrix.fromArray(inputs);
        let hidden = Matrix.matmul(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);
        let output = Matrix.matmul(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);
        return output.toArray();
    }

    train(inputs, answers){

        inputs = Matrix.fromArray(inputs);
        let hidden = Matrix.matmul(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        hidden.map(sigmoid);
        let output = Matrix.matmul(this.weights_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        answers = Matrix.fromArray(answers)
        let errors = Matrix.substract(answers, output)
        console.log("The Total Error: " + errors.matrix+ " The Model Predicted: "+ output.matrix)
        let hidden_weight_transposed = Matrix.transpose(this.weights_ho)

        let d_output = output
        d_output.map(dsig)
        d_output.multiply(errors)
        d_output.multiply(this.lr)
        let delta_weight_h = Matrix.matmul(d_output, Matrix.transpose(hidden))


        Matrix.substract(this.weights_ho, delta_weight_h).print()

        let hidden_errors = Matrix.matmul(hidden_weight_transposed, errors)
        
    }

}