import React, {FC} from 'react';
import {Provider, useDispatch, useSelector} from "react-redux";
import cartStore, {RootState, toggleOpen} from "@/widgets/cart-modal/model/cart-store";
import {ShoppingBasket} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/ui/dialog";
import Cart from "@/features/cart";
import { useRouter } from 'next/navigation'

const CartModal: FC = () => {
  const open = useSelector((state: RootState) => state.open);
  const dispatch = useDispatch();
  const router = useRouter()

  const onCheckout = () => {
    router.push('/checkout');
    dispatch(toggleOpen());
  }

  return (
    <Dialog open={open} onOpenChange={() => dispatch(toggleOpen())} defaultOpen={false}>
      <DialogContent className="p-0 min-w-full md:min-w-[700px]">
        <DialogHeader className="p-4 border-b flex-row items-center justify-center gap-2">
          <ShoppingBasket />
          <DialogTitle className="text-lg font-semibold">Cart</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <Cart onCheckout={onCheckout} onContinueShopping={() => dispatch(toggleOpen())} currencyPrefix={"₴"} storeName={"Perfumes"} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const CartTrigger: FC = () => {
  const dispatch = useDispatch();

  return (
    <button
      className="p-2 hover:bg-accent rounded"
      onClick={() => dispatch(toggleOpen())}
    >
      <ShoppingBasket className="w-6 h-6" />
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

export default CartModal;
