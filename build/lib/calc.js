export const deg2rad = Math.PI / 180;
export const tangent = Math.tan(45 * deg2rad);
export function linearInterpolate(x1, y1, x2, y2, x) {
  console.log(y1);
  if (x1 === x2)
    return y1;
  const w = (x - x1) / (x2 - x1);
  if (Array.isArray(y1)) {
    return y1.map((y12, i) => y12 * (1 - w) + y2[i] * w);
  }
  return y1 * (1 - w) + y2 * w;
}
export function sampleAt(xs, ys, targetXs) {
  const descOrder = xs[0] > xs[1];
  return targetXs.map((tx) => {
    let index = xs.findIndex((x) => descOrder ? x <= tx : x >= tx);
    if (index === -1) {
      index = xs.length - 1;
    } else if (index === 0) {
      index = 1;
    }
    return linearInterpolate(xs[index - 1], ys[index - 1], xs[index], ys[index], tx);
  });
}
export function firstIntersection(x1s, y1s, x2s, y2s) {
  const min = Math.max(x1s[0], x2s[0]);
  const max = Math.min(x1s[x1s.length - 1], x2s[x2s.length - 1]);
  const xs = Array.from(new Set([...x1s, ...x2s])).filter((x) => x >= min && x <= max).sort((a, b) => Number(a) > Number(b) ? 1 : -1);
  const iy1s = sampleAt(x1s, y1s, xs);
  const iy2s = sampleAt(x2s, y2s, xs);
  for (let index = 0; index < xs.length - 1; index++) {
    const y11 = iy1s[index];
    const y21 = iy2s[index];
    const x1 = xs[index];
    if (y11 === y21) {
      return [x1, y11];
    }
    const y12 = iy1s[index + 1];
    const y22 = iy2s[index + 1];
    if (Math.sign(y21 - y11) !== Math.sign(y22 - y12)) {
      const x2 = xs[index + 1];
      const width = x2 - x1;
      const slope1 = (y12 - y11) / width;
      const slope2 = (y22 - y21) / width;
      const dx = (y21 - y11) / (slope1 - slope2);
      const dy = dx * slope1;
      return [x1 + dx, y11 + dy];
    }
  }
  return null;
}
export function scaleLinear(from, to) {
  const scale = (v) => sampleAt(from, to, [v])[0];
  scale.invert = (v) => sampleAt(to, from, [v])[0];
  return scale;
}
export function scaleLog(from, to) {
  from = from.map(Math.log);
  const scale = (v) => sampleAt(from, to, [Math.log(v)])[0];
  scale.invert = (v) => Math.exp(sampleAt(to, from, [v])[0]);
  return scale;
}
export const line = (x, y) => (d) => {
  const points = d.map((v) => x(v).toFixed(1) + "," + y(v).toFixed(1));
  return "M" + points.join("L");
};
export const lerp = (v0, v1, weight) => v0 + weight * (v1 - v0);
export const zip = (a0, a1) => a0.map((v, i) => [v, a1[i]]);
