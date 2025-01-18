import { useState } from 'react';
import {Star} from "lucide-react";

interface RatingProps {
    value?: number;
    onChange?: (value: number) => void;
}


export default function Rating({ value = 0, onChange}: RatingProps) {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);
        if (onChange) {
            onChange(newRating);
        }
    };

    return (
        <div className="flex items-center gap-1 cursor-pointer">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-6 h-6 ${star <= (onChange ? value : rating) ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}`}
                    onClick={() => handleRatingChange(star)}
                />
            ))}
        </div>
    );
}