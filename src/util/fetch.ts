const FILE_UPLOAD_PATH = '/static/'


export function uploadFile(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    fetch(FILE_UPLOAD_PATH, {
        method: 'PUT',
        body: formData
    })
        .then(res => console.log(res))
        .catch(err => console.error(err));
}
