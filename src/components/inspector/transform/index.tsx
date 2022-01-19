import {
    Flex,
    HStack,
    Text,
    VStack
} from '@chakra-ui/react'

import TransformObject, { TransformValues } from './transform_object'
import React , { useEffect } from 'react'
import { BsDot } from 'react-icons/bs'
import { MathUtils } from 'three'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers'
import { SelectTransform } from '../../../redux/slices/context_3d'

const Transform: React.FC<{ isSelect: boolean }> = ({ isSelect }) => {
    const object: any = useSelector((state: RootState) => state.context3DSlice.selectObject)
    const obj: any = object?.object?.object?.object
    const objNull: TransformValues = { x: 0, y: 0, z: 0 }
    const trans: any = useSelector((state: RootState) => state.context3DSlice.selectTransforms)
    const dispatch = useDispatch()

    useEffect(() => {
        //console.log(obj)
        if(!!obj) {
            const transform: SelectTransform = {
                position: {
                    x: obj.position.x,
                    y: obj.position.y,
                    z: obj.position.z
                },
                rotation: {
                    x: obj.rotation.x,
                    y: obj.rotation.y,
                    z: obj.rotation.z
                },
                scale: {
                    x: obj.scale.x,
                    y: obj.scale.y,
                    z: obj.scale.z
                }
            }

            if(!!obj) {
                dispatch({
                    type: "context_3d@setSelectTransform",
                    transform
                })
            }
        }
    }, [object])

    /*useEffect(() => {
        console.log(trans)
    }, [trans])*/

    return (
        <Flex
            display={ isSelect ? "flex" : "none" }
            w="full"
            padding="3px"
            pt="0px"
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
                        !!trans ? {
                            x: trans.transform.position.x,
                            y: trans.transform.position.y,
                            z: trans.transform.position.z
                        } : objNull
                    } />
                    <TransformObject text="rotation" values={
                        !!trans ? {
                            x: MathUtils.radToDeg(trans.transform.rotation.x),
                            y: MathUtils.radToDeg(trans.transform.rotation.y),
                            z: MathUtils.radToDeg(trans.transform.rotation.z)
                        } : objNull }
                    />
                    <TransformObject text="scale" values={
                        !!trans ? {
                            x: trans.transform.scale.x,
                            y: trans.transform.scale.y,
                            z: trans.transform.scale.z
                        } : objNull }
                    />
                </VStack>
            </VStack>
        </Flex>
    )
}

export default Transform