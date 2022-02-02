import axios from 'axios';

export async function getScoreBoard(params={}, config={}) {
    const response = await axios.get(process.env.VUE_APP_API_URL + '/scoreboard',{...config, params});
    return response;
}

export async function getAdmin(id) {
    const response = await axios.get(process.env.VUE_APP_API_URL + '/admin/' + `${id}`);
    return response;
}

export async function officerRatings() {
    const response = await axios.get(process.env.VUE_APP_API_URL + '/officer/ratings');
    return response;
}