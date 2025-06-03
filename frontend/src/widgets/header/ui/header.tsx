import React from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

const Header: React.FC = () => {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      <SignedOut>
        <SignInButton/>
        <SignUpButton/>
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
    </header>
  );
};

export default Header;
