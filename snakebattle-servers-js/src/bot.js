/*-
 * #%L
 * Codenjoy - it's a dojo-like platform from developers to developers.
 * %%
 * Copyright (C) 2018 - 2019 Codenjoy
 * %%
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public
 * License along with this program.  If not, see
 * <http://www.gnu.org/licenses/gpl-3.0.html>.
 * #L%
 */
import { ELEMENT, COMMANDS } from './constants';
import {
  isGameOver, getHeadPosition, getElementByXY
} from './utils';

let lastIndex = 0;
let snakeLength = 0;
// Bot Example
export function getNextSnakeMove(board, logger) {
    if (isGameOver(board)) {
        return '';
    }
    const headPosition = getHeadPosition(board);
    if (!headPosition) {
        return '';
    }
    logger('Head:' + JSON.stringify(headPosition));

    snakeLength = getSnakeLength(board);
    logger('Length:' + snakeLength);

    //const sorround = getSorround(board, headPosition); // (LEFT, UP, RIGHT, DOWN)
    //logger('Sorround: ' + JSON.stringify(sorround));

    //const raitings = sorround.map(rateElement);
    //logger('Raitings:' + JSON.stringify(raitings));

    const mySolution = getMySolution(board, headPosition);
    logger('getMySolution:' + JSON.stringify(mySolution));
    if (!mySolution) {
        console.log('UPC');
    }
    // const command = getCommandByRaitings(raitings);

    return mySolution;
}

const againstLastIndex = [2, 3, 0, 1];
const indexCommand = ['LEFT', 'UP', 'RIGHT', 'DOWN'];
const direction = [
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 }
];
const getDirection = (pos, mult, index) => {
    return {
        x: pos.x + direction[index].x * mult,
        y: pos.y +  + direction[index].y * mult
    };
}

function getMySolution(board, headPosition) {
    const sorroundPosition = getSorroundPosition(headPosition);
    const indexes = [againstLastIndex[lastIndex]];
    const maxFree = [0, 0, 0, 0];

    let maxRateIndex = -1;
    let isMore = false;
    for (let i = 0; i < 20; i++) {
        for (const index in sorroundPosition) {
            if (!indexes.includes(index)) {
                const position = getDirection(sorroundPosition[index], i, index);
                const el = getElementByXY(board, position);
                const rate = simpleRateElement(el, index);
                if (maxRateIndex === -1 && rate >=0) {
                    maxRateIndex = index;
                }
                if (rate > 0) {
                    maxRateIndex = index;
                    isMore = true;
                }
                if (rate < 0) {
                    indexes.push(index);
                } else {
                    maxFree[index]++;
                }
            }
        }
        if (isMore) {
            lastIndex = maxRateIndex;
            return indexCommand[maxRateIndex];
        }
    }
    const position = sorroundPosition[lastIndex];
    const el = getElementByXY(board, position);
    const rate = simpleRateElement(el);
    if (rate >= 0) return indexCommand[lastIndex];
    maxRateIndex = maxFree.reduce((res, n, i, arr) => arr[res] > n ? res : i, 0);
    lastIndex = maxRateIndex;
    return indexCommand[maxRateIndex];
}

function simpleRateElement(element, index) {
    if (element === ELEMENT.NONE) {
        return 0;
    }
    if (element === ELEMENT.APPLE) {
        return 2;
    }
    if (element === ELEMENT.GOLD) {
        return 4;
    }
    if (
        element === ELEMENT.FLYING_PILL ||
        element === ELEMENT.FURY_PILL
    ) {
        return 0.5;
    }

    if (element === ELEMENT.STONE && snakeLength > 4) {
        return 6;
    }
    return -10;
}

function getSorroundPosition(p) {
    return [
        { x: p.x - 1, y: p.y }, // LEFT
        { x: p.x, y: p.y -1 }, // UP
        { x: p.x + 1, y: p.y }, // RIGHT
        { x: p.x, y: p.y + 1 } // DOWN
    ];
}

const mySnakeElements = [
    ELEMENT.HEAD_DOWN,
    ELEMENT.HEAD_LEFT,
    ELEMENT.HEAD_RIGHT,
    ELEMENT.HEAD_UP,
    ELEMENT.HEAD_DEAD,
    ELEMENT.HEAD_EVIL,
    ELEMENT.HEAD_FLY,
    ELEMENT.HEAD_SLEEP,
    ELEMENT.TAIL_END_DOWN,
    ELEMENT.TAIL_END_LEFT,
    ELEMENT.TAIL_END_UP,
    ELEMENT.TAIL_END_RIGHT,
    ELEMENT.TAIL_INACTIVE,
    ELEMENT.BODY_HORIZONTAL,
    ELEMENT.BODY_VERTICAL,
    ELEMENT.BODY_LEFT_DOWN,
    ELEMENT.BODY_LEFT_UP,
    ELEMENT.BODY_RIGHT_DOWN,
    ELEMENT.BODY_RIGHT_UP
];

function getSnakeLength(board) {
    return (board.match(new RegExp(mySnakeElements.join('|'), 'g')) || []).length;
}

function getSorround(board, position) {
    const p = position;
    return [
        getElementByXY(board, { x: p.x - 1, y: p.y }), // LEFT
        getElementByXY(board, { x: p.x, y: p.y -1 }), // UP
        getElementByXY(board, { x: p.x + 1, y: p.y}), // RIGHT
        getElementByXY(board, { x: p.x, y: p.y + 1 }) // DOWN
    ];
}

function rateElement(element, index) {
    if (element === ELEMENT.NONE) {
        if (index === lastIndex) return 0.5;
        if (index === 2) return 0.1;
        if (index === 1) return 0.2;
        if (index === 3) return 0.3;
        return 0;
    }
    if (element === ELEMENT.APPLE) {
        return 2;
    }
    if (element === ELEMENT.GOLD) {
        return 4;
    }
    if (
        element === ELEMENT.FLYING_PILL ||
        element === ELEMENT.FURY_PILL
    ) {
        return 0.5;
    }

    if (element === ELEMENT.STONE && snakeLength > 4) {
        return 6;
    }

    return -10;
}


function getCommandByRaitings(raitings) {
    var indexToCommand = ['LEFT', 'UP', 'RIGHT', 'DOWN'];
    var maxIndex = 0;
    var max = -Infinity;
    for (var i = 0; i < raitings.length; i++) {
        var r = raitings[i];
        if (r > max) {
            maxIndex = i;
            max = r;
        }
    }
    lastIndex = maxIndex;
    return indexToCommand[maxIndex];
}
