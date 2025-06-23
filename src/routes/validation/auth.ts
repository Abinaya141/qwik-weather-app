// Schema
import * as v from 'valibot';

export const WeatherSearchSchema = v.object({
    city: v.pipe(
        v.string('City name is required'),
        v.trim(),
        v.minLength(2, 'Please enter at least 2 characters'),
        v.maxLength(100, 'City name should not exceed 100 characters'),
        v.regex(/^[a-zA-Z\s\-']+$/, 'Invalid city name — only letters, spaces and hyphens are allowed')
    ),
});
