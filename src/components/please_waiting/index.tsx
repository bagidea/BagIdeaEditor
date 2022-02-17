import {
    Modal,
    ModalContent,
    ModalOverlay,
    Spinner,
    Text,
    VStack
} from '@chakra-ui/react'

const PleaseWaiting: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
    <Modal
        closeOnOverlayClick={ false }
        closeOnEsc={ false }
        isOpen={ isOpen }
        onClose={ null }
        isCentered
    >
        <ModalOverlay />
        <ModalContent
            w="250px"
            h="120px"
            bgColor="gray.900"
            rounded="20px"
            alignItems="center"
            justifyContent="center"
        >
            <VStack
                spacing="15px"
            >
                <Text
                    color="white"
                >Please waiting...</Text>
                <Spinner />
            </VStack>
        </ModalContent>
    </Modal>
)

export default PleaseWaiting