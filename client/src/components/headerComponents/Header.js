import React from "react";
import { IconButton, VStack, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

const Header = () => {
	const {colorMode, toggleColorMode} = useColorMode();
	return (
		<VStack>
			<IconButton icon={<FaSun />} alignSelf='flex-end' onClick={toggleColorMode}/>
		</VStack>
	)
}

export default Header;