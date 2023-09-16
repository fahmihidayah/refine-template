import { Button, Text } from "@chakra-ui/react";
import { NavigateToResource } from "@refinedev/nextjs-router";
import Link from "next/link";

export default function Home() {
  return <>
    <Text>Welcome</Text>
    <Button colorScheme="blue" >
      <Link href="/login">Login</Link>
    </Button>
    <Button colorScheme="red">Register</Button>
  </>
}

Home.noLayout = true;
