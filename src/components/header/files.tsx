import {
    Button,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList
} from '@chakra-ui/react'
import { MutableRefObject } from 'react'

import {
    AiFillFileAdd,
    AiFillFolderOpen,
    AiFillProfile,
    AiFillSave
} from 'react-icons/ai'

import { BsDot } from 'react-icons/bs'

const FilesMenu: React.FC<{ file_loader: MutableRefObject<HTMLInputElement> }> = ({ file_loader }) => {
    return (
        <Menu>
            <MenuButton
                as={ Button }
                leftIcon={ <AiFillProfile /> }
                _focus={ { boxShadow: "none" } }
            >
                Files
            </MenuButton>
            <MenuList>
                <MenuGroup title="- Scenes -">
                    <MenuItem
                        icon={ <AiFillFileAdd /> }
                        command="Ctrl + N"
                    >New scene</MenuItem>
                    <MenuItem
                        icon={ <AiFillFolderOpen /> }
                        command="Ctrl + O"
                    >Open scene...</MenuItem>
                    <MenuItem
                        icon={ <AiFillSave /> }
                        command="Ctrl + S"
                    >Save scene</MenuItem>
                </MenuGroup>
                <MenuGroup title="- Imports -">
                    <MenuItem
                        icon={ <BsDot /> }
                        onClick={ () => file_loader.current.click() }
                    >Image JPEG/PNG</MenuItem>

                    <MenuItem icon={ <BsDot /> }>Model GLTF/GLB</MenuItem>
                    <MenuItem icon={ <BsDot /> }>Environment HDR</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}

export default FilesMenu