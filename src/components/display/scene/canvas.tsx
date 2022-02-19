import {
    Dispatch,
    MutableRefObject,
    SetStateAction
} from 'react'

import {
    MathUtils,
    Object3D
} from 'three'

import {
    Engine,
    SceneChild,
} from '../../../engine'

import { Asset } from '../../../redux/slices/context_3d'

export class SceneCanvas {
    //[x: string]: any
    engine: Engine
    clickTmr: number
    lastSelected: number = -1
    lastSelectedAsset: number = -1
    drag_asset: number = -1
    sceneChildren: SceneChild[] = []
    setMode: Dispatch<SetStateAction<string>>
    setSpace: Dispatch<SetStateAction<string>>
    setSelect: (object: any) => void
    delObject: () => void
    objectChangeDetect: () => void
    addAsset: (asset: Asset) => void
    updatePic: (pic: string) => void
    projectAssets: Asset[]
    setSelectAsset: (asset: Asset) => void
    input_focus: boolean = false

    transformChanged: boolean = false
    //tmr: number = new Date().getTime()

    positionXInput: HTMLInputElement
    positionYInput: HTMLInputElement
    positionZInput: HTMLInputElement

    rotationXInput: HTMLInputElement
    rotationYInput: HTMLInputElement
    rotationZInput: HTMLInputElement

    scaleXInput: HTMLInputElement
    scaleYInput: HTMLInputElement
    scaleZInput: HTMLInputElement


    constructor(
        windowContext: MutableRefObject<HTMLDivElement>,
        canvas: MutableRefObject<HTMLCanvasElement>,
        setMode: Dispatch<SetStateAction<string>>,
        setSpace: Dispatch<SetStateAction<string>>,
        setSelect: (object: any) => void,
        delObject: () => void,
        objectChangeDetect: () => void,
        addAsset: (asset: Asset) => void,
        updatePic: (pic: string) => void,
        setSelectAsset: (asset: Asset) => void
    ) {
        this.engine = new Engine(windowContext.current, canvas.current)
        this.setMode = setMode
        this.setSpace = setSpace
        this.setSelect = setSelect
        this.delObject = delObject
        this.objectChangeDetect = objectChangeDetect
        this.addAsset = addAsset
        this.updatePic = updatePic
        this.setSelectAsset = setSelectAsset

        this.positionXInput = document.getElementById('position_x') as HTMLInputElement
        this.positionYInput = document.getElementById('position_y') as HTMLInputElement
        this.positionZInput = document.getElementById('position_z') as HTMLInputElement

        this.rotationXInput = document.getElementById('rotation_x') as HTMLInputElement
        this.rotationYInput = document.getElementById('rotation_y') as HTMLInputElement
        this.rotationZInput = document.getElementById('rotation_z') as HTMLInputElement

        this.scaleXInput = document.getElementById('scale_x') as HTMLInputElement
        this.scaleYInput = document.getElementById('scale_y') as HTMLInputElement
        this.scaleZInput = document.getElementById('scale_z') as HTMLInputElement
    }

    init() {
        this.engine.setAddAssetFunction(this.addAsset)
        this.engine.init()
        this.engine.addGridHelper()
        this.engine.addControls()
    }

    start() {
        this.engine.addTransformControl()
        this.engine.start()
        this.engine.canvas.addEventListener('pointerdown', this.pointerDown)
        this.engine.canvas.addEventListener('pointerup', this.pointerUp)
        window.addEventListener('keydown', this.keyDown)
        this.engine.transformControl.addEventListener('objectChange', this.objectChange)
    }

    pointerDown = () => {
        this.clickTmr = (new Date()).getTime()
    }

    pointerUp = (e: PointerEvent) => {
        const click: boolean = ((new Date()).getTime()-this.clickTmr) < 150

        if(click) {
            const rect: DOMRect = this.engine.canvas.getBoundingClientRect()
            const mX: number = ((e.clientX - rect.left) / rect.width) * 2 - 1
            const mY: number = -((e.clientY - rect.top) / rect.height) * 2 + 1

            const object = this.engine.intersectObjects(mX, mY)
            this.setSelect(object)
        }

        if(this.transformChanged) {
            this.objectChangeDetect()
            this.transformChanged = false
        }
    }

    setTransformMode(transformation_mode: "translate" | "rotate" | "scale" = "translate") {
        this.engine.transformControl.setMode(transformation_mode)
        this.setMode(transformation_mode)
    }

    setTransformSpace(space: "world" | "local") {
        this.engine.transformControl.setSpace(space)
        this.setSpace(space)
    }

    keyDown = (e: KeyboardEvent) => {
        if(this.input_focus) return
        //console.log("press key: "+e.code)
        switch(e.code) {
            case "KeyQ":
                this.setTransformMode("translate")
                break
            case "KeyW":
                this.setTransformMode("rotate")
                break
            case "KeyE":
                this.setTransformMode("scale")
                break
            case "Space":
                this.setTransformSpace((this.engine.transformControl.space == "world") ? "local" : "world")
                break
            case "Delete":
                if(this.lastSelected != -1) this.delObject()
                break
            /*case "KeyP":
                this.engine.renderer.render(this.engine.scene, this.engine.camera)
                console.log(this.engine.renderer.domElement.toDataURL())
                break*/
        }
    }

    objectChange = () => {
        const obj_selected: Object3D = this.sceneChildren[this.lastSelected]?.object?.object

        if(!!obj_selected) {
            this.positionXInput.value =  obj_selected.position.x.toString()
            this.positionYInput.value =  obj_selected.position.y.toString()
            this.positionZInput.value =  obj_selected.position.z.toString()

            this.rotationXInput.value =  MathUtils.radToDeg(obj_selected.rotation.x).toString()
            this.rotationYInput.value =  MathUtils.radToDeg(obj_selected.rotation.y).toString()
            this.rotationZInput.value =  MathUtils.radToDeg(obj_selected.rotation.z).toString()

            this.scaleXInput.value =  obj_selected.scale.x.toString()
            this.scaleYInput.value =  obj_selected.scale.y.toString()
            this.scaleZInput.value =  obj_selected.scale.z.toString()
        }

        /*const time: number = new Date().getTime()
        if(time-this.tmr >= 300) {
            this.objectChangeDetect()
            this.tmr = time
        }*/

        //this.objectChangeDetect()
        this.transformChanged = true
    }

    selectAsset = (asset: Asset) => {
        this.setSelectAsset(asset)
    }
}