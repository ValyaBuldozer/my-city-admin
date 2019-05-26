const FILE_UPLOAD_PATH = '/static/';

export function uploadFile(file: File): Promise<string> {
    const formData = new FormData();

    formData.append('file', file);

    return fetch(FILE_UPLOAD_PATH, {
        method: 'PUT',
        body: formData
    }).then(response => {
        if (response.status === 200) {
            return response.text();
        } else {
            throw new Error(`Request status: ${response.status} - ${response.statusText}`)
        }
    });
}
