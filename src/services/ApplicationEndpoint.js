import http from './httpClient/index';

export async function getApplication(params={}, config={}) {
    const response = await http.get('/applications',{...config, params});
    return response.data;
}

export async function applicationSummary(id) {
    const response = await http.get('/application/' + `${id}`);
    return response.data;
}
