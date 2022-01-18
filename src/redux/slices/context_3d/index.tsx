import { createSlice } from '@reduxjs/toolkit'
import { SceneChild } from '../../../engine'
import { SceneCanvas } from '../../../components/display/scene/canvas'
import { TransformValues } from '../../../components/inspector/transform/transform_object'

export interface SelectTransform {
    position: TransformValues,
    rotation: TransformValues,
    scale: TransformValues
}

interface IContext3D {
    sceneContext: SceneCanvas,
    sceneChildren: SceneChild[],
    selectObject: any,
    selectTransforms: SelectTransform
}

const initialState: IContext3D = {
    sceneContext: null,
    sceneChildren: [],
    selectObject: null,
    selectTransforms: null
}

const context3DSlice = createSlice({
    name: "context_3d",
    initialState,
    reducers: {
        setSceneContext: (state, context) => {
            state.sceneContext = context.payload
        },
        addSceneChild: (state, object) => {
            state.sceneChildren.push(object.payload)
        },
        removeSceneChild: (state, action) => {
            state.sceneChildren.splice(action.payload.index, 1)
        },
        setSceneSelectChild: (state, action) => {
            state.sceneChildren[action.payload.values.index].isSelect = action.payload.values.isSelect
        },
        setSelectObject: (state, object) => {
            state.selectObject = object.payload
        },
        setSelectTransform: (state, transform) => {
            state.selectTransforms = transform.payload
        }
    }
})

export const {
    setSceneContext,
    addSceneChild,
    removeSceneChild,
    setSceneSelectChild,
    setSelectObject,
    setSelectTransform
} = context3DSlice.actions
export default context3DSlice.reducer