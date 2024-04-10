'use client'
import { CheckIcon, SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import React from "react";

type SearchInputProps = {

}

const SearchInput:React.FC<SearchInputProps> = () => {
    return (
        <Flex flexGrow={1} mr={2} align='center'>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input
                    fontSize='10pt'
                    placeholder='Search Reddit'
                    height='34px'
                    bg='gray.50'
                    _placeholder={{color: 'gray.300'}}
                    _hover={{
                        bg: 'white',
                        borders: '1px solid',
                        bordercolor: 'blue.500'
                    }}
                    _focus={{
                        outline: 'none',
                        border: '1px solid',
                        borderColor: 'blue.500'
                    }}
                />
            </InputGroup>
        </Flex>
    )
};

export default SearchInput;