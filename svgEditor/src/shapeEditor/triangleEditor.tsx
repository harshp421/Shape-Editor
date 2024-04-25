import React from "react";
import NumberEditor from "../components/valueEditor/numberEditor";
import { useDispatch } from "react-redux";
import { formatActiveShape } from "../actions/pages/pages.actions";
import BaseShapeEditor, { EditorProps } from "./baseShapeEditor";
import { TRIANGLE_SHAPE } from "../shapes/triangle";

const TriangleEditor: React.FC<EditorProps> = function ({ shape }) {
  const dispatch = useDispatch();
  const s = shape as TRIANGLE_SHAPE;
  return (
    <>
      <div className="EditorCategoryContainer">
        <div className="editorCategory">Vertices</div>
        {s.points.map((point, idx) => (
          <React.Fragment key={idx}>
            <NumberEditor
              value={point[0]}
              label={`Vertex ${idx + 1} X`}
              onChange={(val) => {
                const newPointsArray = [...s.points];
                newPointsArray[idx] = [val, newPointsArray[idx][1]];
                dispatch(
                  formatActiveShape({
                    id: s.id,
                    properties: { points: newPointsArray },
                  })
                );
              }}
              step={5}
            />
            <NumberEditor
              value={point[1]}
              label={`Vertex ${idx + 1} Y`}
              onChange={(val) => {
                const newPointsArray = [...s.points];
                newPointsArray[idx] = [newPointsArray[idx][0], val];
                dispatch(
                  formatActiveShape({
                    id: s.id,
                    properties: { points: newPointsArray },
                  })
                );
              }}
              step={5}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default BaseShapeEditor(TriangleEditor);
