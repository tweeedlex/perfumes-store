import React, {FC} from 'react';
import {Provider, useDispatch, useSelector} from "react-redux";
import cartStore, {RootState, toggleOpen} from "@/widgets/cart/model/cart-store";
import {ShoppingBasket} from "lucide-react";
import { createPortal } from 'react-dom';

const Cart: FC = () => {
  const open = useSelector((state: RootState) => state.open);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const cartContent = (
    <div className="fixed inset-0 z-[9999] flex justify-end">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => dispatch(toggleOpen())}
      />

      <div className="relative z-[10000] h-full w-80 bg-background border-l shadow-lg flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button
            onClick={() => dispatch(toggleOpen())}
            className="p-1 hover:bg-accent rounded"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <p>Your cart is empty</p>
        </div>

        <div className="border-t p-4">
          <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(cartContent, document.body);
};

export const CartTrigger: FC = () => {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.open);

  return (
    <button
      className="p-2 hover:bg-accent rounded"
      onClick={() => dispatch(toggleOpen())}
    >
      <ShoppingBasket className="w-6 h-6" />
      {open && <span className="ml-2">Close Cart</span>}
    </button>
  );
}

interface ICartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: FC<ICartProviderProps> = ({ children }) => {
  return (
    <Provider store={cartStore}>
      {children}
    </Provider>
  );
}

export default Cart;