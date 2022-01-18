import {
    Button,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList
} from '@chakra-ui/react'

import {
    BsDot,
    BsFillCameraReelsFill,
    BsFillLightbulbFill
} from 'react-icons/bs'

import {
    useDispatch,
    useSelector
} from 'react-redux'

import {
    Engine,
    SceneChild
} from '../../engine'

import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { RootState } from '../../redux/reducers'
import { GeometryTypes } from '../../engine/geometry/geometryTypes'
import { SelectTransform } from '../../redux/slices/context_3d'
import { Mesh } from 'three'

const AddMenu = () => {
    const { sceneContext } = useSelector((state: RootState) => state.context3DSlice)
    const engine: Engine = sceneContext?.context.engine
    const dispatch = useDispatch()

    const sendToStore = (obj: any) => {
        const transform: SelectTransform = {
            position: {
                x: obj.position.x,
                y: obj.position.y,
                z: obj.position.z
            },
            rotation: {
                x: obj.rotation.x,
                y: obj.rotation.y,
                z: obj.rotation.z
            },
            scale: {
                x: obj.scale.x,
                y: obj.scale.y,
                z: obj.scale.z
            }
        }

        if(!!obj) {
            dispatch({
                type: "context_3d@setSelectTransform",
                transform
            })
        }
    }

    const onSelectChild = (index: number, value: boolean) => {
        dispatch({
            type: "context_3d@setSceneSelectChild",
            values: {
                index: index,
                isSelect: value
            }
        })
    }

    const addChild = (type: GeometryTypes) => {
        const mesh: Mesh = engine.addObject(type)

        const object: SceneChild = {
            name: mesh.name,
            isSelect: false,
            object: mesh
        }

        if(sceneContext.context.lastSelected != -1) {
            engine.transformControl.detach()

            onSelectChild(sceneContext.context.lastSelected, false)

            dispatch({
                type: "context_3d@setSelectObject",
                object: null
            })
        }
        engine.transformControl.attach(mesh)
        sceneContext.context.lastSelected = sceneContext.context.sceneChildren.length
        sendToStore(mesh)

        dispatch({
            type: "context_3d@addSceneChild",
            object: object
        })

        onSelectChild(sceneContext.context.sceneChildren.length, true)

        dispatch({
            type: "context_3d@setSelectObject",
            object: mesh
        })
    }

    return (
        <Menu>
            <MenuButton
                as={ Button }
                leftIcon={ <AiOutlineAppstoreAdd /> }
                _focus={ { boxShadow: "none" } }
            >
                Add
            </MenuButton>
            <MenuList>
                <MenuGroup title="- Objects -">
                    <MenuItem icon={ <BsDot /> } onClick={ () => addChild(GeometryTypes.BOX) }>Box</MenuItem>
                    <MenuItem icon={ <BsDot /> } onClick={ () => addChild(GeometryTypes.CONE) }>Cone</MenuItem>
                    <MenuItem icon={ <BsDot /> } onClick={ () => addChild(GeometryTypes.CYLINDER) }>Cylinder</MenuItem>
                    <MenuItem icon={ <BsDot /> } onClick={ () => addChild(GeometryTypes.PLANE) }>Plane</MenuItem>
                    <MenuItem icon={ <BsDot /> } onClick={ () => addChild(GeometryTypes.SPHERE) }>Sphere</MenuItem>
                    <MenuItem icon={ <BsDot /> } onClick={ () => addChild(GeometryTypes.TORUS) }>Torus</MenuItem>
                    <MenuItem icon={ <BsDot /> } onClick={ () => addChild(GeometryTypes.TORUS_KNOT) }>TonusKnot</MenuItem>
                </MenuGroup>
                <MenuGroup title="- Lights -">
                    <MenuItem icon={ <BsFillLightbulbFill /> }>Ambient</MenuItem>
                    <MenuItem icon={ <BsFillLightbulbFill /> }>Directional</MenuItem>
                    <MenuItem icon={ <BsFillLightbulbFill /> }>Hemisphere</MenuItem>
                    <MenuItem icon={ <BsFillLightbulbFill /> }>Point</MenuItem>
                    <MenuItem icon={ <BsFillLightbulbFill /> }>Spot</MenuItem>
                </MenuGroup>
                <MenuGroup title="- Camera -">
                    <MenuItem icon={ <BsFillCameraReelsFill /> }>Perspective</MenuItem>
                    <MenuItem icon={ <BsFillCameraReelsFill /> }>Orthographic</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}

export default AddMenu