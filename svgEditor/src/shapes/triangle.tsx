import React, { useState, useLayoutEffect, useRef } from 'react';
import BaseTool, { BASE_SHAPE, getBaseToolDefaultProps, WRAPPED_SHAPE_PROPS } from "./baseShapes";
import { getBoundingRectMidPoint, getStyleObj } from "../utils/utils";
import { SHAPE_TYPES } from "../utils/constant";

interface TRIANGLE {
    points: [[number, number], [number, number], [number, number]];
};

export interface TRIANGLE_SHAPE extends BASE_SHAPE, TRIANGLE { };
export const getTriangleDefaultProps: (points: [[number, number], [number, number], [number, number]]) => TRIANGLE_SHAPE = (points) => {
    const defaultTriangleProps: TRIANGLE_SHAPE = {
        ...getBaseToolDefaultProps({ x: 0, y: 0, type: SHAPE_TYPES.TRIANGLE }),
        points  // Use the points provided as argument
    };
    return defaultTriangleProps;
}


const Triangle: React.FC<WRAPPED_SHAPE_PROPS> = function (props) {
    const shape = props.shape as TRIANGLE_SHAPE;
    const [midPoint, setMidPoint] = useState({ x: 0, y: 0 });
    const ref = useRef<SVGPolygonElement>(null);

    useLayoutEffect(function () {
        setMidPoint(getBoundingRectMidPoint(ref.current?.getBBox()));
    }, [shape.points]);
    const pointsString = shape.points.map(point => point.join(',')).join(' ');

    return (
        <polygon
            id={shape.id}
            onMouseDown={props.mouseDownHandler}
            onMouseUp={props.mouseUpHandler}
            onMouseEnter={props.mouseEnterHandler}
            onMouseLeave={props.mouseLeaveHandler}
            className={props.hovered || props.isActive ? 'active' : 'inactive'}
            {...getStyleObj(shape.style)}
            points={pointsString}
            transform-origin={`${midPoint.x} ${midPoint.y}`}
            ref={ref}
        />
    );
}

export default BaseTool(Triangle);
