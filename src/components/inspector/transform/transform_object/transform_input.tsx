import {
    HStack,
    Input,
    Text
} from '@chakra-ui/react'
import { BaseSyntheticEvent, MutableRefObject, useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { MathUtils } from 'three'
import { RootState } from '../../../../redux/reducers'
import { SelectTransform } from '../../../../redux/slices/context_3d'

const TransformInput: React.FC<{ text: string, type_input: string, value: number }> = ({ text, value, type_input }) => {
    const object: any = useSelector((state: RootState) => state.context3DSlice.selectObject)
    const obj: any = object?.object?.object?.object
    const dispatch = useDispatch()

    const [_value, setValue] = useState(value)
    const value_input: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    const sendToStore = () => {
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

    const updateTransform = (e: BaseSyntheticEvent) => {
        //console.log(type_input)
        const pos: number = e.target.value
        setValue(pos)

        switch(type_input) {
            case "position_x":
                obj.position.x = pos
                break
            case "position_y":
                obj.position.y = pos
                break
            case "position_z":
                obj.position.z = pos
                break
            case "rotation_x":
                obj.rotation.x = MathUtils.degToRad(pos)
                break
            case "rotation_y":
                obj.rotation.y = MathUtils.degToRad(pos)
                break
            case "rotation_z":
                obj.rotation.z = MathUtils.degToRad(pos)
                break
            case "scale_x":
                obj.scale.x = pos
                break
            case "scale_y":
                obj.scale.y = pos
                break
            case "scale_z":
                obj.scale.z = pos
                break
        }

        sendToStore()
    }

    useEffect(() => {
        setValue(value)
    }, [value])

    return (
        <HStack
            alignItems="center"
            justifyContent="center"
        >
            <Text
                fontSize="16px"
                color="gray.200"
            >{ text }</Text>
            <Input
                w="60px"
                h="30px"
                type="number"
                padding="5px"
                value={ _value /*value*/ }
                onChange={ updateTransform }
                ref={ value_input }
            />
        </HStack>
    )
}

export default TransformInput