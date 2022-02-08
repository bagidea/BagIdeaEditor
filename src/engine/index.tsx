import {
    ACESFilmicToneMapping,
    GridHelper,
    Mesh,
    MeshPhysicalMaterial as Material,
    PerspectiveCamera,
    PMREMGenerator,
    Raycaster,
    Scene,
    Vector2,
    WebGLRenderer,
    WebGLRenderTarget
} from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { ScreenRender } from './screen_render'
import { CreateMesh } from './geometry'
import { GeometryTypes } from './geometry/geometryTypes'
import { Asset } from '../redux/slices/context_3d'

export interface SceneChild {
    name: string,
    isSelect: boolean,
    object: any
}

export class Engine {
    windowContext: HTMLElement
    canvas: HTMLElement
    renderer: WebGLRenderer
    scene: Scene
    camera: PerspectiveCamera

    width: number
    height: number

    gird: GridHelper
    controls: OrbitControls
    transformControl: TransformControls
    raycast: Raycaster

    objects: Mesh[] = []
    materials: Material[] = []

    rgbeLoader: RGBELoader

    screenRender: ScreenRender

    addAsset: (asset: Asset) => void

    constructor(windowContext: HTMLElement, canvas: HTMLElement) {
        this.windowContext = windowContext
        this.canvas = canvas
    }

    init() {
        this.width = this.windowContext.clientWidth
        this.height = this.windowContext.clientHeight

        this.renderer = new WebGLRenderer({
            antialias: true,
            canvas: this.canvas
        })
        this.renderer.setSize(this.width, this.height)
        this.renderer.toneMapping = ACESFilmicToneMapping
        this.renderer.toneMappingExposure = 0.1

        this.scene = new Scene()

        this.camera = new PerspectiveCamera(
            60,
            this.width / this.height,
            0.1,
            100
        )
        this.camera.position.set(0, 2, 5)
        this.camera.lookAt(0, 0, 0)

        this.raycast = new Raycaster()

        const basicMaterial: Material = new Material({
            name: "Default",
            color: 0xffffff,
            roughness: 0.25
        })

        this.materials.push(basicMaterial)
        this.screenRender = new ScreenRender(100, 100)

        this.rgbeLoader = new RGBELoader()
        let pmrem: PMREMGenerator = new PMREMGenerator(this.renderer)
        pmrem.compileEquirectangularShader()
        //this.rgbeLoader.load("/assets/environments/env_night.hdr", i => {
        this.rgbeLoader.load("/assets/environments/env_default.hdr", i => {
            const envMap: WebGLRenderTarget = pmrem.fromEquirectangular(i)
            //i.dispose()
            pmrem.dispose()
            this.scene.environment = envMap.texture
            //this.scene.background = envMap.texture

            this.screenRender.init(i)

            const asset: Asset = {
                name: basicMaterial.name,
                pic: this.screenRender.render(basicMaterial),
                type: "material",
                index: 0,
                isSelect: false
            }

            this.addAsset(asset)
        })

    }

    setAddAssetFunction(
        addAsset: (asset: Asset) => void
    ) {
        this.addAsset = addAsset
    }

    addGridHelper() {
        this.gird = new GridHelper(25, 50, 0x5555ff, 0x555555)
        this.scene.add(this.gird)
    }

    addControls() {
        this.controls = new OrbitControls(this.camera, this.canvas)
    }

    addTransformControl() {
        this.transformControl = new TransformControls(this.camera, this.canvas)
        this.transformControl.setSize(1.5)
        this.scene.add(this.transformControl)

        this.transformControl.addEventListener('dragging-changed', e => {
            if(!!this.controls) this.controls.enabled = !e.value
        })
    }

    addObject(type: GeometryTypes, material: Material = this.materials[0]): Mesh {
        const mesh: Mesh = CreateMesh.createMesh(type, material)
        this.scene.add(mesh)
        this.objects.push(mesh)
        return mesh
    }

    intersectObjects(mX: number, mY: number): any {
        const mouse: Vector2 = new Vector2(mX, mY)
        this.raycast.setFromCamera(mouse, this.camera)
        //const intersection = this.raycast.intersectObjects(this.scene.children, false)
        const intersection = this.raycast.intersectObjects(this.objects, false)
        if(intersection.length > 0) {
            //console.log(intersection)
            this.transformControl.attach(intersection[0].object)
            return intersection[0].object
            //console.log(intersection[0].object.name)
        } else {
            this.transformControl.detach()
            return null
        }
    }

    windowResize = () => {
        this.width = this.windowContext.clientWidth
        this.height = this.windowContext.clientHeight

        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.width, this.height)
    }

    start() {
        this.renderer.setAnimationLoop(this.render)
        window.addEventListener('resize', this.windowResize)
    }

    render = () => {
        if(!!this.controls) this.controls.update()
        this.renderer.render(this.scene, this.camera)
    }
}