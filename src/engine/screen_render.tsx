import {
    ACESFilmicToneMapping,
    Mesh,
    MeshPhysicalMaterial,
    PerspectiveCamera,
    PMREMGenerator,
    Scene,
    SphereGeometry,
    Texture,
    WebGLRenderer,
    WebGLRenderTarget
} from 'three'

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export class ScreenRender {
    renderer: WebGLRenderer
    scene: Scene
    camera: PerspectiveCamera
    ball: Mesh

    rgbeLoader: RGBELoader

    width: number
    height: number

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
    }

    init(i: Texture) {
        this.renderer = new WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setSize(this.width, this.height)
        this.renderer.toneMapping = ACESFilmicToneMapping
        this.renderer.toneMappingExposure = 0.1

        this.scene = new Scene()

        this.camera = new PerspectiveCamera(60, this.width / this.height, 0.01, 2)
        this.camera.position.set(0, 0, -2)
        this.camera.lookAt(0, 0, 0)

        this.ball = new Mesh(
            new SphereGeometry(1, 32, 16),
            new MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.25 })
        )

        this.scene.add(this.ball)

        //this.renderer.render(this.scene, this.camera)
        //console.log(this.renderer.domElement.toDataURL())

        this.rgbeLoader = new RGBELoader()
        let pmrem: PMREMGenerator = new PMREMGenerator(this.renderer)
        pmrem.compileEquirectangularShader()
        //this.rgbeLoader.load("/assets/environments/env_night.hdr", i => {
        /*this.rgbeLoader.load("/assets/environments/env_default.hdr", i => {
            const envMap: WebGLRenderTarget = pmrem.fromEquirectangular(i)
            i.dispose()
            pmrem.dispose()
            this.scene.environment = envMap.texture
            //this.scene.background = envMap.texture

            this.renderer.setClearColor(0x000000, 0)
            this.renderer.render(this.scene, this.camera)
            console.log(this.renderer.domElement.toDataURL())
        })*/

        const envMap: WebGLRenderTarget = pmrem.fromEquirectangular(i)
        i.dispose()
        pmrem.dispose()
        this.scene.environment = envMap.texture
    }

    render(material: MeshPhysicalMaterial) {
        this.ball.material = material
        this.renderer.setClearColor(0x000000, 0)
        this.renderer.render(this.scene, this.camera)
        console.log(this.renderer.domElement.toDataURL())
    }
}