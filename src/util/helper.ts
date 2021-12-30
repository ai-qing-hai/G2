import { isArray, isString, find, values, isEqual, get } from '@antv/util';
import type { Scale } from '../dependents';
import type Geometry from '../geometry/base';

/**
 * @ignore
 * Determines whether between is
 * @param value
 * @param start
 * @param end
 * @returns true if between
 */
export function isBetween(value: number, start: number, end: number): boolean {
  const min = Math.min(start, end);
  const max = Math.max(start, end);

  return value >= min && value <= max;
}

/**
 * @ignore
 * pads the current string/array with a given value (repeated, if needed) so that the resulting reaches a given length.
 * The padding is applied from the end of the current value.
 *
 * @param source
 * @param targetLength
 * @param padValue
 * @returns
 */
export function padEnd(source: string | any[], targetLength: number, padValue: any) {
  if (isString(source)) {
    return source.padEnd(targetLength, padValue);
  } else if (isArray(source)) {
    const sourceLength = source.length;
    if (sourceLength < targetLength) {
      const diff = targetLength - sourceLength;
      for (let i = 0; i < diff; i++) {
        source.push(padValue);
      }
    }
  }

  return source;
}

/**
 * @ignore
 * omit keys of an object.
 * @param obj
 * @param keys
 */
export function omit<T = any>(obj: T, keys: string[]): T {
  if (typeof obj === 'object') {
    keys.forEach((key: string) => {
      delete obj[key];
    });
  }

  return obj;
}

/**
 * @ignore
 * @param sourceArray
 * @param targetArray
 * @param map
 */
export function uniq(sourceArray: any[], targetArray: any[] = [], map: Map<any, boolean> = new Map()) {
  for (const source of sourceArray) {
    if (!map.has(source)) {
      targetArray.push(source);
      map.set(source, true);
    }
  }
  return targetArray;
}

/**
 * @ignore
 * Interval whether there is a continuous numerical type of classification scale, and obtain it
 * @param geometry: Geometry
 * @returns { false | Scale }
 */
export function getLinearIntervalScale(geometry: Geometry): false | Scale {
  const scales = values(geometry.scales);
  const colorScale = get(geometry, 'attributes.color.scales.0');
  return geometry.type === 'interval' && colorScale?.isLinear && find(scales, scale => scale.isLinear && !isEqual(scale, colorScale));
}
