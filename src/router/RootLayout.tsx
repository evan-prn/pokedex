/**
 * RootLayout.tsx
 */

import { Outlet } from "react-router-dom";
// import { BackToHomeButton } from '../components/Buttons/BackToHomeButton/BackToHomeButton.tsx';

export default function RootLayout() {
    return (
        <>
            <Outlet />
        </>
    );
}