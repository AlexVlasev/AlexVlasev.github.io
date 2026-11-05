import type { Sketch } from "~/components/P5Sketch";

const SPEED = 2;
const SAMPLES = 35;
const SQUARE_SIZE = 30;
const TERRAIN_HEIGHT = 100;
const NOISE_SCALE = 150;

export const perlinNoiseSketch: Sketch = (p, host) => {
    let xPosition = 0;
    let yPosition = 0;
    let angle = 0;

    const canvasHeight = () => (window.innerHeight * 2) / 3;

    const terrainHeight = (x: number, y: number) => {
        const xSample = x / NOISE_SCALE;
        const ySample = y / NOISE_SCALE;
        return p.noise(xSample + ySample / 2, ySample) * TERRAIN_HEIGHT;
    };

    // A wide 60 degree lens, close up. p5's newer default camera flattens the view of the terrain.
    const setUpCamera = () => {
        const fieldOfView = Math.PI / 3;
        const distance = p.height / 2 / Math.tan(fieldOfView / 2);
        p.perspective(
            fieldOfView,
            p.width / p.height,
            distance / 10,
            distance * 10,
        );
        p.camera(0, 0, distance, 0, 0, 0, 0, 1, 0);
    };

    p.setup = () => {
        p.createCanvas(host.clientWidth, canvasHeight(), p.WEBGL);
        setUpCamera();
    };

    p.draw = () => {
        if (p.mouseX !== p.pmouseX) {
            angle += (p.mouseX - p.pmouseX) / 100;
        }

        xPosition += SPEED * Math.cos(angle);
        yPosition += SPEED * Math.sin(angle);

        p.rotateX(Math.PI / 3);
        p.rotateZ(-Math.PI / 2 - angle);
        p.background(180);
        p.noStroke();
        p.translate(-xPosition, -yPosition);

        const xStart = Math.floor(xPosition / SQUARE_SIZE) * SQUARE_SIZE;
        const yStart = Math.floor(yPosition / SQUARE_SIZE) * SQUARE_SIZE;

        // Squares fade into the background with distance, hiding terrain as it appears.
        for (let row = -SAMPLES; row < SAMPLES - 1; row++) {
            p.beginShape(p.TRIANGLE_STRIP);
            for (let column = -SAMPLES; column < SAMPLES; column++) {
                if (column ** 2 + row ** 2 < SAMPLES ** 2) {
                    const x = xStart + column * SQUARE_SIZE;
                    const y = yStart + row * SQUARE_SIZE;
                    const distanceSquared =
                        (x - xPosition) ** 2 + (y - yPosition) ** 2;
                    p.fill(
                        p.map(
                            distanceSquared,
                            0,
                            (SAMPLES * SQUARE_SIZE) ** 2,
                            40,
                            180,
                        ),
                    );
                    p.vertex(x, y, terrainHeight(x, y));
                    p.vertex(
                        x,
                        y + SQUARE_SIZE,
                        terrainHeight(x, y + SQUARE_SIZE),
                    );
                }
            }
            p.endShape();
        }
    };

    p.windowResized = () => {
        p.resizeCanvas(host.clientWidth, canvasHeight());
        setUpCamera();
    };
};
