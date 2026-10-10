import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    name: "Admin User",
    email: "admin@taskflow.com",
    password: "admin123",
    role: "ADMIN",
  },
  {
    name: "Project Manager",
    email: "pm@taskflow.com",
    password: "pm123",
    role: "PROJECT_MANAGER",
  },
];

const seed = async () => {
  for (const user of users) {
    const password = await bcrypt.hash(user.password, 10);

    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        password,
        role: user.role,
        status: "active",
      },
      create: {
        name: user.name,
        email: user.email,
        password,
        role: user.role,
        status: "active",
      },
    });
  }
};

seed()
  .then(async () => {
    console.log("Seeded default users");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
