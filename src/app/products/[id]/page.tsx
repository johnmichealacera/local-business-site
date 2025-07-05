import { notFound } from 'next/navigation'
import { ProductDetailClient } from '@/components/products/product-detail-client'
import { getProductById } from '@/lib/products'

interface ProductDetailPageProps {
  params: { id: string }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />
} 