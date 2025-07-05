import { notFound } from 'next/navigation'
import { ProductDetailClient } from '@/components/products/product-detail-client'
import { getProductById } from '@/lib/products'

// interface ProductDetailPageProps {
//   params: { id: string }
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductDetailPage({ params }: any) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />
} 