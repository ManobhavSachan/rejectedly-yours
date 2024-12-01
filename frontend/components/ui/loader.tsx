import React from 'react';
import { cn } from '@/lib/utils';

const Loader = () => {
    return (
        <div className="flex justify-center items-center" style={{ height: '50vh' }}>
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-violet-500">
            </div>
        </div>
    );
};

export default Loader;
