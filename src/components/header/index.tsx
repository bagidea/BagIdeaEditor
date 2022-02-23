import {
    Flex,
    HStack,
    Image as ImageChakra,
    Input,
    useDisclosure
} from '@chakra-ui/react'

import {
    MutableRefObject,
    useRef
} from 'react'

import { useSelector } from 'react-redux'
import { RootState } from '../../redux/reducers'
import { Asset } from '../../redux/slices/context_3d'
import { SceneCanvas } from '../display/scene/canvas'
import PleaseWaiting from '../please_waiting'
import { resizeImage } from '../resize_image'
import AddMenu from './add'
import EditMenu from './edit'
import EffectMenu from './effect'
import FilesMenu from './files'

const Header = () => {
    const load_scene: any = (useSelector((state: RootState) => state.context3DSlice.sceneContext) as any)
    const scene: SceneCanvas = (!!load_scene) ? (load_scene as any).context as SceneCanvas : null

    const { isOpen, onOpen, onClose } = useDisclosure()

    const file_image_loader: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    const fileChange = () => {
        //console.log(file_loader.current.files[0])
        //console.log(file_loader.current.files[0].name)
        //console.log(file_loader.current.files[0].type)

        const reader: FileReader = new FileReader()
        reader.readAsDataURL(file_image_loader.current.files[0])

        onOpen()

        reader.onloadend = () => {
            //console.log(reader.result)
            const img: string = reader.result.toString()

            resizeImage(file_image_loader.current.files[0])
            .then((v: Blob) => {
                const asset: Asset = {
                    name: file_image_loader.current.files[0].name,
                    pic: URL.createObjectURL(v), 
                    type: "texture",
                    index: scene.engine.addTexture(img),
                    isSelect: false
                }

                scene.engine.addAsset(asset)

                onClose()
            })

            /*const asset: Asset = {
                name: file_image_loader.current.files[0].name,
                pic: img, 
                type: "texture",
                index: scene.engine.addTexture(img),
                isSelect: false
            }

            scene.engine.addAsset(asset)
            //console.log(asset.index)

            onClose()*/
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

            <PleaseWaiting isOpen={ isOpen } />

            <HStack spacing="5px">
                <ImageChakra
                    src="/logo.png"
                    h="45px"
                    mx="10px"
                    draggable={ false }
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