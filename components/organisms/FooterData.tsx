import Footer from "@/components/molecules/Footer";

const footerSections = [
    {
        title: "Te ayudamos",
        links: [
        { label: "Venta telefónica", href: "#" },
        { label: "Centro de ayuda", href: "#" },
        { label: "Devoluciones y cambios", href: "#" },
        { label: "Información legal", href: "#" },
        { label: "Facturas", href: "#" },
        { label: "Estado de mi pedido", href: "#" },
        { label: "Formulario de pedidos", href: "#" },
        { label: "Canal de integridad", href: "#" },
        { label: "Defensoria Vendedores y Proveedores", href: "#" },
        { label: "Como cuidamos tus datos", href: "#" },
        { label: "Peticiones, quejas y reclamos", href: "#" },
        { label: "https//www.sic.gov.co/", href: "#" },
        { label: "Propiedad industria", href: "#" },
        ],
    },
    {
        title: "Sé parte de falabella.com",
        links: [
        { label: "Vende en falabella.com", href: "#" },
        { label: "Trabaja con nosotros", href: "#" },
        { label: "Trabaja en grupo falabella", href: "#" },
        { label: "Venta Empresa", href: "#" },
        { label: "Proveedores", href: "#" },
        ],
    },
    {
        title: "Únete a nuestros programas",
        links: [
        { label: "CMR Puntos", href: "#" },
        { label: "Club Bebé", href: "#" },
        { label: "Novios Falabella", href: "#" },
        { label: "Club Hogar", href: "#" },
        { label: "Fashion Club", href: "#" },

        ],
    },
    {
        title: "Nuestras empresas",
        links: [
        { label: "Falabella.com", href: "#" },
        { label: "Linio", href: "#" },
        { label: "Homecenter", href: "#" },
        { label: "Banco Falabella", href: "#" },
        { label: "Seguros Falabella", href: "#" },
        ],
    },
    ];

    export default function FooterData() {
    return (
        <>
        <Footer sections={footerSections} />
        </>
    );
}
