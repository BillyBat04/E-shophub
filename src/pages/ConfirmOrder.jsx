import { useCallback, useEffect } from "react"
import axiosInstance from "../config/api"
import { useParams } from "react-router-dom"

const ConfirmOrder = () => {
    const {id} = useParams()
    const confirm = useCallback(async () => {
        await axiosInstance.patch(`/supply-order/${id}`, {
            status: 'SHIPPING'
        })
    }, [id])

    useEffect(() => {
        confirm()
    }, [confirm])

    return (
        <h1>Cảm ơn nhà cung cấp đã xác nhận cung cấp hàng </h1>
    )
}

export default ConfirmOrder