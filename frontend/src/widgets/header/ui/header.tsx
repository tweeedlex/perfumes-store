"use client"
import React from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import CartModal, {CartProvider, CartTrigger} from "@/widgets/cart-modal";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <>
      <header className="p-4 flex items-center justify-between h-16 relative z-10">
        <Link href="/">
          Perfumes
        </Link>
        <div className={"flex justify-end items-center gap-4"}>
          {/*<SignedOut>*/}
          {/*  <SignInButton/>*/}
          {/*  <SignUpButton/>*/}
          {/*</SignedOut>*/}
          {/*<SignedIn>*/}
          {/*  <UserButton/>*/}
          {/*</SignedIn>*/}
          <CartProvider>
            <CartTrigger/>
            <CartModal/>
          </CartProvider>
        </div>
      </header>
    </>
  );
};

export default Header;
