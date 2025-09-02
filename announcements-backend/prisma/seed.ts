import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  await prisma.announcement.createMany({
    data: [
      {
        title: "Перше оголошення",
        content: "Це тестовий запис",
        publicationDate: new Date(), // поточна дата
        linkSlug: slugify("Перше оголошення", { lower: true }) // автоматично створюємо slug
      },
      {
        title: "Друге оголошення",
        content: "Ще один приклад",
        publicationDate: new Date(),
        linkSlug: slugify("Друге оголошення", { lower: true })
      }
    ]
  });
}

main()
  .then(() => console.log("✅ Seeding завершено!"))
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });