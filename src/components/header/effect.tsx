import {
    Button,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList
} from '@chakra-ui/react'

import { GiAmethyst, GiJusticeStar } from 'react-icons/gi'

const EffectMenu = () => {
    return (
        <Menu>
            <MenuButton
                as={ Button }
                leftIcon={ <GiJusticeStar /> }
                _focus={ { boxShadow: "none" } }
            >
                Effect
            </MenuButton>
            <MenuList>
                <MenuGroup title="- Compositors -">
                    <MenuItem icon={ <GiAmethyst /> }>Depth of Field</MenuItem>
                    <MenuItem icon={ <GiAmethyst /> }>FXAA</MenuItem>
                    <MenuItem icon={ <GiAmethyst /> }>Unreal bloom</MenuItem>
                    <MenuItem icon={ <GiAmethyst /> }>SSAO</MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    )
}

export default EffectMenu