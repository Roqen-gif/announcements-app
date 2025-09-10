import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Add categories
  const categories = await prisma.category.createMany({
    data: [
      { name: "Community Events" },
      { name: "Crime & Safety" },
      { name: "Culture & Arts" },
      { name: "Discounts & Benefits" },
      { name: "Emergencies" },
      { name: "For Seniors" },
      { name: "Health & Wellness" },
      { name: "Kids & Family" },
      { name: "Sports & Recreation" },
      { name: "Transportation" },
      { name: "Education" },
      { name: "Environment" },
      { name: "Business & Economy" },
      { name: "Technology" },
      { name: "Housing" },
    ],
    skipDuplicates: true,
  });

  // Get created categories for relationships
  const categoryList = await prisma.category.findMany();
  const categoryMap = new Map(categoryList.map(cat => [cat.name, cat.id]));

  // Add sample announcements
  const announcements = await prisma.announcement.createMany({
    data: [
      {
        title: "Annual Spring Festival 2024",
        content: "Join us for the biggest community event of the year! The Spring Festival will feature live music, food vendors, children's activities, and local artisan booths. The event runs from 10 AM to 8 PM in Central Park. Free admission for all ages. Bring your family and friends for a day of fun and celebration!",
        publicationDate: new Date('2024-03-15T09:00:00Z'),
        linkSlug: "annual-spring-festival-2024",
      },
      {
        title: "Road Construction on Main Street",
        content: "Attention residents: Main Street will be under construction from March 20th to April 15th. Expect delays and detours during peak hours. Alternative routes are available via Oak Avenue and Pine Street. We apologize for any inconvenience and appreciate your patience during this necessary infrastructure improvement.",
        publicationDate: new Date('2024-03-10T14:30:00Z'),
        linkSlug: "road-construction-main-street",
      },
      {
        title: "Free Health Screening Event",
        content: "The City Health Department is hosting a free health screening event this Saturday from 9 AM to 3 PM at the Community Center. Services include blood pressure checks, cholesterol screening, diabetes testing, and flu vaccinations. No appointment necessary. All residents are encouraged to attend and take advantage of these free health services.",
        publicationDate: new Date('2024-03-12T08:00:00Z'),
        linkSlug: "free-health-screening-event",
      },
      {
        title: "New Library Hours Starting April 1st",
        content: "The Public Library will be extending its hours starting April 1st. New hours: Monday-Thursday 8 AM-9 PM, Friday-Saturday 8 AM-8 PM, Sunday 12 PM-6 PM. We're also adding new programs including coding classes for teens, book clubs for adults, and story time for children. Visit our website for the complete schedule.",
        publicationDate: new Date('2024-03-08T10:15:00Z'),
        linkSlug: "new-library-hours-april-1st",
      },
      {
        title: "Emergency Weather Alert - Severe Storm Warning",
        content: "The National Weather Service has issued a severe storm warning for our area from 6 PM today until 2 AM tomorrow. Expected conditions include heavy rain, strong winds up to 60 mph, and possible hail. Residents are advised to stay indoors, secure outdoor furniture, and avoid unnecessary travel. Emergency services are on standby.",
        publicationDate: new Date('2024-03-14T16:45:00Z'),
        linkSlug: "emergency-weather-alert-severe-storm",
      },
      {
        title: "Senior Citizens Discount Program",
        content: "Starting next month, all residents 65 and older are eligible for a 20% discount at participating local businesses. The program includes restaurants, pharmacies, grocery stores, and entertainment venues. Pick up your senior discount card at City Hall or any participating business. Valid ID required. This program is funded by the city's senior services budget.",
        publicationDate: new Date('2024-03-05T11:20:00Z'),
        linkSlug: "senior-citizens-discount-program",
      },
      {
        title: "Summer Camp Registration Now Open",
        content: "Registration for summer camps is now open! We offer programs for children ages 5-16 including sports camps, art workshops, science exploration, and outdoor adventures. Early bird pricing available until April 30th. Financial assistance is available for qualifying families. Visit the Parks & Recreation website to register and view all available programs.",
        publicationDate: new Date('2024-03-01T09:00:00Z'),
        linkSlug: "summer-camp-registration-open",
      },
      {
        title: "New Bike Lane Installation Complete",
        content: "The new protected bike lane on Riverside Drive is now complete! This 2-mile stretch connects downtown to the waterfront park and includes safety barriers, improved lighting, and bike repair stations. Cyclists can now enjoy a safer commute while reducing traffic congestion. The project was completed ahead of schedule and under budget.",
        publicationDate: new Date('2024-02-28T13:30:00Z'),
        linkSlug: "new-bike-lane-installation-complete",
      },
      {
        title: "Art Gallery Opening - Local Artists Exhibition",
        content: "The City Art Gallery is proud to present 'Local Visions,' featuring works by 15 talented artists from our community. The exhibition opens this Friday at 6 PM with a reception including light refreshments and live music. The show runs through May 15th. Admission is free and open to the public. Don't miss this celebration of local artistic talent!",
        publicationDate: new Date('2024-03-07T15:00:00Z'),
        linkSlug: "art-gallery-opening-local-artists",
      },
      {
        title: "Water Conservation Notice",
        content: "Due to the ongoing drought conditions, the city is implementing voluntary water conservation measures. Residents are asked to reduce outdoor watering to twice per week, fix any leaks promptly, and consider installing water-efficient appliances. The city offers rebates for water-saving devices. Together, we can ensure adequate water supply for all residents.",
        publicationDate: new Date('2024-03-03T07:00:00Z'),
        linkSlug: "water-conservation-notice",
      },
      {
        title: "New Business Incubator Program",
        content: "The city is launching a new business incubator program to support local entrepreneurs. The program offers low-cost office space, mentorship, networking opportunities, and access to funding resources. Applications are now being accepted for the first cohort starting in June. Priority given to technology, green energy, and creative industries. Apply online at cityhall.gov/incubator.",
        publicationDate: new Date('2024-02-25T12:00:00Z'),
        linkSlug: "new-business-incubator-program",
      },
      {
        title: "Digital Services Upgrade Complete",
        content: "The city's online services have been upgraded with a new, more user-friendly interface. Residents can now pay bills, schedule appointments, apply for permits, and access city services 24/7 from any device. The new system includes mobile apps for iOS and Android. Customer support is available Monday-Friday 8 AM-6 PM to help with the transition.",
        publicationDate: new Date('2024-02-20T10:30:00Z'),
        linkSlug: "digital-services-upgrade-complete",
      },
      {
        title: "Affordable Housing Initiative",
        content: "The city council has approved a new affordable housing initiative that will create 200 new units over the next two years. The program includes mixed-income developments, senior housing, and first-time homebuyer assistance. Construction begins this summer with the first units available by next spring. Applications for housing assistance are now being accepted.",
        publicationDate: new Date('2024-02-15T14:00:00Z'),
        linkSlug: "affordable-housing-initiative",
      },
      {
        title: "Community Garden Expansion",
        content: "The Community Garden is expanding with 50 new plots available for residents. The garden now includes raised beds for seniors, a children's learning area, and a composting station. Plot rentals are $25 per season and include water access and basic tools. Registration opens March 1st. Join your neighbors in growing fresh, healthy food while building community connections.",
        publicationDate: new Date('2024-02-10T09:15:00Z'),
        linkSlug: "community-garden-expansion",
      },
      {
        title: "Public Safety Update - Crime Prevention Tips",
        content: "The Police Department reminds residents to stay vigilant and follow these crime prevention tips: lock your doors and windows, keep valuables out of sight in your car, report suspicious activity immediately, and consider joining the Neighborhood Watch program. Crime rates have decreased 15% this year thanks to community cooperation and increased police presence.",
        publicationDate: new Date('2024-02-05T16:45:00Z'),
        linkSlug: "public-safety-update-crime-prevention",
      },
    ],
    skipDuplicates: true,
  });

  // Get created announcements for category relationships
  const announcementList = await prisma.announcement.findMany();
  
  // Add relationships between announcements and categories
  const announcementCategories = [
    // Spring Festival
    { announcementId: announcementList[0].id, categoryId: categoryMap.get("Community Events") },
    { announcementId: announcementList[0].id, categoryId: categoryMap.get("Culture & Arts") },
    
    // Road Construction
    { announcementId: announcementList[1].id, categoryId: categoryMap.get("Transportation") },
    { announcementId: announcementList[1].id, categoryId: categoryMap.get("Emergencies") },
    
    // Health Screening
    { announcementId: announcementList[2].id, categoryId: categoryMap.get("Health & Wellness") },
    { announcementId: announcementList[2].id, categoryId: categoryMap.get("For Seniors") },
    
    // Library Hours
    { announcementId: announcementList[3].id, categoryId: categoryMap.get("Education") },
    { announcementId: announcementList[3].id, categoryId: categoryMap.get("Culture & Arts") },
    
    // Weather Alert
    { announcementId: announcementList[4].id, categoryId: categoryMap.get("Emergencies") },
    
    // Senior Discount
    { announcementId: announcementList[5].id, categoryId: categoryMap.get("For Seniors") },
    { announcementId: announcementList[5].id, categoryId: categoryMap.get("Discounts & Benefits") },
    
    // Summer Camp
    { announcementId: announcementList[6].id, categoryId: categoryMap.get("Kids & Family") },
    { announcementId: announcementList[6].id, categoryId: categoryMap.get("Sports & Recreation") },
    
    // Bike Lane
    { announcementId: announcementList[7].id, categoryId: categoryMap.get("Transportation") },
    { announcementId: announcementList[7].id, categoryId: categoryMap.get("Environment") },
    
    // Art Gallery
    { announcementId: announcementList[8].id, categoryId: categoryMap.get("Culture & Arts") },
    { announcementId: announcementList[8].id, categoryId: categoryMap.get("Community Events") },
    
    // Water Conservation
    { announcementId: announcementList[9].id, categoryId: categoryMap.get("Environment") },
    
    // Business Incubator
    { announcementId: announcementList[10].id, categoryId: categoryMap.get("Business & Economy") },
    { announcementId: announcementList[10].id, categoryId: categoryMap.get("Technology") },
    
    // Digital Services
    { announcementId: announcementList[11].id, categoryId: categoryMap.get("Technology") },
    
    // Affordable Housing
    { announcementId: announcementList[12].id, categoryId: categoryMap.get("Housing") },
    { announcementId: announcementList[12].id, categoryId: categoryMap.get("For Seniors") },
    
    // Community Garden
    { announcementId: announcementList[13].id, categoryId: categoryMap.get("Community Events") },
    { announcementId: announcementList[13].id, categoryId: categoryMap.get("Environment") },
    
    // Public Safety
    { announcementId: announcementList[14].id, categoryId: categoryMap.get("Crime & Safety") },
  ];

  // Create relationships
  for (const ac of announcementCategories) {
    if (ac.announcementId && ac.categoryId) {
      await prisma.announcement.update({
        where: { id: ac.announcementId },
        data: {
          categories: {
            connect: { id: ac.categoryId }
          }
        }
      });
    }
  }

  console.log("✅ Seeding completed successfully!");
  console.log(`📊 Created ${categoryList.length} categories`);
  console.log(`📰 Created ${announcementList.length} announcements`);
  console.log(`🔗 Created ${announcementCategories.length} category-announcement relationships`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });