// src/components/layout/MainLayout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;