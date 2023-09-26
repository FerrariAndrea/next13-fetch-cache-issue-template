//How many page to build
export const TEST_PAGE_COUNT = 200;
/*
The JSON response payload size.
The size real request size increas by: id*BASE_SIZE.
Considering size=id*BASE_SIZE, the size number will generate a JSON with 'size' field.
Considering x as the current field in [0,'size'].
Every field x will be a string with x chars.
Example:
id=2;
BASE_SIZE=2;
size=4;
result:{
    id:2,
    test_0:"x",
    test_1:"xx",
    test_2:"xxx",
    test_3:"xxxx"
}
*/
export const BASE_SIZE = 2;

export const BACKEND_URL = "http://localhost:4000/test_req";

/*
if REVALIDATE is true, the fetch will use the cache and the revalidate
if REVALIDATE is false, the fetch will not use the cache
*/
export const REVALIDATE = true;
