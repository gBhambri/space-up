export const baseUrl='https://api.nasa.gov/neo/'
export const API_KEY='api_key=3Zp4XLMG8wS1UwXAfzqAxgGdzcz3vdJkF3sGRxeL'
export const endpoints={
    getAsteriods:'rest/v1/neo/browse',
    getAsteriodbyId:'rest/v1/neo/',
    getAsteriodbyDate:'rest/v1/feed'
}
export const getRequest=(url,params)=>{
    return fetch(baseUrl+url+API_KEY+params)
}