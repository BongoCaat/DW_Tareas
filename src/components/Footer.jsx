function Footer() {
    return (
    <>
        <footer id="footer" className="foot-text bg-dark p-lg-3" data-bs-theme="dark">
            <div className="text-center p-4">
                © 2024 Copyright:
                <a className="name link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href="https://github.com/BongoCaat" target="_blank">Valentino Pietropaolo</a>
            </div>

            <div className="container socialSection">
                <a className="text-body" href="https://github.com/BongoCaat/DW_Tareas" target="_blank">
                    <i className='name link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover bx bxl-github'>GitHub</i>
                </a>
            </div>
        </footer>
    </>
    )
};

export default Footer;