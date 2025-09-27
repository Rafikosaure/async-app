import { useEffect } from 'react';
import { fetchProducts } from '../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import './ProductsList.css';

export const ProductsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items, loading, error } = useAppSelector((s) => s.products);

    useEffect(() => {
        dispatch(fetchProducts({ page: 1, pageSize: 6 }));
    }, [dispatch]);

    if (loading) return <p>Chargement en cours…</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div className='products-list-container'>
            <ul className='products-list-ul'>
            {items.map((p) => (
                <li className='products-list-li' key={p.id}>
                    <img className='products-list-img' src={p.imageUrl} alt={p.title} />
                    <span className='products-list-span'><strong>{p.title}</strong><br />{p.price} {p.currencyCode}</span>
                </li>
            ))}
            </ul>
        </div>
    );
}