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
import { Mesh } from 'three'

const AddMenu = () => {
    const { sceneContext } = useSelector((state: RootState) => state.context3DSlice)
    const engine: Engine = sceneContext?.context.engine
    const dispatch = useDispatch()

    const addChild = (type: GeometryTypes) => {
        const mesh: Mesh = engine.addObject(type)

        const object: SceneChild = {
            name: mesh.name,
            isSelect: false,
            object: mesh
        }

        dispatch({
            type: "context_3d@addSceneChild",
            object: object
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