import { Button } from "@/components/ui/button";
import { PrismaClient } from "../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { prisma } from "@/lib/db";

export default function Home() {
  const prisma = new PrismaClient().$extends(withAccelerate());
  console.log("Hello");

  let text = {};

  async function addUser() {
    // Was getting unique user error.
    // const user = await prisma.user.create({
    //   data: {
    //     name: "Alice",
    //     email: "alicebaaa@prisma.io",
    //   },
    // });

    const users = await prisma.user.findMany();
    console.log(users);

    console.log("Users queried");
    text = users;
  }

  addUser()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  return (
    <>
      <Button>Hello World</Button>
      <p>{JSON.stringify(text)}</p>
    </>
  );
}
