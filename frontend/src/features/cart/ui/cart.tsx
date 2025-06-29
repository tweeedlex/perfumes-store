"use client";

import PriceFormat from "@/shared/ui/price-format-basic";
import QuantityInputBasic from "@/shared/ui/quantity-input-basic";
import { Button } from "@/shared/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";

// Default logo placeholder
const DEFAULT_LOGO =
  "https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/logo-placeholder.png";

// Product item interface
interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

// Cart checkout payload interface
interface CartCheckoutPayload {
  products: CartProduct[];
  subtotal: number;
  shippingCost: number;
  vatAmount: number;
  vatRate: number;
  totalAmount: number;
  currencyPrefix: string;
}

// Cart component props
interface CartProps {
  storeName?: string;
  logoUrl?: string;
  products?: CartProduct[];
  subtotal?: number;
  shippingCost?: number;
  vatRate?: number;
  currencyPrefix?: string;
  isLoading?: boolean;
  errorMessage?: string;
  onCheckout?: (payload: CartCheckoutPayload) => void;
  onContinueShopping?: (payload: CartCheckoutPayload) => void;
  onUpdateQuantity?: (productId: string, newQuantity: number) => void;
  onRemoveProduct?: (productId: string) => void;
}

// Default products for demo purposes
const DEFAULT_PRODUCTS: CartProduct[] = [
  {
    id: "prod-1",
    imageUrl:
      "https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/headphone-1.jpg",
    name: "Wireless Headphones",
    price: 98.96,
    quantity: 1,
  },
  {
    id: "prod-2",
    imageUrl:
      "https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/watch-1.jpg",
    name: "Smart Watch",
    price: 129.99,
    quantity: 2,
  },
];

function Cart_01({
                   currencyPrefix = "$",
                   errorMessage = "",
                   isLoading = false,
                   logoUrl = DEFAULT_LOGO,
                   onCheckout = () => {},
                   onContinueShopping = () => {},
                   onRemoveProduct = () => {},
                   onUpdateQuantity = () => {},
                   products = DEFAULT_PRODUCTS,
                   shippingCost = 15.99,
                   storeName = "TechGadgets",
                   subtotal = 358.94, // This would typically be calculated from products
                   vatRate = 0.2, // 20% VAT
                 }: CartProps = {}) {
  // Calculate VAT and total
  const vatAmount = subtotal * vatRate;
  const totalAmount = subtotal + shippingCost + vatAmount;

  const isCartEmpty = !products || products.length === 0;

  // Create the checkout payload
  const checkoutPayload: CartCheckoutPayload = {
    currencyPrefix,
    products: [...(products || [])],
    shippingCost,
    subtotal,
    totalAmount,
    vatAmount,
    vatRate,
  };

  return (
    <div className="w-full max-w-4xl rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Store Header */}
      <div className="flex items-center space-x-4 rounded-t-xl bg-gradient-to-r from-blue-600 to-violet-600 p-4 md:p-6 text-white">
        <div className="h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full bg-white p-1">
          <img
            src={logoUrl}
            alt={`${storeName} logo`}
            width={48}
            height={48}
            className="h-full w-full object-contain"
          />
        </div>
        <h1 className="text-xl md:text-2xl font-bold">{storeName}</h1>
      </div>

      {/* Error Message Display */}
      {errorMessage && (
        <div className="m-4 md:m-6 rounded-md bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
          <p className="font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 dark:text-blue-400" />
          <p className="mt-4 text-gray-700 dark:text-gray-300">
            Loading your cart...
          </p>
        </div>
      )}

      {/* Cart Items or Empty Cart Message */}
      {!isLoading &&
        !errorMessage &&
        (isCartEmpty ? (
          <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
              <ShoppingCart
                size={48}
                className="text-gray-400 dark:text-gray-500"
              />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
              Your shopping cart is empty
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Button
              onClick={() => onContinueShopping(checkoutPayload)}
              className="bg-gradient-to-r from-blue-600 to-violet-600 text-white transition-all hover:from-blue-700 hover:to-violet-700"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-4 md:p-6"
              >
                {/* Desktop Layout (md and up) */}
                <div className="hidden md:grid grid-cols-[80px_1fr_auto_auto_auto] items-center gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-contain"
                      width={80}
                      height={80}
                    />
                  </div>

                  <div className="max-w-[200px] overflow-hidden">
                    <h3 className="overflow-hidden text-lg font-medium text-ellipsis whitespace-nowrap text-gray-900 dark:text-gray-100">
                      {product.name}
                    </h3>
                    <PriceFormat
                      prefix={currencyPrefix}
                      value={product.price}
                      className="mt-1 text-gray-600 dark:text-gray-400"
                    />
                  </div>

                  <div className="flex items-center">
                    <QuantityInputBasic
                      quantity={product.quantity}
                      min={1}
                      onChange={(newQuantity) =>
                        onUpdateQuantity(product.id, newQuantity)
                      }
                      className="border-gray-300 dark:border-gray-700"
                    />
                  </div>

                  <div className="w-24 text-right">
                    <PriceFormat
                      prefix={currencyPrefix}
                      value={product.price * product.quantity}
                      className="font-medium text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  <button
                    onClick={() => onRemoveProduct(product.id)}
                    className="justify-self-end text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2"
                    aria-label="Remove item"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* Mobile Layout (below md) */}
                <div className="md:hidden space-y-3">
                  {/* First row: Image and Product Info */}
                  <div className="flex items-start space-x-3">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-contain"
                        width={64}
                        height={64}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                        {product.name}
                      </h3>
                      <PriceFormat
                        prefix={currencyPrefix}
                        value={product.price}
                        className="mt-1 text-sm text-gray-600 dark:text-gray-400"
                      />
                    </div>
                    <button
                      onClick={() => onRemoveProduct(product.id)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 -mr-2"
                      aria-label="Remove item"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Second row: Quantity and Total Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <QuantityInputBasic
                        quantity={product.quantity}
                        min={1}
                        onChange={(newQuantity) =>
                          onUpdateQuantity(product.id, newQuantity)
                        }
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    <div className="text-right">
                      <PriceFormat
                        prefix={currencyPrefix}
                        value={product.price * product.quantity}
                        className="font-medium text-lg text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

      {/* Summary Section - Only show if cart has items and not loading/error */}
      {!isLoading && !errorMessage && !isCartEmpty && (
        <div className="bg-gray-50 p-4 md:p-6 dark:bg-gray-800/50">
          <h2 className="mb-4 text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100">
            Order Summary
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <PriceFormat prefix={currencyPrefix} value={subtotal} />
            </div>

            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping</span>
              <PriceFormat prefix={currencyPrefix} value={shippingCost} />
            </div>

            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>VAT ({(vatRate * 100).toFixed(0)}%)</span>
              <PriceFormat prefix={currencyPrefix} value={vatAmount} />
            </div>

            <div className="border-t border-gray-200 pt-3 dark:border-gray-700">
              <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100">
                <span>Total</span>
                <PriceFormat
                  prefix={currencyPrefix}
                  value={totalAmount}
                  className="text-lg md:text-xl text-blue-600 dark:text-blue-400"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button
              onClick={() => onCheckout(checkoutPayload)}
              className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white transition-all hover:from-blue-700 hover:to-violet-700 h-12 text-base font-medium"
              disabled={isLoading}
            >
              Proceed to Checkout
            </Button>

            <Button
              variant="outline"
              onClick={() => onContinueShopping(checkoutPayload)}
              className="w-full border-gray-300 bg-white text-gray-800 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-blue-500 dark:hover:bg-gray-700 h-12 text-base font-medium"
              disabled={isLoading}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart_01;
export type { CartCheckoutPayload, CartProduct, CartProps };