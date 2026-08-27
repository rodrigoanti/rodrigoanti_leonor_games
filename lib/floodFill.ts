function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  const num = parseInt(value, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function matchesTarget(
  data: Uint8ClampedArray,
  index: number,
  target: [number, number, number, number],
  tolerance: number
) {
  return (
    Math.abs(data[index] - target[0]) <= tolerance &&
    Math.abs(data[index + 1] - target[1]) <= tolerance &&
    Math.abs(data[index + 2] - target[2]) <= tolerance &&
    Math.abs(data[index + 3] - target[3]) <= tolerance
  );
}

export function floodFill(
  imageData: ImageData,
  startX: number,
  startY: number,
  fillHex: string,
  tolerance = 32
) {
  const { data, width, height } = imageData;
  const x = Math.floor(startX);
  const y = Math.floor(startY);

  if (x < 0 || y < 0 || x >= width || y >= height) return;

  const startIndex = (y * width + x) * 4;
  const target: [number, number, number, number] = [
    data[startIndex],
    data[startIndex + 1],
    data[startIndex + 2],
    data[startIndex + 3],
  ];
  const fill = hexToRgb(fillHex);

  if (
    Math.abs(target[0] - fill[0]) <= tolerance &&
    Math.abs(target[1] - fill[1]) <= tolerance &&
    Math.abs(target[2] - fill[2]) <= tolerance
  ) {
    return;
  }

  const stack: [number, number][] = [[x, y]];
  const visited = new Uint8Array(width * height);

  while (stack.length > 0) {
    const [px, py] = stack.pop()!;
    const pixelIndex = py * width + px;

    if (visited[pixelIndex]) continue;
    visited[pixelIndex] = 1;

    const dataIndex = pixelIndex * 4;
    if (!matchesTarget(data, dataIndex, target, tolerance)) continue;

    data[dataIndex] = fill[0];
    data[dataIndex + 1] = fill[1];
    data[dataIndex + 2] = fill[2];
    data[dataIndex + 3] = 255;

    if (px > 0) stack.push([px - 1, py]);
    if (px < width - 1) stack.push([px + 1, py]);
    if (py > 0) stack.push([px, py - 1]);
    if (py < height - 1) stack.push([px, py + 1]);
  }
}
