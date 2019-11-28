import * as _ from '@antv/util';
import { Coordinate, getCoordinate } from '../../dependents';
import { BBox } from '../../util/bbox';
import { CoordinateOption } from '../interface';

/**
 * 是否存在 action
 * @param actions
 * @param actionName
 * @returns whether has action
 */
function hasAction(actions, actionName) {
  return _.some(actions, (action) => action[0] === actionName);
}

/**
 * 是够是 Theta 坐标系
 * @param type
 * @returns whether theta
 */
function isTheta(type: string): boolean {
  return type === 'theta';
}
/**
 * 创建坐标系
 * @param coordinateOption
 * @param coordinateBBox
 * @returns [[Coordinate]]
 */
export function createCoordinate(
  coordinateOption: CoordinateOption = {},
  coordinateBBox: BBox = new BBox(0, 0, 0, 0)
): Coordinate {
  const { type = 'rect', cfg, actions = [] } = coordinateOption;

  // 1. 起始位置
  const start = coordinateBBox.bl;
  const end = coordinateBBox.tr;

  const props = {
    start,
    end,
    ...cfg,
  };

  // 2. 创建实例
  const C = getCoordinate(isTheta(type) ? 'polar' : type);

  const coordinate = new C(props);
  // @ts-ignore FIXME coordinate 包问题导致 type 不正确
  coordinate.type = type;

  // 3. 执行 actions
  let coordinateActions = actions;
  if (isTheta(type)) {
    // 不存在 transpose，为其自动设置一个 action
    if (!hasAction(coordinateActions, 'transpose')) {
      coordinateActions = [...coordinateActions, ['transpose']];
    }
  }

  _.each(coordinateActions, (action: any[]) => {
    const [act, ...args] = action;
    coordinate[act](...args);
  });

  return coordinate;
}