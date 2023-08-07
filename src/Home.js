import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MenuPage from "./Menu"
import axios, { Axios } from "axios"
import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Container, Heading, Image, Text, useDisclosure, SimpleGrid, Box } from "@chakra-ui/react"

function HomePage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dataBarang, setDataBarang] = useState([]);
    // var sesuatu;

    useEffect(() => {
        getBarang()
    });

    const getBarang = async () => {
        const result = await axios.get('http://localhost:3000/barang/barang')
        setDataBarang(result.data.data)
    }


    return (
        <Container>
            <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {dataBarang.map((element, index) => (
                    <Card w='154px' h='319px' display={'flex'} direction={'column'} alignItems={'center'} borderRadius={0}>
                        <CardHeader>
                            <Box w='138px' h='138px' mr='0' ml='0'>
                                <Image src={element.url} alt={element.namaBarang} h='100%' w='100%' objectFit={'cover'}/>
                            </Box>
                        </CardHeader>
                        <CardBody alignSelf={'self-start'} w={'138px'} h={'165px'}>
                            <Heading fontSize={18}>{element.namaBarang}</Heading>
                            <Text>{element.deskripsiBarang}</Text>
                            <Text color="blue.600">{element.hargaBarang}</Text>
                        </CardBody>
                    </Card>
                ))}   
            </SimpleGrid>

        </Container>
    )
}

export default HomePage