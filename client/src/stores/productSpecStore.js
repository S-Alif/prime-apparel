import { create } from "zustand"

// removing document
const removeDoc = (array, id) => {
    return array.filter((e) => e?._id != id)
}
// updating document array
const updateDoc = (array, updatedDoc) => {
    return array.map((e) => e?._id == updatedDoc?._id ? updatedDoc : e)
}

// store
const productSpecStore = create((set) => ({
    category: [],
    colors: [],
    sizes: [],

    // category
    addCategories: (category = []) => set((state) => ({
        category: [...state.category, category]
    })),
    removeCategories: (id) => set((state) => ({
        category: removeDoc(state.category, id)
    })),
    updateCategories: (category) => set((state) => ({
        category: updateDoc(state.category, category)
    })),

    // colors
    addColors: (color = []) => set((state) => ({
        colors: [...state.colors, color]
    })),
    removeColors: (id) => set((state) => ({
        colors: removeDoc(state.colors, id)
    })),
    updateColors: (color) => set((state) => ({
        colors: updateDoc(state.colors, color)
    })),

    // sizes
    addSizes: (size = []) => set((state) => ({
        sizes: [...state.sizes, size]
    })),
    removeSizes: (id) => set((state) => ({
        sizes: removeDoc(state.sizes, id)
    })),
    updateSizes: (size) => set((state) => ({
        sizes: updateDoc(state.sizes, size)
    }))

}))

export default productSpecStore