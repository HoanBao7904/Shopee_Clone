import React, { useState } from 'react';

export default function Qrcode() {
    const products = [
        {
            "id": 1,
            "productName": "Máy đo huyết áp Omron HEM-7120",
            "sku": "OMR-HEM7120",
            "price": 750000,
            "currency": "VND",
            "quantity": 1,
            "note": "Bảo hành 2 năm",
            "createdAt": "2025-11-29T10:00:00"
        },
        {
            "id": 2,
            "productName": "Nhiệt kế điện tử Beurer FT09",
            "sku": "BEU-FT09",
            "price": 220000,
            "currency": "VND",
            "quantity": 1,
            "note": null,
            "createdAt": "2025-11-28T09:30:00"
        },
        {
            "id": 3,
            "productName": "Khẩu trang y tế 4 lớp (hộp 50 cái)",
            "sku": "MASK-4L-50",
            "price": 120000,
            "currency": "VND",
            "quantity": 1,
            "note": "Hộp tiêu chuẩn",
            "createdAt": "2025-11-27T14:20:00"
        }
    ];

    const [selectedProduct, setSelectedProduct] = useState(products[0]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 text-white py-4 px-6">
                    <h1 className="text-xl font-bold text-center">Thanh toán qua QR Code</h1>
                </div>

                {/* Product Selection */}
                <div className="p-6 border-b">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chọn sản phẩm
                    </label>
                    <select
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={selectedProduct.id}
                        onChange={(e) => setSelectedProduct(products.find(p => p.id === parseInt(e.target.value)))}
                    >
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.productName} - {formatCurrency(product.price)} VND
                            </option>
                        ))}
                    </select>
                </div>

                {/* QR Code Section */}
                <div className="p-6">
                    {/* QR Code Placeholder */}
                    <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center mb-6">
                        <div className="text-center">
                            <div className="w-48 h-48 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <span className="text-gray-500 text-sm">QR Code sẽ hiển thị ở đây</span>
                            </div>
                            <p className="text-gray-600 text-sm">Quét mã QR để thanh toán</p>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-gray-800 mb-3">Thông tin đơn hàng</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Sản phẩm:</span>
                                <span className="font-medium">{selectedProduct.productName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Mã SKU:</span>
                                <span className="font-medium">{selectedProduct.sku}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Số lượng:</span>
                                <span className="font-medium">{selectedProduct.quantity}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-green-600 pt-2 border-t">
                                <span>Tổng tiền:</span>
                                <span>{formatCurrency(selectedProduct.price)} VND</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}