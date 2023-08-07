import { Box, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React from 'react'
import { Link, Navigate } from 'react-router-dom'

function Navbar() {
const pindah = (pindah) => {
    Navigate(pindah)
}

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1rem"
      backgroundColor="teal.500"
      color="white"
    >
      {/* Logo atau judul situs */}
      <Box>
        <Link to={'/'}>
            <strong>Clone Tokopedia</strong>
        </Link>
      </Box>

      {/* Daftar menu navigasi */}
      <Box>
        {/* Tampilkan daftar navigasi dalam dropdown pada layar kecil */}
        <Menu>
          <MenuButton as="button">Menu</MenuButton>
          <MenuList>
            <MenuItem color={'black'}><Link to={'/'}>Home</Link></MenuItem>
            <MenuItem color={'black'}><Link to={'/tambah'}>Tambah</Link></MenuItem>
            <MenuItem color={'black'}><Link to={'/menu'}>Menu</Link></MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  )
}

export default Navbar