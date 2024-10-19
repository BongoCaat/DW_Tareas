function Header() {
    return (
        <>
            <nav id="header" className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="nav-text navbar-brand" href="#">DW | Valen</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navList" aria-controls="#navList" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="navList" className="collapse navbar-collapse" >
                        <ul className="navbar-nav me-auto" style={{alignItems: "center"}}>
                            <li className="nav-item" style={{fontSize: '24px'}}>
                                <a className="nav-link" href="https://github.com/BongoCaat/DW_Tareas" target="_blank">
                                    <i className='bx bxl-github'>GitHub</i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )

};

export default Header;