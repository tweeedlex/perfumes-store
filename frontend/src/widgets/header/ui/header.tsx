"use client"
import React from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import CartModal, {CartProvider, CartTrigger} from "@/widgets/cart-sidebar";

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
          <CartModal />
        </CartProvider>
      </header>
    </>
  );
};

export default Header;
