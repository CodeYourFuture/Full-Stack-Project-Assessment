import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" align="center">
      <Text>
        {new Date().getFullYear()} - Developed by
        <Link
          href="https://github.com/berkeli"
          isExternal
          rel="noopener noreferrer"
        >
          &nbsp;Berkeli
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
