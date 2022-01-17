import {
    Flex,
    HStack,
    Text,
    VStack
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

import { ImEqualizer } from "react-icons/im"
import { useDispatch, useSelector } from "react-redux"
import { SceneChild } from "../../engine"
import { RootState } from "../../redux/reducers"
import { SceneCanvas } from "../display/scene/canvas"
import Transform from "./transform"

const Inspector = () => {
    const { sceneContext } = useSelector((state: RootState) => state.context3DSlice)
    const scene: SceneCanvas = sceneContext?.context
    const children: SceneChild[] = useSelector((state: RootState) => state.context3DSlice.sceneChildren)

    const [isTransform, setTransform] = useState(false)

    useEffect(() => {
        let is_trans: boolean = false

        if(!!scene) is_trans = scene.lastSelected != -1 ? true : false
        else is_trans = false

        setTransform(is_trans)
    }, [children])

    return (
        <Flex
            minW="350px"
            h="full"
            bgColor="gray.900"
        >
            <VStack
                w="full"
                spacing="3px"
            >
                <Flex
                    w="full"
                    h="50px"
                    bgColor="purple.800"
                    alignItems="center"
                    flexWrap="wrap"
                    pl="10px"
                >
                    <HStack>
                        <ImEqualizer size="20px" />

                        <Text
                            fontSize="20px"
                        >Inspector</Text>
                    </HStack>
                </Flex>

                <Transform isSelect={ isTransform }/>
            </VStack>
        </Flex>
    )
}

export default Inspector