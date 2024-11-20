import { Link } from 'react-router-dom';

function Header() {
    const styles = {
        navLink: {
            fontSize: '24px',
            margin: '0 1vh',
        }
    }

    return (
        <>
            <nav id="header" className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="nav-text navbar-brand" to="/">DW | Valen</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navList" aria-controls="#navList" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="navList" className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto" style={{alignItems: "center"}}>
                            <li className="nav-item" style={styles.navLink}>
                                <Link className="nav-link" to="/task-list">Tareas</Link>
                            </li>
                            <li className="nav-item" style={styles.navLink}>
                                <Link className="nav-link" to="/api-web">API</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )


};

export default Header;