export function findIntervalIndex(number: number, layers: any[]) {
  for (let i = 0; i < layers.length; i++) {
    const [start, end] = layers[i].split("-").map(Number);

    if (start <= number && (end >= number || isNaN(end))) {
      return i;
    }
  }

  // Return -1 if the number doesn't fit into any interval
  return -1;
}
