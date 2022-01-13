import {
    BoxGeometry,
    ConeGeometry,
    CylinderGeometry,
    PlaneGeometry,
    SphereGeometry,
    TorusGeometry,
    TorusKnotGeometry
} from 'three'

export class CreateGeometry {
    static createBox(): BoxGeometry { return new BoxGeometry(1, 1, 1) }
    static createCone(): ConeGeometry { return new ConeGeometry(0.5, 1, 32, 4) }
    static createCylinder(): CylinderGeometry { return new CylinderGeometry(0.5, 0.5, 1, 32, 4) }
    static createPlane(): PlaneGeometry { return new PlaneGeometry(1, 1) }
    static createSphere(): SphereGeometry { return new SphereGeometry(0.5, 32, 16) }
    static createTorus():TorusGeometry { return new TorusGeometry(0.5, 0.2, 32, 32) }
    static createTorusKnot(): TorusKnotGeometry { return new TorusKnotGeometry(0.5, 0.2, 128, 16) }
}