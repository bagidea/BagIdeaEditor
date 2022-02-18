import {
    Box,
    Flex,
    Image,
    Text,
    useBoolean,
    VStack
} from "@chakra-ui/react"

/*import {
    Dispatch,
    SetStateAction
} from "react"*/

import { Asset } from "../../../redux/slices/context_3d"
import { SceneCanvas } from "../../display/scene/canvas"
import Draggable from "react-draggable"
import { useState } from "react"

const AssetItem: React.FC<{
        asset: Asset,
        scene: SceneCanvas,
        checkSelect: () => void,
        //lastSelected: number,
        //setSelected: Dispatch<SetStateAction<number>>
    }> = ({ asset, scene, checkSelect, /*lastSelected, setSelected*/ }) =>
{
    const [is_drag, setDrag] = useBoolean(false)
    const [is_out, setOut] = useBoolean(false)
    const [top_value, setTopValue] = useState("0px")
    const [left_value, setLeftValue] = useState("0px")

    const selectAsset = (e: MouseEvent) => {
        e.stopPropagation()
        //setSelected(asset.index)
        checkSelect()
        scene.selectAsset(asset)
    }

    const onDragAsset = (e: MouseEvent) => {
        setDrag.on()
    }

    const onDraggable = (e: MouseEvent) => {
        setLeftValue((e.clientX - 40)+"px")
        setTopValue((e.clientY + 5)+"px")
    }

    const offDragAsset = () => {
        setDrag.off()
    }

    return (
        <VStack
            margin="5px"
            spacing="5px"
            cursor="pointer"
            onClick={ (e) => selectAsset(e as any) }
        >
            <Flex
                position={ is_drag ? "static" : "relative" }
                w="100px"
                h="100px"
                bgColor={ asset.isSelect ? "blue.800" : "gray.800" }
                boxShadow={ asset.isSelect ? "dark-lg" : "base" }
                _hover={ { bgColor: asset.isSelect ? "blue.700" : "gray.700" } }
            >
                <Image
                    src={ asset.pic }
                    w="100px"
                    h="100px"
                    draggable={ false }
                    onMouseEnter={ setOut.off }
                    onMouseLeave={ setOut.on }
                />

                <Draggable
                    position={ { x: 0, y: 0 } }
                    onStart={ onDragAsset }
                    onDrag={ onDraggable }
                    onStop={ offDragAsset }
                >
                    <Box
                        position="absolute"
                        w="100px"
                        h="100px"
                        top="0px"
                        left="0px"
                        pointerEvents={ is_drag ? "none" : "auto" }
                    />
                </Draggable>

                <Box
                    hidden={ !is_drag || !is_out }
                    position="absolute"
                    w="40px"
                    h="40px"
                    top={ top_value }
                    left={ left_value }
                    bgImage={ asset.pic }
                    backgroundSize="contain"
                    userSelect="none"
                    pointerEvents="none"
                />
            </Flex>

            <Flex
                w="100px"
                justifyContent="center"
            >
                <Text
                    color={ asset.isSelect ? "blue.400" : "white" }
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                >{ asset.name }</Text>
            </Flex>
        </VStack>
    )
}

export default AssetItem