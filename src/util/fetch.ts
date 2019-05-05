
// it's UNSAFE
export function fetchData<T>(path: string, callback: (result: T) => any) {
    fetch(path)
        .then(body => body.json())
        .then(result => callback(result as unknown as T))
        .catch(e => console.error(e))
}