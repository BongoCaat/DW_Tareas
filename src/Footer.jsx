function Footer() {
    return (
    <>
        <footer id="footer" className="fixed-bottom bg-dark" data-bs-theme="dark">
            <div className="container pt-2">
                <section className="d-flex justify-content-center">
                    <a className="btn btn-link btn-floating btn-lg text-body m-1" href="https://github.com/BongoCaat/DW_Tareas" target="_blank" role="button">
                        <i className='bx bxl-github'></i>
                    </a>
                </section>
            </div>

            <div className="text-center p-4">
                © 2024 Copyright:
                <a className="name text-body" href="https://github.com/BongoCaat"> Valentino Pietropaolo </a>
            </div>
        </footer>
    </>
    )
};

export default Footer;