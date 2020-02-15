export const TABLE_COLUMN_NUMBER = 28;

export const TABLE_ROW_NUMBER = 2;

export const CURVE_TOP_POSITION = 55;

export const CURVE_BOTTOM_POSITION = 5;

export const CURVE_MIDDLE_POSITION = (CURVE_TOP_POSITION + CURVE_BOTTOM_POSITION) / 2;

export const PHYSICAL = {
    color: '#e53e3e', 
    duration: 23 * 10,
    name: 'Physical',
};

export const EMOTIONAL = {
    color: '#48bb78', 
    duration: 28 * 10,
    name: 'Emotional',
};

export const INTELLECTUAL = {
    color: '#63b3ed', 
    duration: 33 * 10,
    name: 'Intellectual',
};

export const INTUITIVE = {
    color: '#ecc94b', 
    duration: 38 * 10,
    name: 'Intuitive',
};

export const getTotalCycleNumber = (totalDays, amplitude) => totalDays / amplitude;

