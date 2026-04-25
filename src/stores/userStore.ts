import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User { id: string; name: string; phone: string; county: string; }
interface UserState {
  user: User;
  setUser: (u: Partial<User>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: { id: "user-1", name: "Kieti", phone: "+254712345678", county: "Nyeri" },
      setUser: (u) => set((s) => ({ user: { ...s.user, ...u } })),
    }),
    { name: "FarmSmart-user" },
  ),
);
