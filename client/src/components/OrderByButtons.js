import React from 'react'
import { VscListFlat, VscListFilter } from "react-icons/vsc";
import { useGlobalContext } from '../context';
export default function OrderByButtons() {

    const { ascOrder } = useGlobalContext();

    return (
        <div >
            {/* descending order */}
            <VscListFilter className="mr-2" onClick={ascOrder} size="30px" color="black" />
            {/* ascending order */}
            <VscListFlat  onClick={ascOrder} size="30px" color="red"/>

        </div>
    )
}
