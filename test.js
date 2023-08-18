it("it oom test", () => {
    const largeArray = new Array(1000000000).fill('X');
    Array.from({ length: 100 }).forEach((_, i) => {
        console.log("size of array: ", largeArray.length);
        largeArray.push(...largeArray);
    });
});
