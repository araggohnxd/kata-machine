const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
];

/*
 * Base cases:
 * 1. Out of bounds
 * 2. In a wall
 * 3. At the end
 * 4. Already visited
 *
 * Recurse cases:
 * - Pre recursion
 * - Recursion
 * - Post recursion
 */
function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
): boolean {
    // BC.1
    if (
        curr.x < 0 ||
        curr.x > maze[0].length ||
        curr.y < 0 ||
        curr.y > maze.length
    ) {
        return false;
    }

    // BC.2
    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    // BC.3
    if (curr.x === end.x && curr.y === end.y) {
        path.push(curr);
        return true;
    }

    // BC.4
    if (seen[curr.y][curr.x]) {
        return false;
    }

    // Pre recursion
    seen[curr.y][curr.x] = true;
    path.push(curr);

    // Recursion
    for (let i = 0; i < directions.length; ++i) {
        const [x, y] = directions[i];

        if (
            walk(maze, wall, { x: curr.x + x, y: curr.y + y }, end, seen, path)
        ) {
            return true;
        }
    }

    // Post recursion
    path.pop();
    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; ++i) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}
