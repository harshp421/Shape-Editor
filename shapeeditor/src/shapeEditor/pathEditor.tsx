import React from 'react';
import NumberEditor from '../components/valueEditor/numberEditor';
import { useDispatch } from 'react-redux';
import { formatActiveShape } from '../actions/pages/pages.actions';
import BaseShapeEditor, { EditorProps } from './baseShapeEditor';
import { PATH_SHAPE } from '../shapes/path';

const PathEditor: React.FC<EditorProps> = function ({ shape }) {
    const dispatch = useDispatch();
    const s = shape as PATH_SHAPE;

    // Function to handle changes to the points
    const handlePointChange = (index: number, coord: 'x' | 'y', value: number) => {
        const newPointsArray = [...s.points];
        if (coord === 'x') {
            newPointsArray[index] = [value, newPointsArray[index][1]];
        } else {
            newPointsArray[index] = [newPointsArray[index][0], value];
        }
        dispatch(formatActiveShape({ id: s.id, properties: { points: newPointsArray } }));
    };

    return (
        <>
            <div className='EditorCategoryContainer'>
                <div className='editorCategory'>Coordinates</div>
                {s.points.map((point, idx) => (
                    <React.Fragment key={idx}>
                        <NumberEditor
                            value={point[0]}
                            label={`Point[${idx}] X`}
                            onChange={val => handlePointChange(idx, 'x', val)}
                            step={1}
                        />
                        <NumberEditor
                            value={point[1]}
                            label={`Point[${idx}] Y`}
                            onChange={val => handlePointChange(idx, 'y', val)}
                            step={1}
                        />
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}

export default BaseShapeEditor(PathEditor);
