import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a sample site with the colorPalette you provided
  const site = await prisma.site.upsert({
    where: { domain: 'thriftedtreasures.com' },
    update: {
      colorPalette: ['#F59E0B', '#000000', '#FFFFFF'] // Your sample data
    },
    create: {
      name: 'Thrifted Treasures',
      domain: 'thriftedtreasures.com',
      description: 'Sustainable fashion that doesn\'t compromise on style',
      colorPalette: ['#F59E0B', '#000000', '#FFFFFF'], // Your sample data
      packageType: 'PREMIUM',
      features: ['PRODUCTS', 'CATEGORIES', 'EVENTS', 'ABOUT', 'CONTACT'],
      featuresOrder: ['PRODUCTS', 'CATEGORIES', 'EVENTS', 'ABOUT', 'CONTACT']
    }
  })

  console.log('Created site:', site)

  // Add sample contact information
  const existingContact = await prisma.contact.findFirst({
    where: { siteId: site.id }
  })

  if (!existingContact) {
    await prisma.contact.create({
      data: {
        siteId: site.id,
        businessName: 'Thrifted Treasures',
        email: 'hello@thriftedtreasures.com',
        phone: '09123456789',
        address: 'Bingkahan',
        city: 'Manticao',
        province: 'Misamis Oriental',
        zipCode: '9000',
        country: 'Philippines'
      }
    })
  }

  // Add sample categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name_siteId: { name: 'Shoes', siteId: site.id } },
      update: {},
      create: {
        name: 'Shoes',
        description: 'Pre-owned shoes in excellent condition',
        siteId: site.id
      }
    }),
    prisma.category.upsert({
      where: { name_siteId: { name: 'Clothing', siteId: site.id } },
      update: {},
      create: {
        name: 'Clothing',
        description: 'Sustainable clothing for all occasions',
        siteId: site.id
      }
    }),
    prisma.category.upsert({
      where: { name_siteId: { name: 'Accessories', siteId: site.id } },
      update: {},
      create: {
        name: 'Accessories',
        description: 'Bags, jewelry, and other accessories',
        siteId: site.id
      }
    })
  ])

  // Add sample products
  await Promise.all([
    prisma.product.upsert({
      where: { id: 'sample-product-1' },
      update: {},
      create: {
        id: 'sample-product-1',
        name: 'Vintage Leather Boots',
        description: 'Classic brown leather boots in excellent condition',
        price: 2500,
        stock: 1,
        imageUrls: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400'],
        categoryId: categories[0].id,
        siteId: site.id
      }
    }),
    prisma.product.upsert({
      where: { id: 'sample-product-2' },
      update: {},
      create: {
        id: 'sample-product-2',
        name: 'Denim Jacket',
        description: 'Classic blue denim jacket, perfect for layering',
        price: 1800,
        stock: 2,
        imageUrls: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5a?w=400'],
        categoryId: categories[1].id,
        siteId: site.id
      }
    })
  ])

  console.log('Sample data seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 