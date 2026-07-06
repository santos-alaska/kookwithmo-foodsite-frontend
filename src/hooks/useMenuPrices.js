import { useState, useEffect } from 'react';
import axios from '../lib/axios';

// Cache so we only fetch once per session
let _cache = null;
let _promise = null;

/**
 * Fetches all menu products from the DB and provides a helper to
 * look up live prices by item name, with a fallback to data.js prices.
 */
export const useMenuPrices = () => {
    const [priceMap, setPriceMap] = useState(_cache || {});
    const [loading, setLoading] = useState(!_cache);

    useEffect(() => {
        if (_cache) {
            setPriceMap(_cache);
            setLoading(false);
            return;
        }

        if (!_promise) {
            _promise = axios.get('/products/menu');
        }

        _promise
            .then(res => {
                const map = {};
                (res.data.products || []).forEach(p => {
                    map[p.name] = p.price;
                });
                _cache = map;
                setPriceMap(map);
            })
            .catch(err => {
                console.error('Failed to load menu prices:', err.message);
            })
            .finally(() => setLoading(false));
    }, []);

    /**
     * Get live price for a menu item.
     * Falls back to `fallbackPrice` if not found in DB.
     */
    const getPriceByName = (name, fallbackPrice) => {
        return priceMap[name] !== undefined ? priceMap[name] : fallbackPrice;
    };

    return { priceMap, getPriceByName, loading };
};
