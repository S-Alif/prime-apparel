import { useState } from 'react'

const useMenuButton = () => {

    const [sidebarActive, setSidebarActive] = useState(false)

    const toggleSidebar = () => {
        setSidebarActive(prev => !prev)
    }

    return { sidebarActive, toggleSidebar }
}

export default useMenuButton