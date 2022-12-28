import { Container, Navbar as NavbarBs } from "react-bootstrap"

export function Navbar() {
    // rename bootstrap Navbar since it has same name as component
    return (
    <NavbarBs className="bg-white shadow-sm mb-3">
        <Container>Nav</Container>
    </NavbarBs>
    )
}