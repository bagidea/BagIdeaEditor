import {
    Button,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList
} from '@chakra-ui/react'

import {
    AiFillFileAdd,
    AiFillFolderOpen,
    AiFillProfile,
    AiFillSave
} from 'react-icons/ai'

import { BsDot } from 'react-icons/bs'

const FilesMenu = () => {
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
                    <MenuItem icon={ <BsDot /> }>GLTF/GLB</MenuItem>
                    <MenuItem icon={ <BsDot /> }>FBX</MenuItem>
                    <MenuItem icon={ <BsDot /> }>HDR</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}

export default FilesMenu