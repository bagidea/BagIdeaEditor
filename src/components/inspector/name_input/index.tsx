import {
    Flex,
    HStack,
    Input,
    Text
} from '@chakra-ui/react'

import {
    BaseSyntheticEvent,
    MutableRefObject,
    useEffect,
    useRef,
    useState
} from 'react'

import { BsDot } from 'react-icons/bs'

const NameInput: React.FC<{ isSelect: boolean, text: string }> = ({ isSelect, text }) => {
    const [_value, setValue] = useState(text)
    const value_input: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

    const updateTransform = (e: BaseSyntheticEvent) => {
        const value: string = e.target.value
        setValue(value)
    }

    useEffect(() => {
        setValue(text)
    }, [text])

    return (
        <Flex
            display={ isSelect ? "flex" : "none" }
            w="full"
            h="50px"
            padding="3px"
        >
            <Flex
                w="full"
                h="full"
                alignItems="center"
                padding="10px"
                bgColor="blue.700"
            >
                <HStack
                    w="full"
                >
                    <BsDot />

                    <Text
                        fontSize="16px"
                        color="gray.200"
                    >Name:</Text>

                    <Input
                        w="full"
                        h="30px"
                        padding="5px"
                        bgColor="gray.800"
                        value={ _value }
                        onChange={ updateTransform }
                        ref={ value_input }
                    />
                </HStack>
            </Flex>
        </Flex>
    )
}

export default NameInput