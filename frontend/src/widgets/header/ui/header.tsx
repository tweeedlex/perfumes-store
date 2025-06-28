"use client"
import React, {useEffect} from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Cart, {CartProvider, CartTrigger} from "@/widgets/cart";

const Header: React.FC = () => {
  return (
    <>
      <header className="flex justify-end items-center p-4 gap-4 h-16 relative z-10">
        <SignedOut>
          <SignInButton/>
          <SignUpButton/>
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
        <CartProvider>
          <CartTrigger />
          <Cart />
        </CartProvider>
      </header>
    </>
  );
};

export default Header;
