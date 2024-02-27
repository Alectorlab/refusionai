import logo from 'assets/images/refusion_logo.png'
import logoDark from 'assets/images/refusion_logo_dark.png'

import { useSelector } from 'react-redux'

// ==============================|| LOGO ||============================== //

const Logo = () => {
    const customization = useSelector((state) => state.customization)

    return (
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
            <img
                style={{ objectFit: 'contain', height: 'auto', width: 45 }}
                src={customization.isDarkMode ? logoDark : logo}
                alt='Refusion AI'
            />
        </div>
    )
}

export default Logo
