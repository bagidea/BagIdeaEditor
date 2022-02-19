import {
    Button,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList
} from '@chakra-ui/react'

import {
    AiFillDelete,
    AiFillEdit,
    AiOutlineClear
} from 'react-icons/ai'

import {
    FaCopy,
    FaPaste,
    FaRedoAlt,
    FaUndoAlt
} from 'react-icons/fa'

import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { SceneCanvas } from '../display/scene/canvas'

const EditMenu = () => {
    const load_scene: any = (useSelector((state: RootState) => state.context3DSlice.sceneContext) as any)
    const scene: SceneCanvas = (!!load_scene) ? (load_scene as any).context as SceneCanvas : null

    return (
        <Menu>
            <MenuButton
                as={ Button }
                leftIcon={ <AiFillEdit /> }
                _focus={ { boxShadow: "none" } }
            >
                Edit
            </MenuButton>
            <MenuList>
                <MenuGroup title="- History -">
                    <MenuItem
                        icon={ <FaUndoAlt /> }
                        command="Ctrl + Z"
                    >Undo</MenuItem>
                    <MenuItem
                        icon={ <FaRedoAlt /> }
                        command="Ctrl + Y"
                    >Redo</MenuItem>
                    <MenuItem icon={ <AiOutlineClear /> }>Clear history</MenuItem>
                </MenuGroup>
                <MenuGroup title="- Manage -">
                    <MenuItem
                        icon={ <FaCopy /> }
                        command="Ctrl + C"
                    >Copy</MenuItem>
                    <MenuItem
                        icon={ <FaPaste /> }
                        command="Ctrl + V"
                    >Paste</MenuItem>
                    <MenuItem
                        icon={ <AiFillDelete /> }
                        command="Del"
                        onClick={ () => scene.delObject() }
                    >Delete</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}

export default EditMenu