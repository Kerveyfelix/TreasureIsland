const Postition = require('./position')
const {getMatrixElement} = require('./util')

module.exports = class Graph {
    nodes = [];
    idCounter = 0;
    startingNode;

    static fromMapMatrix(matrix, startingPos) {
        let obj = new Graph();
        obj.startingNode = obj.addFromNode(matrix, startingPos);
        return obj;
    }

    addFromNode(matrix, pos) {
        let existing = null;
        this.nodes.forEach(node => {
            if(node.pos.equals(pos)) {
                existing = node;
            }
        });
        if(existing) {
            return existing;
        }

        let id = this.idCounter++;
        let node = new Node(id);
        node.pos = pos;
        this.nodes[`${id}`] = node;

        let rightPos = pos.right(),
            leftPos = pos.left(),
            downPos = pos.down(),
            upPos = pos.up();

        let right = getMatrixElement(matrix, rightPos.row, rightPos.column),
            left = getMatrixElement(matrix, leftPos.row, leftPos.column),
            up = getMatrixElement(matrix, upPos.row, upPos.column),
            down = getMatrixElement(matrix, downPos.row, downPos.column);

        if(right == 0) {
            let adjNode = this.addFromNode(matrix, rightPos)
            node.addEdge(adjNode)
        }
        if(left == 0) {
            let adjNode = this.addFromNode(matrix, leftPos)
            node.addEdge(adjNode)
        }
        if(up == 0) {
            let adjNode = this.addFromNode(matrix, upPos)
            node.addEdge(adjNode)
        }
        if(down == 0) {
            let adjNode = this.addFromNode(matrix, downPos)
            node.addEdge(adjNode)
        }
        return node;
    }

    toAdjacentsObject() {
        throw new Error("Not Implemented")
    }
}

class Node {
    id;
    pos;
    edges = [];

    constructor(id, pos) {
        this.id = id;
        this.pos = pos;
    }

    addEdge(node) {
        this.edges.push(node.id)
    }
}
