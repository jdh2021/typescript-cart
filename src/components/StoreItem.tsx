import { Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

export function StoreItem({id, name, price, imgUrl}: StoreItemProps) {
    return <Card>
        <Card.Img 
            variant="top" 
            src={imgUrl} 
            height="200px" 
            style={{ objectFit: "cover"}} 
        />
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                {/* item title */}
                <span className="fs-2">{name}</span>
                {/* ms is margin start, so title doesn't touch price */}
                <span className="ms-2 text-muted">{formatCurrency(price)}</span>
            </Card.Title>
        </Card.Body>
    </Card>
}