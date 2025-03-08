export class Node {
    id;
    x;
    y;
    parent;
    children;

    constructor(id, x, y, parent = null, children = []) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.children = children;
    }

    getShallowCopy() {
        const children = [];

        for (const child of this.children) {
            children.push(child.id);
        }

        return {
            id: this.id,
            x: this.x,
            y: this.y,
            parent: this.parent ? this.parent.id : -1,
            children: children
        }
    }

    clone() {
        return new Node(this.x, this.y, this.parent, this.children);
    }

    addChild(node) {
        let included = false;
        for (const child of node.children) {
            if (child.id === node.id)
                included = true;
        }
        if (!included) {
            node.setParent(this);
            this.children.push(node);
        }
    }

    removeChild(node) {
        let included = false;
        for (const child of this.children) {
            if (child.id === node.id)
                included = true;
        }
        if (included) {
            return this.children.splice(this.children.indexOf(node), 1);
        }
    }

    setParent(node) {
        this.parent = node;
    }

    getRootId() {
        if (!this.parent)
            return this.id;
        return this.parent.getRootId();
    }

    hasSubRoot(node) {
        if (!this.parent)
            return this.parent.id === node.id ? true : this.parent.hasSubRoot(node);
        return false;
    }

    hasChild(node) {
        let result = false;

        for (const child of this.children) {
            if (result)
                continue;
            if (node.id === child.id)
                return true;
            result = child.hasChild(node);
        }

        return result;
    }

    hasChildAtPos(pos) {
        let result = false;
        for (const child of this.children) {
            if (child.x === pos.x && child.y === pos.y)
                return true;
            if (!result)
                result = child.hasChildAtPos(pos);
        }
        return result;
    }

    hasPathTo(node) {
        this.setAsRoot();
        return this.hasChild(node);
    }

    getDepth() {
        let result = 1;

        for (const child of this.children) {
            result = Math.max(result, child.getDepth() + 1);
        }

        return result;
    }

    getSize() {
        let size = 1;

        for (const child of this.children) {
            size += child.getSize();
        }

        return size;
    }

    setAsRoot() {
        if (!this.parent)
            return;
        this.parent.setAsRoot();
        this.parent.removeChild(this);
        this.parent.setParent(this);
        this.children.push(this.parent);
        this.parent = null;
    }

    printSubGraph(indent = 0) {
        let outputString = "";
        for (let i = 0; i < indent; i++)
            outputString += ".  ";
        outputString += `|- ${this.id}, pos: (${this.x}, ${this.y})\n`;
        for (let child of this.children) {
            outputString += child.printSubGraph(indent + 1);
        }
        return outputString;
    }

    getSubGraphArray() {
        const output = [];
        output.push(this.getShallowCopy());
        for (const child of this.children) {
            for (const shallowCopy of child.getSubGraphArray()) {
                output.push(shallowCopy);
            }
        }
        return output;
    }

    edgeExists(fromPos, toPos) {
        let result = false;
        if (this.parent && this.x === fromPos.x && this.y === fromPos.y)
            if (this.parent.x === toPos.x && this.parent.y === toPos.y)
                return true;
        for (const child of this.children) {
            if (result)
                return result;
            if (child.x === toPos.x && child.y === toPos.y && this.x === fromPos.x && this.y === fromPos.y)
                return true;
            if (!result)
                result = child.edgeExists(fromPos, toPos);
        }
        return result;
    }

    getBounds(_minX = 0, _minY = 0, _maxX = 0, _maxY = 0) {
        let minX, minY, maxX, maxY;

        minX = Math.min(_minX, this.x);
        minY = Math.min(_minY, this.y);
        maxX = Math.max(_maxX, this.x);
        maxY = Math.max(_maxY, this.y);

        for (const child of this.children) {
            const result = child.getBounds();
            minX = Math.min(result.minX, minX);
            minY = Math.min(result.minY, minY);
            maxX = Math.max(result.maxX, maxX);
            maxY = Math.max(result.maxY, maxY);
        }

        return {
            minX: minX,
            minY: minY,
            maxX: maxX,
            maxY: maxY
        };
    }
}