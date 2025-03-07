import { BrowserRouter as Router } from 'react-router-dom'
import { LeftNavbarComp } from "./leftNavbar1";

export function LeftNavbarSSR() {
    return (
        <Router>
            <LeftNavbarComp />
        </Router>

    )
}

