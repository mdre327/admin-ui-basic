import React from 'react'

export default function UsePagePagination(data, currentPage, pageSize=10) {
    const totalCount = data.reduce((acc, curr) => {return acc + 1}, 0);
    const totalPage = Math.ceil(totalCount / 10);
    const firstpageIndex = currentPage * pageSize
    const lastpageItemIndex= firstpageIndex + 10;
    const currentPageData = data.slice(firstpageIndex, lastpageItemIndex);
    const arr = [currentPageData, totalPage];
 return arr
}
