import {
    Flex,
    Image,
    Text,
    VStack
} from "@chakra-ui/react"

/*import {
    Dispatch,
    SetStateAction
} from "react"*/

import { Asset } from "../../../redux/slices/context_3d"
import { SceneCanvas } from "../../display/scene/canvas"

const AssetItem: React.FC<{
        asset: Asset,
        scene: SceneCanvas,
        //lastSelected: number,
        //setSelected: Dispatch<SetStateAction<number>>
    }> = ({ asset, scene, /*lastSelected, setSelected*/ }) =>
{
    const selectAsset = (e: MouseEvent) => {
        e.stopPropagation()
        //setSelected(asset.index)
        scene.selectAsset(asset)
    }

    return (
        <VStack
            margin="5px"
            spacing="5px"
            cursor="pointer"
            onClick={ (e) => selectAsset(e as any) }
        >
            <Flex
                w="100px"
                h="100px"
                bgColor={ asset.isSelect ? "blue.800" : "gray.800" }
                _hover={ { bgColor: asset.isSelect ? "blue.700" : "gray.700" } }
            >
                <Image
                    src={ asset.pic }
                    w="100px"
                    h="100px"
                />
            </Flex>

            <Flex
                w="100px"
                justifyContent="center"
            >
                <Text
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                >{ asset.name }</Text>
            </Flex>
        </VStack>
    )
}

export default AssetItem