import http from './httpClient/index';

export async function sector(name) {
    const response = await http.get(process.env.VUE_APP_API_URL + '/sector/' + name);
    return response.data;
}

export async function sectorList(params={}, config={}) {
    const response = await http.get(process.env.VUE_APP_API_URL + '/benefiting/sectors',{...config, params})
    return response.data
}

export async function getSector(params={}, config={}) {
    const response = await http.get(process.env.VUE_APP_API_URL + '/sectors/beneficiary',{...config, params})
    return response.data
}