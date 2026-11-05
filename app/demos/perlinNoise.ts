import type { Sketch } from "~/components/P5Sketch";

const SAMPLES = 35;
const SQUARE_SIZE = 30;
const TERRAIN_HEIGHT = 100;
const NOISE_SCALE = 150;

type Rgb = [number, number, number];

type TerrainPalette = {
    sky: Rgb;
    near: Rgb;
    // How much higher ground is lightened and lower ground darkened, to bring out ridges.
    ridgeShading: number;
};

type TerrainOptions = {
    speed: number;
    palette: () => TerrainPalette;
    canvasHeight: (host: HTMLElement) => number;
    pixelDensity?: number;
};

function createTerrainSketch({
    speed,
    palette,
    canvasHeight,
    pixelDensity,
}: TerrainOptions): Sketch {
    return (p, host) => {
        let xPosition = 0;
        let yPosition = 0;
        let angle = 0;

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
            if (pixelDensity) {
                p.pixelDensity(pixelDensity);
            }
            p.createCanvas(host.clientWidth, canvasHeight(host), p.WEBGL);
            setUpCamera();
        };

        p.draw = () => {
            if (p.mouseX !== p.pmouseX) {
                angle += (p.mouseX - p.pmouseX) / 100;
            }

            xPosition += speed * Math.cos(angle);
            yPosition += speed * Math.sin(angle);

            const { sky, near, ridgeShading } = palette();
            const maxDistanceSquared = (SAMPLES * SQUARE_SIZE) ** 2;

            p.rotateX(Math.PI / 3);
            p.rotateZ(-Math.PI / 2 - angle);
            p.background(...sky);
            p.noStroke();
            p.translate(-xPosition, -yPosition);

            const xStart = Math.floor(xPosition / SQUARE_SIZE) * SQUARE_SIZE;
            const yStart = Math.floor(yPosition / SQUARE_SIZE) * SQUARE_SIZE;

            // Squares fade into the sky with distance, hiding terrain as it appears.
            for (let row = -SAMPLES; row < SAMPLES - 1; row++) {
                p.beginShape(p.TRIANGLE_STRIP);
                for (let column = -SAMPLES; column < SAMPLES; column++) {
                    if (column ** 2 + row ** 2 < SAMPLES ** 2) {
                        const x = xStart + column * SQUARE_SIZE;
                        const y = yStart + row * SQUARE_SIZE;
                        const fade =
                            ((x - xPosition) ** 2 + (y - yPosition) ** 2) /
                            maxDistanceSquared;
                        const addVertex = (vertexY: number) => {
                            const height = terrainHeight(x, vertexY);
                            const shade =
                                1 +
                                ridgeShading * (height / TERRAIN_HEIGHT - 0.5);
                            p.fill(
                                near[0] * shade +
                                    (sky[0] - near[0] * shade) * fade,
                                near[1] * shade +
                                    (sky[1] - near[1] * shade) * fade,
                                near[2] * shade +
                                    (sky[2] - near[2] * shade) * fade,
                            );
                            p.vertex(x, vertexY, height);
                        };
                        addVertex(y);
                        addVertex(y + SQUARE_SIZE);
                    }
                }
                p.endShape();
            }
        };

        p.windowResized = () => {
            p.resizeCanvas(host.clientWidth, canvasHeight(host));
            setUpCamera();
        };
    };
}

export const perlinNoiseSketch = createTerrainSketch({
    speed: 2,
    palette: () => ({
        sky: [180, 180, 180],
        near: [40, 40, 40],
        ridgeShading: 0,
    }),
    canvasHeight: () => (window.innerHeight * 2) / 3,
});

function hexToRgb(hex: string): Rgb {
    const value = parseInt(hex.trim().slice(1), 16);
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

// The sky matches the page background, so the canvas has no visible edge in either theme.
function themePalette(): TerrainPalette {
    const styles = getComputedStyle(document.documentElement);
    return {
        sky: hexToRgb(styles.getPropertyValue("--color-bg")),
        near: hexToRgb(styles.getPropertyValue("--color-terrain")),
        ridgeShading: Number(
            styles.getPropertyValue("--terrain-ridge-shading"),
        ),
    };
}

export const backgroundTerrainSketch = createTerrainSketch({
    speed: 1,
    palette: themePalette,
    canvasHeight: (host) => host.clientHeight,
    pixelDensity: 1,
});
