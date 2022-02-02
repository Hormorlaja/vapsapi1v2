import http from './httpClient/index';

export async function getOverview(params = {}, config = {}) {
    const response = await http.get('', {params, ...config});
    return response;
}

export async function getRecentApprovals(config = {}) {
    const response = await http.get('/recent/approved', {...config});
    return response;
}