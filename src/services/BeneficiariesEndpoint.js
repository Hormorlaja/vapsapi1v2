import http from './httpClient/index';

export async function getBeneficiaries(params={}, config={}) {
    const response = await http.get('/beneficiaries', {...config, params});
    return response.data;
}

export async function getBeneficiariesSummary(userId) {
    const response = await http.get('/user/' + `${userId}`);
    return response.data;
}

export async function applicantTypeSummary(applicant_type) {
    const response = await http.get('/applications/' + `${applicant_type}`);
    return response.data;
}

export async function getBeneficiariesCategory(config = {}) {
    const response = await http.get('/categories/beneficiary', {...config});
    return response.data;
}

export async function getApplicantType() {
    const response = await http.get('/applicant_types');
    return response.data;
}