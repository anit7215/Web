// store/zustandStore.js
import create from 'zustand';

const useStore = create((set) => ({
  carts: [],
  totalQuantity: 0,
  addItem: (item) => set((state) => {
    const updatedCarts = [...state.carts, item];
    const updatedTotalQuantity = updatedCarts.reduce((total, current) => total + current.amount, 0);
    return { carts: updatedCarts, totalQuantity: updatedTotalQuantity };
  }),
  removeItem: (id) => set((state) => {
    const updatedCarts = state.carts.filter(item => item.id !== id);
    const updatedTotalQuantity = updatedCarts.reduce((total, current) => total + current.amount, 0);
    return { carts: updatedCarts, totalQuantity: updatedTotalQuantity };
  }),
  removeAllItems: () => set(() => ({ carts: [], totalQuantity: 0 })),

  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useStore;
