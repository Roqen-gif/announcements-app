import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Додаємо категорії
  await prisma.category.createMany({
    data: [
      { name: "Community events" },
      { name: "Crime & Safety" },
      { name: "Culture" },
      { name: "Discounts & Benefits" },
      { name: "Emergencies" },
      { name: "For Seniors" },
      { name: "Health" },
      { name: "Kids & Family" },
    ],
    skipDuplicates: true, // Щоб не дублювало при повторному запуску
  });

  // Додаємо приклади анонсів
  await prisma.announcement.createMany({
    data: [
      {
        title: "Перше оголошення",
        content: "Це тестовий запис",
        publicationDate: new Date(),
        linkSlug: "pershe-ogoloshennya",
      },
      {
        title: "Друге оголошення",
        content: "Ще один приклад",
        publicationDate: new Date(),
        linkSlug: "druge-ogoloshennya",
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seeding завершено!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });