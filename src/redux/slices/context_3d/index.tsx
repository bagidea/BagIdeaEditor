import { createSlice } from '@reduxjs/toolkit'
import { SceneChild } from '../../../engine'
import { SceneCanvas } from '../../../components/display/scene/canvas'
import { TransformValues } from '../../../components/inspector/transform/transform_object'

export interface SelectTransform {
    position: TransformValues,
    rotation: TransformValues,
    scale: TransformValues
}

export interface Asset {
    name: string,
    pic: string,
    type: "texture" | "material" | "model",
    index: number,
    isSelect: boolean
}

interface IContext3D {
    sceneContext: SceneCanvas,
    sceneChildren: SceneChild[],
    selectObject: any,
    selectTransforms: SelectTransform,
    assets: Asset[]
    selectAsset: any
}

const initialState: IContext3D = {
    sceneContext: null,
    sceneChildren: [],
    selectObject: null,
    selectTransforms: null,
    assets: [],
    selectAsset: null
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
            state.sceneChildren.at(action.payload.values.index).isSelect = action.payload.values.isSelect
            //state.sceneChildren[action.payload.values.index].isSelect = action.payload.values.isSelect
        },
        setSelectObject: (state, object) => {
            state.selectObject = object.payload
        },
        setSelectTransform: (state, transform) => {
            state.selectTransforms = transform.payload
        },
        addAsset: (state, asset) => {
            state.assets.push(asset.payload)
        },
        removeAsset: (state, action) => {
            state.assets.splice(action.payload.index, 1)
        },
        setSelectAsset: (state, action) => {
            (state.assets.at(action.payload.values.index) as any).asset.isSelect = action.payload.values.isSelect
            //state.assets[action.payload.values.index].isSelect = action.payload.values.isSelect
        },
        setName: (state, action) => {
            console.log(action.payload)
        }
    }
})

export const {
    setSceneContext,
    addSceneChild,
    removeSceneChild,
    setSceneSelectChild,
    setSelectObject,
    setSelectTransform,
    addAsset,
    removeAsset,
    setSelectAsset,
    setName
} = context3DSlice.actions
export default context3DSlice.reducer