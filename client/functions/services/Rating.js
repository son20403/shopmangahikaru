function ratingCount(rating) {
    return +((rating * 100) / 5).toFixed(2);
}
export default ratingCount;