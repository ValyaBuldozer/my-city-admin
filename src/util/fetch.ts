const FILE_UPLOAD_PATH = '/static/'

// it's UNSAFE
export function fetchData<T>(path: string, callback: (result: T) => any) {
    fetch(path)
        .then(body => body.json())
        .then(result => callback(result as unknown as T))
        .catch(e => console.error(e))
}

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
