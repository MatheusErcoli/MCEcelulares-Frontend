import ProductsPagination from "./components/ProductsPagination";

const products = [
    {
        id:1,
        name: "Câmera Vintage",
        price: 299.9,
        image: "https://picsum.photos/id/250/300/200",
    },
    {
        id:2,
        name: "Relógio Elegance",
        price: 150.0,
        image: "https://picsum.photos/id/357/300/200",
    },
    {
        id:3,
        name: "Fone Bluetooth",
        price: 89.5,
        image: "https://picsum.photos/id/445/300/200",
    },
    {
        id:4,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:5,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:6,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:7,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:8,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:9,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:10,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:11,
        name: "Câmera Vintage",
        price: 299.9,
        image: "https://picsum.photos/id/250/300/200",
    },
    {
        id:12,
        name: "Relógio Elegance",
        price: 150.0,
        image: "https://picsum.photos/id/357/300/200",
    },
    {
        id:13,
        name: "Fone Bluetooth",
        price: 89.5,
        image: "https://picsum.photos/id/445/300/200",
    },
    {
        id:14,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:15,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:16,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:17,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:18,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:19,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:20,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:21,
        name: "Câmera Vintage",
        price: 299.9,
        image: "https://picsum.photos/id/250/300/200",
    },
    {
        id:22,
        name: "Relógio Elegance",
        price: 150.0,
        image: "https://picsum.photos/id/357/300/200",
    },
    {
        id:23,
        name: "Fone Bluetooth",
        price: 89.5,
        image: "https://picsum.photos/id/445/300/200",
    },
    {
        id:24,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:25,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:26,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:27,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:28,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:29,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
    {
        id:30,
        name: "Mochila Tech",
        price: 210.0,
        image: "https://picsum.photos/id/160/300/200",
    },
];
const Page = () => {
    return (
        <>
        <ProductsPagination products={products} />
        </>
    );
}

export default Page;