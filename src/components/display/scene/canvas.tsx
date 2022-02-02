import {
    Dispatch,
    MutableRefObject,
    SetStateAction
} from 'react'

import {
    Engine,
    SceneChild,
} from '../../../engine'

import { Asset } from '../../../redux/slices/context_3d'

export class SceneCanvas {
    [x: string]: any
    engine: Engine
    clickTmr: number
    lastSelected: number = -1
    sceneChildren: SceneChild[] = []
    setMode: Dispatch<SetStateAction<string>>
    setSpace: Dispatch<SetStateAction<string>>
    setSelect: (object: any) => void
    delObject: () => void
    objectChangeDetect: () => void
    addAsset: (asset: Asset) => void

    transformChanged: boolean = false
    //tmr: number = new Date().getTime()

    constructor(
        windowContext: MutableRefObject<HTMLDivElement>,
        canvas: MutableRefObject<HTMLCanvasElement>,
        setMode: Dispatch<SetStateAction<string>>,
        setSpace: Dispatch<SetStateAction<string>>,
        setSelect: (object: any) => void,
        delObject: () => void,
        objectChangeDetect: () => void,
        addAsset: (asset: Asset) => void
    ) {
        this.engine = new Engine(windowContext.current, canvas.current)
        this.setMode = setMode
        this.setSpace = setSpace
        this.setSelect = setSelect
        this.delObject = delObject
        this.objectChangeDetect = objectChangeDetect
        this.addAsset = addAsset
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
        /*const time: number = new Date().getTime()
        if(time-this.tmr >= 300) {
            this.objectChangeDetect()
            this.tmr = time
        }*/

        //this.objectChangeDetect()
        this.transformChanged = true
    }
}