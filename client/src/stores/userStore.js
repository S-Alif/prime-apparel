import { create } from "zustand"


const UserStore = create((set) => ({
    user: null,
    setUser: (user) => set((state) => ({
        user: user
    })),
    logout: () => set((state) => ({
        user: null
    })),

    // for sidebar
    sidebarActive: true,
    toggleSidebar: () => set((state) => ({
        sidebarActive: !state.sidebarActive
    }))
}))

export default UserStore