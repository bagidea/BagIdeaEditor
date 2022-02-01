import {
    Mesh,
    MeshPhysicalMaterial as Material
} from "three";

import { CreateGeometry } from './create_geometry'
import { GeometryTypes } from './geometryTypes'

export class CreateMesh {
    static createMesh(type: GeometryTypes, material: Material): Mesh {

        let geometry: any = null
        let name: string = ""

        switch(type) {
            case GeometryTypes.BOX:
                geometry = CreateGeometry.createBox()
                name = "box object"
                break
            case GeometryTypes.CONE:
                geometry = CreateGeometry.createCone()
                name = "cone object"
                break
            case GeometryTypes.CYLINDER:
                geometry = CreateGeometry.createCylinder()
                name = "cylinder object"
                break
            case GeometryTypes.PLANE:
                geometry = CreateGeometry.createPlane()
                name = "plane object"
                break
            case GeometryTypes.SPHERE:
                geometry = CreateGeometry.createSphere()
                name = "sphere object"
                break
            case GeometryTypes.TORUS:
                geometry = CreateGeometry.createTorus()
                name = "torus object"
                break
            case GeometryTypes.TORUS_KNOT:
                geometry = CreateGeometry.createTorusKnot()
                name = "torus knot object"
                break
        }

        if(geometry == null) return null

        const mesh: Mesh = new Mesh(
            geometry,
            material
        )

        mesh.name = name

        return mesh
    }
}