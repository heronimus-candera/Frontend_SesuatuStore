import { Button, Card, Container, Input, Select, Stack, Text, Image } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function UploadPage() {
    const [ nama, setNama] = useState('');
    const [ harga, setHarga] = useState('');
    const [ deskripsi, setDeskripsi] = useState('');
    const [ kategori, setKategori] = useState('');
    const [ preview, setPreview] = useState('');
    const [ file, setFile] = useState('');
    const navigate = useNavigate();

    const simpan = async() => {
        try {
            await axios.post('http://localhost:3000/barang/', {
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
        } catch (error) {
            console.log(error);
        }

        navigate('/')
    }

    const loadGambar = (e) => {
        const gambar = e.target.files[0];
        setFile(gambar)
        setPreview(URL.createObjectURL(gambar))
    }

    const batal = () => {
        setNama('')
        setHarga('')
        setDeskripsi('')
        setKategori('')
        setPreview('')
        setFile('')

        // onOpen()
    }

  return (
    <Container>
        <Card mt={10}>
            <Stack spacing={2} direction={'row'}>
                <Stack>
                    <Text mt={5}>Nama</Text>
                    <Input placeholder='Nama' onChange={(e) => setNama(e.target.value)}/>
                    
                    <Text mt={5}>Harga</Text>
                    <Input placeholder='Harga' onChange={(e) => setHarga(e.target.value)}/>
                    
                    <Text mt={5}>Deskripsi</Text>
                    <Input placeholder='Deskripsi' onChange={(e) => setDeskripsi(e.target.value)}/>
                    
                    <Text mt={5}>Kategori</Text>
                    <Select onChange={(e) => setKategori(e.target.value)} placeholder='Kategori'>
                        <option value='Elektronik'>Elektronik</option>
                        <option value='Makanan dan Minuman'>Makanan dan Minuman</option>
                        <option value='Perabotan'>Perabotan</option>
                    </Select>
            
                    <Stack spacing={2} direction={'row'} mt={5}>
                        <Button colorScheme='gray' variant={'outline'} onClick={simpan}>Tambah</Button>
                        <Button colorScheme='red' variant={'outline'} onClick={batal}>Batal</Button>
                    </Stack>
                </Stack>
                <Stack>
                    <Input type='file' onChange={loadGambar}/>
                    {preview ? (
                        <Image src={preview} boxSize='50%'/>
                    ) : (
                        ''
                    )}
                </Stack>
            </Stack>
        </Card>
    </Container>

  )
}

export default UploadPage
