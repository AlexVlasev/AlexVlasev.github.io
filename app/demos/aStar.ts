import type p5 from "p5";

import type { Sketch } from "~/components/P5Sketch";

const GRID_SIZE = 70;
const CANVAS_SIZE = 400;
const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;

type GridNode = {
    i: number;
    j: number;
    elevation: number;
    f: number;
    g: number;
    h: number;
    neighbors: GridNode[];
    previous?: GridNode;
};

function climbCost(a: GridNode, b: GridNode) {
    return Math.abs(b.elevation - a.elevation);
}

function straightLineDistance(a: GridNode, b: GridNode) {
    return Math.hypot(a.i - b.i, a.j - b.j);
}

class AStarSearch {
    private openSet: Set<GridNode>;
    private closedSet = new Set<GridNode>();
    private current?: GridNode;
    pathFound = false;

    constructor(
        private start: GridNode,
        private end: GridNode,
    ) {
        this.openSet = new Set([start]);
    }

    get visited() {
        return this.closedSet;
    }

    get frontier() {
        return this.openSet;
    }

    get hasFrontier() {
        return this.openSet.size > 0;
    }

    private nodeWithMinF() {
        let best: GridNode | undefined;
        for (const node of this.openSet) {
            if (!best || node.f < best.f) {
                best = node;
            }
        }
        return best;
    }

    update() {
        const current = this.nodeWithMinF();
        if (!current) return;

        this.current = current;
        if (current === this.end) {
            this.pathFound = true;
        }

        this.openSet.delete(current);
        this.closedSet.add(current);

        for (const neighbor of current.neighbors) {
            if (this.closedSet.has(neighbor)) continue;

            const g = current.g + climbCost(current, neighbor);
            const isNew = !this.openSet.has(neighbor);
            if (isNew || g < neighbor.g) {
                this.openSet.add(neighbor);
                neighbor.g = g;
                neighbor.h = straightLineDistance(neighbor, this.end);
                neighbor.f = neighbor.g + neighbor.h + neighbor.elevation;
                neighbor.previous = current;
            }
        }
    }

    path() {
        const path: GridNode[] = [];
        for (let node = this.current; node; node = node.previous) {
            path.push(node);
        }
        return path;
    }
}

function createGrid(p: p5) {
    p.noiseDetail(8, 0.5);

    const grid: GridNode[][] = [];
    for (let i = 0; i < GRID_SIZE; i++) {
        grid[i] = [];
        for (let j = 0; j < GRID_SIZE; j++) {
            grid[i][j] = {
                i,
                j,
                elevation:
                    100 *
                    p.noise((i * 10) / GRID_SIZE, (j * 10) / GRID_SIZE) ** 4,
                f: 0,
                g: 0,
                h: 0,
                neighbors: [],
            };
        }
    }

    for (const node of grid.flat()) {
        for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
                const neighbor = grid[node.i + di]?.[node.j + dj];
                if (neighbor && neighbor !== node) {
                    node.neighbors.push(neighbor);
                }
            }
        }
    }

    return grid.flat();
}

export const aStarSketch: Sketch = (p) => {
    let nodes: GridNode[];
    let search: AStarSearch;
    let maxElevation: number;

    const drawCell = (node: GridNode) => {
        p.rect(node.i * CELL_SIZE, node.j * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    };

    p.setup = () => {
        p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
        nodes = createGrid(p);
        maxElevation = Math.max(...nodes.map((node) => node.elevation));
        search = new AStarSearch(nodes[0], nodes[nodes.length - 1]);
    };

    p.draw = () => {
        if (search.pathFound) {
            p.noLoop();
        } else if (search.hasFrontier) {
            search.update();
        }

        p.background(0);
        p.noStroke();
        for (const node of nodes) {
            p.fill((255 * node.elevation) / maxElevation);
            drawCell(node);
        }

        p.fill(p.color(0, 255, 0, 30));
        search.visited.forEach(drawCell);
        p.fill(p.color(0, 255, 0, 50));
        search.frontier.forEach(drawCell);

        p.noFill();
        p.stroke(255, 0, 255);
        p.strokeWeight(CELL_SIZE / 2);
        p.beginShape();
        for (const node of search.path()) {
            p.vertex(node.i * CELL_SIZE, node.j * CELL_SIZE);
        }
        p.endShape();
    };
};
