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
} from '.'

function* context3DSetSceneContext(context: any) {
    yield put(setSceneContext(context))
}

function* context3DAddSceneChild(object: any) {
    yield put(addSceneChild(object))
}

function* context3DRemoveSceneChild(object: any) {
    yield put(removeSceneChild(object))
}

function* context3DSetSceneSelectChild(index: any) {
    yield put(setSceneSelectChild(index))
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

export default function* rootContext3D() {
    yield all([
        watchSetSceneContext(),
        watchAddSceneChild(),
        watchRemoveSceneChild(),
        watchSetSceneSelectChild()
    ])
}