import { createSlice } from '@reduxjs/toolkit'
import { SceneChild } from '../../../engine'
import { SceneCanvas } from '../../../components/display/scene/canvas'

interface IContext3D {
    sceneContext: SceneCanvas,
    sceneChildren: SceneChild[]
}

const initialState: IContext3D = {
    sceneContext: null,
    sceneChildren: []
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
        removeSceneChild: (state, object) => {
            state.sceneChildren.splice(state.sceneChildren.findIndex(object.payload), 1)
        },
        setSceneSelectChild: (state, action) => {
            state.sceneChildren[action.payload.values.index].isSelect = action.payload.values.isSelect
        }
    }
})

export const {
    setSceneContext,
    addSceneChild,
    removeSceneChild,
    setSceneSelectChild
} = context3DSlice.actions
export default context3DSlice.reducer