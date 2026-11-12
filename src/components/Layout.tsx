import { Link, Outlet } from 'react-router'

function Layout() {
    return (
        <>
        <header>
            <h1>Training Log</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/new">New</Link>
            </nav>
        </header>

        <main>
            <Outlet />
        </main>
        </>
    )
}

export default Layout