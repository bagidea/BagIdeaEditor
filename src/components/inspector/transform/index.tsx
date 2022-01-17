import {
    Flex,
    HStack,
    Text,
    VStack
} from "@chakra-ui/react"

import TransformObject, { TransformValues } from "./transform_object"
import React, { useState } from "react"
import { BsDot } from "react-icons/bs"
import { MathUtils, Object3D } from "three"

const Transform: React.FC<{ isSelect: boolean, object: any }> = ({ isSelect, object }) => {
    /*const [position, setPositon] = useState({ x: 0, y: 0, z: 0 })
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 })
    const [scale, setScale] = useState({ x: 1, y: 1, z: 1 })*/

    /*if(!!object) {
        const obj: any = object
        if(obj.isSelect && isSelect) {
            const _obj: Object3D = obj.object.object

            //console.log(_obj.position)
            //console.log(_obj.rotation)
            //console.log(_obj.scale)

            //setPositon({
            //    x: _obj.position.x,
            //    y: _obj.position.y,
            //    z: _obj.position.z
            //})
        }
    }*/

    const obj: any = (!!object) ? object.object.object : null
    const objNull: TransformValues = { x: 0, y: 0, z: 0 }

    return (
        <Flex
            display={ isSelect ? "flex" : "none" }
            w="full"
            h="50px"
            padding="3px"
        >
            <VStack
                w="full"
                spacing="0px"
            >
                <Flex
                    w="full"
                    h="full"
                    alignItems="center"
                    padding="10px"
                    bgColor="gray.700"
                >
                    <HStack>
                        <BsDot />

                        <Text
                            fontSize="16px"
                            color="gray.200"
                        >Transform</Text>
                    </HStack>
                </Flex>

                <VStack
                    w="full"
                    spacing="0px"
                    bgColor="gray.800"
                >
                    <TransformObject text="position" values={
                        !!obj ? {
                            x: obj.position.x,
                            y: obj.position.y,
                            z: obj.position.z
                        } : objNull
                    } />
                    <TransformObject text="rotation" values={
                        !!obj ? {
                            x: MathUtils.radToDeg(obj.rotation.x),
                            y: MathUtils.radToDeg(obj.rotation.y),
                            z: MathUtils.radToDeg(obj.rotation.z)
                        } : objNull }
                    />
                    <TransformObject text="scale" values={
                        !!obj ? {
                            x: obj.scale.x,
                            y: obj.scale.y,
                            z: obj.scale.z
                        } : objNull }
                    />
                </VStack>
            </VStack>
        </Flex>
    )
}

export default Transform