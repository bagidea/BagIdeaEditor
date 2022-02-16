import {
    Flex,
    HStack,
    Image,
    Input,
    Text
} from '@chakra-ui/react'

import {
    MutableRefObject,
    useRef
} from 'react'

import { GiAbstract027 } from 'react-icons/gi'
import AddMenu from './add'
import EditMenu from './edit'
import EffectMenu from './effect'
import FilesMenu from './files'

const Header = () => {
    const file_image_loader: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    const fileChange = () => {
        //console.log(file_loader.current.files[0])
        //console.log(file_loader.current.files[0].name)
        //console.log(file_loader.current.files[0].type)
        const reader: FileReader = new FileReader()
        reader.readAsDataURL(file_image_loader.current.files[0])

        reader.onloadend = () => {
            //console.log(reader.result)
        }
    }

    return (
        <Flex
            w="100vw"
            h="60px"
            alignItems="center"
            padding="10px"
            bgColor="gray.900"
        >
            <Input
                type="file"
                hidden={ true }
                accept="image/jpeg, image/png"
                onChange={ fileChange }
                ref={ file_image_loader }
            />
            <HStack spacing="5px">
                <Image
                    src="/logo.png"
                    h="45px"
                    mx="10px"
                />

                <FilesMenu file_loader={ file_image_loader } />
                <EditMenu />
                <AddMenu />
                <EffectMenu />
            </HStack>
        </Flex>
    )
}

export default Header