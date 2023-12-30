import { PrismaClient } from "@prisma/client";
import { generateSku } from "~/utils/generate-sku";

const db = new PrismaClient();

async function main() {
  // const categories = await db.category.createMany({
  //   data: [
  //     { name: "Electronics", slug: "electronics" },
  //     { name: "Clothing", slug: "clothing" },
  //     { name: "Home and Garden", slug: "home-and-garden" },
  //     { name: "Books", slug: "books" },
  //     { name: "Toys", slug: "toys" },
  //     { name: "Sports and Outdoors", slug: "sports-and-outdoors" },
  //     { name: "Beauty and Personal Care", slug: "beauty-and-personal-care" },
  //     { name: "Automotive", slug: "automotive" },
  //     { name: "Furniture", slug: "furniture" },
  //     { name: "Jewelry", slug: "jewelry" },
  //   ],
  // });

  const description = `<article style="font-family: 'Arial', sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
  <h1 style="color: #007BFF;">Product Title</h1>
  
  <section>
    <h2 style="color: #007BFF;">Overview</h2>
    <p>This is a brief overview of the product. Highlight its main features and benefits.</p>
  </section>
  
  <section>
    <h2 style="color: #007BFF;">Features</h2>
    <ul>
      <li>Feature 1: Descriptive text about feature 1.</li>
      <li>Feature 2: Descriptive text about feature 2.</li>
      <li>Feature 3: Descriptive text about feature 3.</li>
    </ul>
  </section>
  
  <section>
    <h2 style="color: #007BFF;">Specifications</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr style="border-bottom: 1px solid #ddd;">
        <th style="padding: 8px; text-align: left;">Parameter</th>
        <th style="padding: 8px; text-align: left;">Value</th>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px;">Size</td>
        <td style="padding: 8px;">Medium</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 8px;">Color</td>
        <td style="padding: 8px;">Blue</td>
      </tr>
      <tr>
        <td style="padding: 8px;">Material</td>
        <td style="padding: 8px;">Durable plastic</td>
      </tr>
    </table>
  </section>
  
  <section>
    <h2 style="color: #007BFF;">Description</h2>
    <p>
      This is a more detailed description of the product. 
      It can include information about its design, usage, and any other relevant details.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </section>
  
  <footer>
    <p style="font-weight: bold; color: #28A745;">Price: $99.99</p>
    <p style="color: #DC3545;">Availability: In stock</p>
  </footer>
</article>`;

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateRandomProductName = (): string => {
    const adjectives = [
      "Awesome",
      "Fantastic",
      "Amazing",
      "Sleek",
      "Innovative",
      "Elegant",
      "Durable",
      "Versatile",
      "Stylish",
      "Precision",
      "Robust",
      "Modern",
      "Efficient",
      "Chic",
      "Dynamic",
      "Vibrant",
      "Unique",
      "Sustainable",
      "Luxurious",
      "Captivating",
      "Powerful",
      "Silent",
      "Streamlined",
      "Premium",
      "Supreme",
      "Exquisite",
      "Elite",
      "Masterful",
      "Splendid",
    ];

    const nouns = [
      "Widget",
      "Gadget",
      "Device",
      "Tool",
      "Contraption",
      "Appliance",
      "Instrument",
      "Apparatus",
      "Machine",
      "Equipment",
      "Artifact",
      "Implement",
      "Utensil",
      "System",
      "Conveyance",
      "Fixture",
      "Mechanism",
      "Contrivance",
      "Accessory",
      "Fixture",
      "Automaton",
      "Module",
      "Instrumentation",
      "Machinery",
      "Unit",
      "Instrumentality",
      "Contrivance",
      "Apparatus",
      "Gizmo",
    ];

    const randomAdjective =
      adjectives[getRandomNumber(0, adjectives.length - 1)];
    const randomNoun = nouns[getRandomNumber(0, nouns.length - 1)];

    return `${randomAdjective} ${randomNoun}`;
  };

  const generateRandomCategorySlug = () => {
    const categories = [
      "electronics",
      "clothing",
      "home-and-garden",
      "books",
      "toys",
      "sports-and-outdoors",
      "beauty-and-personal-care",
      "automotive",
      "furniture",
      "jewelry",
    ];

    const randomCategorySlug =
      categories[getRandomNumber(0, categories.length - 1)];

    return randomCategorySlug;
  };

  const generateUniqueSKU = () => {
    const randomNumber = getRandomNumber(100000000, 999999999);
    return randomNumber.toString();
  };

  const generateProducts = (count: number) => {
    const products = [];

    for (let i = 0; i < count; i++) {
      const price = parseFloat(
        (Math.random() * (12000 - 200) + 200).toFixed(2),
      );
      const product = {
        name: generateRandomProductName(),
        sku: generateUniqueSKU(),
        description: description,
        price,
        discountPct: getRandomNumber(0, 50), // 50% chance of having a discount
        stockCount: getRandomNumber(0, 100), // 10% chance of having zero stock
        isAvailable: Math.random() < 0.9, // 90% chance of being available
        categorySlug: generateRandomCategorySlug(),
      };

      products.push(product);
    }

    return products;
  };

  const productsData = generateProducts(4);

  const products = await db.product.createMany({
    data: productsData,
  });
}

main()
  .then(async () => {
    console.log("\n\nSuccessfully seeded database\n\n");
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
