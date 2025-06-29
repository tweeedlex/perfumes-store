"use client";

import ImageViewer from "@/shared/ui/image-viewer-basic";
import PriceFormat_Sale from "@/shared/ui/price-format-sale";
import QuantityInputBasic from "@/entities/commerce-ui/quantity-input-basic";
import VariantSelectorBasic, {
  VariantItem as BaseVariantItem,
} from "@/entities/commerce-ui/variant-selector-basic";
import { Button } from "@/shared/ui/button";
import { Clock } from "lucide-react";
import { useState } from "react";

interface VariantItem extends BaseVariantItem {
  price: number;
  salePrice?: number;
  imageUrl?: string;
  isInStock?: boolean;
  availableQuantity?: number | null;
}
interface VariantSelectionPayload {
  variantId: string;
  variantLabel: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  salePrice?: number;
  totalPrice: number;
  isOnSale: boolean;
}
interface ProductVariant01Props {
  title?: string;
  description?: string;
  badge?: string | null;
  shippingInfo?: string;
  variants: VariantItem[];
  defaultImage?: string;
  initialVariant?: string;
  variantLabel?: string;
  onAddToCart?: (payload: VariantSelectionPayload) => void;
  onBuyNow?: (payload: VariantSelectionPayload) => void;
  selectedVariant?: string;
  onVariantChange?: (variant: string) => void;
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

function ProductVariant_01({
  badge = "New",
  defaultImage,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  errorMessage = null,
  initialVariant,
  isLoading = false,
  onAddToCart = () => {},
  onBuyNow = () => {},
  onQuantityChange,
  onVariantChange,
  quantity: controlledQuantity,
  selectedVariant: controlledVariant,
  shippingInfo,
  title = "Product Variant Title",
  variantLabel = "Variant",
  variants,
}: ProductVariant01Props) {
  // Ensure variants array is not empty
  if (!variants.length) {
    throw new Error("At least one variant must be provided");
  }

  const defaultInitialVariant = initialVariant || variants[0].value;

  const [internalSelectedVariant, setInternalSelectedVariant] = useState(
    defaultInitialVariant
  );
  const [internalQuantity, setInternalQuantity] = useState(1);

  // Determine if we're in controlled or uncontrolled mode
  const isVariantControlled = controlledVariant !== undefined;
  const isQuantityControlled = controlledQuantity !== undefined;
  const selectedVariantId = isVariantControlled
    ? controlledVariant
    : internalSelectedVariant;
  const quantity = isQuantityControlled ? controlledQuantity : internalQuantity;

  const handleVariantChange = (newVariant: string) => {
    if (isVariantControlled) {
      onVariantChange?.(newVariant);
    } else {
      setInternalSelectedVariant(newVariant);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (isQuantityControlled) {
      onQuantityChange?.(newQuantity);
    } else {
      setInternalQuantity(newQuantity);
    }
  };

  const selectedVariant =
    variants.find((v) => v.value === selectedVariantId) || variants[0];

  const currentImage = selectedVariant?.imageUrl || defaultImage;
  const currentPrice = selectedVariant.price;
  const currentSalePrice = selectedVariant.salePrice;
  const isOnSale =
    currentSalePrice !== undefined && currentSalePrice < currentPrice;

  // Get stock status from the selected variant
  const isInStock =
    selectedVariant.isInStock !== undefined ? selectedVariant.isInStock : true; // Default to in stock if not specified

  const availableQuantity = selectedVariant.availableQuantity;

  const effectivePrice = isOnSale ? currentSalePrice : currentPrice;

  const handleAddToCart = () => {
    onAddToCart({
      isOnSale: isOnSale,
      originalPrice: isOnSale ? currentPrice : undefined,
      price: currentPrice,
      quantity: quantity,
      salePrice: isOnSale ? currentSalePrice : undefined,
      totalPrice: quantity * effectivePrice,
      variantId: selectedVariantId,
      variantLabel: selectedVariant?.label || "",
    });
  };

  const handleBuyNow = () => {
    onBuyNow({
      isOnSale: isOnSale,
      originalPrice: isOnSale ? currentPrice : undefined,
      price: currentPrice,
      quantity: quantity,
      salePrice: isOnSale ? currentSalePrice : undefined,
      totalPrice: quantity * effectivePrice,
      variantId: selectedVariantId,
      variantLabel: selectedVariant?.label || "",
    });
  };

  if (errorMessage) {
    return (
      <div className="my-6 rounded-lg border border-red-200 bg-red-50 p-6 text-red-600 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400">
        <p className="font-medium">Error loading product</p>
        <p className="text-sm">{errorMessage}</p>
      </div>
    );
  }

  // Add visual indicator for out of stock items in variant selector
  const variantsWithStockIndicator = variants.map((variant) => {
    const isVariantInStock =
      variant.isInStock !== undefined ? variant.isInStock : true;
    return {
      ...variant,
      disabled: !isVariantInStock,
      label: variant.label + (isVariantInStock ? "" : " (Out of Stock)"),
    };
  });

  return (
    <div className="my-6 grid max-w-screen-lg grid-cols-1 gap-12 rounded-lg md:grid-cols-2">
      <div className="relative h-fit w-full overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 p-5 dark:from-teal-950/30 dark:to-cyan-950/30">
        {badge && (
          <span className="absolute top-4 left-4 z-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 px-3 py-1.5 text-xs font-bold text-white">
            {badge}
          </span>
        )}
        <div className="transition-transform duration-500 hover:scale-105">
          {isLoading ? (
            <div className="flex h-[300px] items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-200 border-t-teal-600"></div>
            </div>
          ) : (
            <ImageViewer
              imageUrl={currentImage || ""}
              classNameThumbnailViewer="rounded-lg object-contain h-[300px] mx-auto"
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-8 w-3/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-16 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-8 w-1/3 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700"></div>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                {title}
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <PriceFormat_Sale
                originalPrice={currentPrice}
                salePrice={isOnSale ? currentSalePrice : undefined}
                showSavePercentage
                className="items-baseline"
                classNameOriginalPrice="text-lg text-gray-500 line-through"
                classNameSalePrice="text-3xl font-bold text-teal-700 dark:text-teal-400"
                classNameSalePercentage="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 text-xs px-2 py-0.5 rounded-md"
              />

              {shippingInfo && (
                <p className="mt-1 inline-flex items-center text-sm text-green-600 dark:text-green-400">
                  <Clock className="mr-1 h-4 w-4" />
                  {shippingInfo}
                </p>
              )}
            </div>

            {isInStock ? (
              <div className="rounded-md bg-green-50 p-3 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                <p className="text-sm font-bold">In Stock</p>
                {availableQuantity !== null &&
                  availableQuantity !== undefined &&
                  availableQuantity > 0 && (
                    <span className="mt-1 text-sm font-normal">
                      {availableQuantity} units available
                    </span>
                  )}
              </div>
            ) : (
              <div className="rounded-md bg-amber-50 p-3 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                <p className="text-sm font-bold">Currently out of stock</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {variantLabel}
                </label>
                <VariantSelectorBasic
                  value={selectedVariantId}
                  onValueChange={handleVariantChange}
                  variants={variantsWithStockIndicator}
                  className="grid-cols-2 sm:grid-cols-2"
                  itemClassName="bg-gray-50 border-gray-200 hover:border-teal-300 dark:bg-gray-800 dark:border-gray-700
                                data-[state=checked]:border-teal-500 data-[state=checked]:bg-teal-50 
                                data-[state=checked]:text-teal-700 dark:data-[state=checked]:bg-gray-700 
                                dark:data-[state=checked]:border-teal-500 dark:data-[state=checked]:text-teal-300
                                focus:ring-2 focus:ring-teal-500/50 focus:ring-offset-2 focus:border-teal-400
                                dark:focus:ring-teal-500/40 dark:focus:ring-offset-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantity
              </label>
              <QuantityInputBasic
                quantity={quantity}
                onChange={handleQuantityChange}
                max={
                  availableQuantity !== null && availableQuantity !== undefined
                    ? availableQuantity
                    : undefined
                }
                min={1}
                className="max-w-[150px] border-gray-300 dark:border-gray-700"
                disabled={!isInStock}
              />
            </div>

            <div className="mt-2 flex flex-col flex-wrap gap-3 sm:flex-row">
              <Button
                variant="outline"
                className="w-full border-gray-300 bg-white text-gray-800 transition-all duration-200 hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-teal-500 dark:hover:bg-gray-700"
                onClick={handleAddToCart}
                disabled={!isInStock || isLoading}
              >
                {isLoading ? "Loading..." : "Add to Cart"}
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white transition-all hover:from-teal-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500"
                onClick={handleBuyNow}
                disabled={!isInStock || isLoading}
              >
                {isLoading ? "Loading..." : "Buy Now"}
              </Button>
            </div>

            <div className="mt-4 rounded-lg border border-gray-200 p-4 dark:border-gray-800">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Selected Configuration:
              </p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-teal-500"></div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedVariant?.label}
                  </p>
                </div>
                <p className="font-medium text-teal-700 dark:text-teal-400">
                  {isOnSale ? (
                    <span>
                      <span className="mr-2 line-through opacity-70">
                        ${currentPrice}
                      </span>
                      ${currentSalePrice}
                    </span>
                  ) : (
                    `$${currentPrice}`
                  )}
                </p>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                {quantity} {quantity > 1 ? "units" : "unit"} × $
                {effectivePrice.toFixed(2)} = $
                {(quantity * effectivePrice).toFixed(2)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {isInStock ? "In Stock" : "Out of Stock"}
                {isInStock &&
                  availableQuantity !== null &&
                  availableQuantity !== undefined &&
                  ` (${availableQuantity} available)`}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductVariant_01;
export type { ProductVariant01Props, VariantItem, VariantSelectionPayload };
