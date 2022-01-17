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
} from '.'

function* context3DSetSceneContext(context: any) {
    yield put(setSceneContext(context))
}

function* context3DAddSceneChild(object: any) {
    yield put(addSceneChild(object))
}

function* context3DRemoveSceneChild(action: any) {
    yield put(removeSceneChild(action))
}

function* context3DSetSceneSelectChild(index: any) {
    yield put(setSceneSelectChild(index))
}

function* context3DSetSelectObject(object: any) {
    yield put(setSelectObject(object))
}

function* context3DSetSelectTransform(transform: any) {
    yield put(setSelectTransform(transform))
}

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

export default function* rootContext3D() {
    yield all([
        watchSetSceneContext(),
        watchAddSceneChild(),
        watchRemoveSceneChild(),
        watchSetSceneSelectChild(),
        watchSetSelectObject(),
        watchSetSelectTransform()
    ])
}