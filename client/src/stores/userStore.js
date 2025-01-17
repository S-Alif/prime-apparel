import { create } from "zustand"


const UserStore = create((set) => ({
    user: null,
    setUser: (user) => set((state) => ({
        user: user
    })),
    logout: () => set((state) => ({
        user: null
    })),
}))

export default UserStore