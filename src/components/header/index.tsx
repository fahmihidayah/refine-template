import {
  Avatar,
  Box,
  BoxProps,
  Button,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  HamburgerMenu,
  RefineThemedLayoutV2HeaderProps,
} from "@refinedev/chakra-ui";
import { useGetIdentity, useLogout } from "@refinedev/core";
import { IconLogout, IconMoon, IconSun } from "@tabler/icons";
import React from "react";
import { UserAuth } from "src/data/user";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky,
}) => {
  const { data: user } = useGetIdentity<UserAuth>();

  let name: string = "";
  if (user) {
    name = user?.first_name + " " + user?.last_name;
  }

  let avatar: string = "";
  if (user) {
    avatar = "https://i.pravatar.cc/150?img=11"
  }

  const { mutate : logout } = useLogout();   

  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue(
    "refine.header.bg.light",
    "refine.header.bg.dark"
  );

  let stickyProps: BoxProps = {};
  if (sticky) {
    stickyProps = {
      position: "sticky",
      top: 0,
      zIndex: 1,
    };
  }

  return (
    <Box
      py="2"
      pr="4"
      pl="2"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      height="64px"
      bg={bgColor}
      borderBottom="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      {...stickyProps}
    >
      <HamburgerMenu />
      <HStack>
        <IconButton
          variant="ghost"
          aria-label="Toggle theme"
          onClick={toggleColorMode}
        >
          <Icon
            as={colorMode === "light" ? IconMoon : IconSun}
            w="24px"
            h="24px"
          />
        </IconButton>
        {(avatar || name) && (
          <HStack>
            {name && (
              <Text size="sm" fontWeight="bold">
                {name}
              </Text>
            )}
            <Menu>
              <MenuButton as={Button} colorScheme="transparent" rightIcon={ <Avatar size="sm" name={name} src={avatar} />}>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => logout()}>
                <Icon as={IconLogout} w="24px" h="24px" />
                <Text ps={2}>Logout</Text>
                </MenuItem>
              </MenuList>
            </Menu>
           
          </HStack>
        )}
      </HStack>
    </Box>
  );
};
