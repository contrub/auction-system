import { useState, useEffect } from 'react';
import api from "../services/api";
const Auctions = () => {
    const [auctions, setAuctions] = useState([]);

    useEffect(() => {
        api.get("/api/auctions")
            .then(data => setAuctions(data))
            .catch((err) => console.log(err))
    }, []);

    if (!auctions.length) {
        return (
            <div>
                No auctions in DB ;(
            </div>
        );
    }

    return (
        <div>
            <table border='1px'>
                <caption>Auction Table</caption>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                        {auctions.map((auction, key) => (
                            <tr key={key}>
                                <td>{auction.title}</td>
                                <td>{auction.description}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};
export default Auctions;