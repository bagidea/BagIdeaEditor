import {
    all,
    put,
    takeEvery
} from 'redux-saga/effects'

import {
    setSceneContext,
    addSceneChild,
    removeSceneChild,
    setSceneSelectChild,
    setSelectObject,
    setSelectTransform,
    addAsset,
    removeAsset,
    setSelectAsset,
    setName,
    updatePic,
} from '.'

// Actions

function* context3DSetSceneContext(context: any) {
    yield put(setSceneContext(context))
}

function* context3DAddSceneChild(object: any) {
    yield put(addSceneChild(object))
}

function* context3DRemoveSceneChild(action: any) {
    yield put(removeSceneChild(action))
}

function* context3DSetSceneSelectChild(action: any) {
    yield put(setSceneSelectChild(action))
}

function* context3DSetSelectObject(object: any) {
    yield put(setSelectObject(object))
}

function* context3DSetSelectTransform(transform: any) {
    yield put(setSelectTransform(transform))
}

function* context3DAddAsset(asset: any) {
    yield put(addAsset(asset))
}

function* context3DRemoveAsset(action: any) {
    yield put(removeAsset(action))
}

function* context3DSetSelectAsset(action: any) {
    yield put(setSelectAsset(action))
}

function* context3DSetName(action: any) {
    yield put(setName(action))
}

function* context3DUpdatePic(action: any) {
    yield put(updatePic(action))
}

// Watch

function* watchSetSceneContext() {
    yield takeEvery('context_3d@setSceneContext', context3DSetSceneContext)
}

function* watchAddSceneChild() {
    yield takeEvery('context_3d@addSceneChild', context3DAddSceneChild)
}

function* watchRemoveSceneChild() {
    yield takeEvery('context_3d@removeSceneChild', context3DRemoveSceneChild)
}

function* watchSetSceneSelectChild() {
    yield takeEvery('context_3d@setSceneSelectChild', context3DSetSceneSelectChild)
}

function* watchSetSelectObject() {
    yield takeEvery('context_3d@setSelectObject', context3DSetSelectObject)
}

function* watchSetSelectTransform() {
    yield takeEvery('context_3d@setSelectTransform', context3DSetSelectTransform)
}

function* watchAddAsset() {
    yield takeEvery('context_3d@addAsset', context3DAddAsset)
}

function* watchRemoveAsset() {
    yield takeEvery('context_3d@removeAsset', context3DRemoveAsset)
}

function* watchSetSelectAsset() {
    yield takeEvery('context_3d@setSelectAsset', context3DSetSelectAsset)
}

function* watchSetName() {
    yield takeEvery('context_3d@setName', context3DSetName)
}

function* watchUpdatePic() {
    yield takeEvery('context_3d@updatePic', context3DUpdatePic)
}

export default function* rootContext3D() {
    yield all([
        watchSetSceneContext(),
        watchAddSceneChild(),
        watchRemoveSceneChild(),
        watchSetSceneSelectChild(),
        watchSetSelectObject(),
        watchSetSelectTransform(),
        watchAddAsset(),
        watchRemoveAsset(),
        watchSetSelectAsset(),
        watchSetName(),
        watchUpdatePic()
    ])
}