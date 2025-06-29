import React, {FC} from 'react';
import {Provider, useDispatch, useSelector} from "react-redux";
import cartStore, {RootState, toggleOpen} from "@/widgets/cart-sidebar/model/cart-store";
import {ShoppingBasket} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/ui/dialog";
import Cart from "@/features/cart";

const CartModal: FC = () => {
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

  return (
    <Dialog open={open} onOpenChange={() => dispatch(toggleOpen())} defaultOpen={false}>
      <DialogContent className="p-0 min-w-full md:min-w-[700px]">
        <DialogHeader className="p-4 border-b flex-row items-center justify-center gap-2">
          <ShoppingBasket />
          <DialogTitle className="text-lg font-semibold">Cart</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-4">
          <Cart currencyPrefix={"₴"} storeName={"Perfumes"} />
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
