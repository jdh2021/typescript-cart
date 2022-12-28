import storeItems from "../data/items.json"
import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"

export function Store() {
    return (
        <><h1>Store</h1>
            <Row lg={3} md={2} xs={1} className="g-2">
                {/* map over array of items */}
                {storeItems.map(item => (
                    <Col key={item.id}>
                        {/* StoreItem takes in as a prop all of the item properties */}
                        <StoreItem {...item} />
                    </Col>
                ))}
            </Row>
        </>
    )
}