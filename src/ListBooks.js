/**
 * Created by amahesh on 2/26/18.
 */
import React from "react";

const ListBooks = ({booksList}) => {

    return (<div>
        <ul>
            {booksList.map((item) => (
                <li>{item.description}</li>
            ))}
        </ul>
    </div>);
}

export default ListBooks;