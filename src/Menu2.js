import { Box, Button, Card, CardBody, CardHeader, Container, Flex, FormControl, FormLabel, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Menu() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [dataBarang, setDataBarang] = useState([])
    const [nama, setNama] = useState('')
    const [harga, setHarga] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    const [kategori, setKategori] = useState('')
    const [preview, setPreview] = useState('')
    const [file, setFile] = useState('')
    const [kode, setKode] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        getData()
    })

    const getData = async() => {
        const barang = await axios.get('http://localhost:3000/barang/barang')
        setDataBarang(barang.data.data)
    }

    const hapusData = async(element) => {
        setKode(element.IDBarang)
        await axios.delete(`http://localhost:3000/barang/${kode}`)

        navigate('/menu')
    }

    const editData = (element) => {
        setNama(element.namaBarang)
        setHarga(element.hargaBarang)
        setDeskripsi(element.deskripsiBarang)
        setKategori(element.kategoriBarang)
        setFile(element.namaFile)
        setPreview(element.url)
        setKode(element.IDBarang)

        onOpen()
    }

    const gantiData = async() => {
        await axios.put(`http://localhost:3000/barang/${kode}`, {
            'nama' : nama,
            'harga' : harga,
            'deskripsi' : deskripsi,
            'kategori' : kategori,
            'file' : file
        }, {
            headers : {
                'Content-Type' : 'multipart/form-data',
            },
        })

        onClose()
        
        navigate('/menu')
    }

    const loadGambar = (e) => {
        const gambar = e.target.files[0];
        setFile(gambar)
        setPreview(URL.createObjectURL(gambar))
    }

  return (
    <Container>
            <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {dataBarang.map((element, index) => (
                    <Card w='154px' h='369px' display={'flex'} direction={'column'} alignItems={'center'} borderRadius={0}>
                        <CardHeader>
                            <Box w='138px' h='138px' mr='0' ml='0'>
                                <Image src={element.url} alt={element.namaBarang} h='100%' w='100%' objectFit={'cover'}/>
                            </Box>
                        </CardHeader>
                        <CardBody alignSelf={'self-start'} w={'138px'} h={'195px'}>
                            <Heading fontSize={18}>{element.namaBarang}</Heading>
                            <Text>{element.deskripsiBarang}</Text>
                            <Text color="blue.600">{element.hargaBarang} </Text>
                            <Button colorScheme='red' size={'xs'} onClick={() => hapusData(element)}>Hapus</Button>
                            <Button colorScheme='blue' size={'xs'} onClick={() => editData(element)}>Edit</Button>
                        </CardBody>
                    </Card>
                ))}   
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ModalContent> 
                        <Flex direction={'row'}>    
                            <Box w='400px'>
                                <ModalHeader>Edit</ModalHeader>
                                <ModalCloseButton/>
                                <ModalBody>
                                    <FormControl>
                                        <FormLabel>Nama</FormLabel>
                                        <Input type='text' value={nama} onChange={(e) => setNama(e.target.value)}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Harga</FormLabel>
                                        <Input type='text' value={harga} onChange={(e) => setHarga(e.target.value)}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Deskripsi</FormLabel>
                                        <Input type='text' value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Kategori</FormLabel>
                                        <Select value={kategori} onChange={(e) => setKategori(e.target.value)}>
                                            <option value='Elektronik'>Elektronik</option>
                                            <option value='Makanan dan Minuman'>Makanan dan Minuman</option>
                                            <option value='Perabotan'>Perabotan</option>
                                        </Select>
                                    </FormControl>
                                </ModalBody>
                            </Box>
                            <Box>
                                <ModalHeader> </ModalHeader>
                                <ModalBody>
                                    <FormControl>
                                        <FormLabel>photo</FormLabel>
                                        <Input type='file' onChange={loadGambar}/>
                                        {preview ? (
                                            <Box w='300px' h='300px' mt='10px' mr='0' ml='0'>
                                            <Image src={preview} alt={nama} h='100%' w='100%' objectFit={'cover'}/>
                                        </Box>
                                        ) : (
                                            ' '
                                        )}
                                    </FormControl>
                                </ModalBody>
                            </Box>
                        </Flex>
                        <ModalFooter>
                            <Button colorScheme='blue' onClick={gantiData}>Simpan</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </SimpleGrid>
    </Container>
  )
}

export default Menu